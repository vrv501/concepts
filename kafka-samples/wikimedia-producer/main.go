package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/r3labs/sse/v2"
	"github.com/rs/zerolog/log"
	"github.com/twmb/franz-go/pkg/kgo"
)

func SetupSignalHandler() context.Context {
	ctx, cancel := context.WithCancel(context.Background())
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-c
		cancel()
	}()
	return ctx
}

func main() {
	ctx := SetupSignalHandler()
	sseClient := sse.NewClient("https://stream.wikimedia.org/v2/stream/recentchange")
	sseClient.Connection.Timeout = 10 * time.Second

	events := make(chan *sse.Event)

	err := sseClient.SubscribeChanRawWithContext(ctx, events)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to subscribe to SSE stream")
	}

	kafkaClient, err := kgo.NewClient(
		kgo.SeedBrokers("localhost:9092"),
		kgo.RecordDeliveryTimeout(2*time.Minute),

		// High throughput settings
		kgo.ProducerBatchCompression(kgo.SnappyCompression()),
		kgo.ProducerBatchMaxBytes(32*1024), //32KiB
		kgo.ProducerLinger(20*time.Millisecond),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create Kafka client")
	}
	defer kafkaClient.Close()

	for {
		select {
		case <-ctx.Done():
			log.Info().Msg("Shutting down SSE & kakfka client")
			sseClient.Unsubscribe(events)
			kafkaClient.Flush(context.Background()) // ensure all messages are sent before closing
			return

		case msg := <-events:
			r := kgo.Record{
				Topic: "wikimedia.recentchange",
				Value: msg.Data,
				Headers: []kgo.RecordHeader{
					{Key: "Event", Value: msg.Event},
				},
			}
			kafkaClient.Produce(ctx, &r, func(r *kgo.Record, err error) {
				if err != nil {
					log.Error().Err(err).Msg("failed to produce message")
					return
				}
				log.Info().Msgf("[%s] Produced message to partition %d, offset %d",
					r.Timestamp, r.Partition, r.Offset)
			})

		default:
			log.Debug().Msg("No new events, waiting...")
			time.Sleep(3 * time.Second)
		}
	}
}
