package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/twmb/franz-go/pkg/kgo"
)

func produce(ctx context.Context) {
	// authCfg := plain.Auth{
	// 	User: "",
	// 	Pass: "",
	// }

	client, err := kgo.NewClient(
		kgo.SeedBrokers("localhost:9092"),
		kgo.RecordDeliveryTimeout(2*time.Minute),
		//kgo.SASL(authCfg.AsMechanism()),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create Kafka client")
	}
	defer client.Close()

	for i := range 30 {
		msg := kgo.Record{
			Topic: "first_topic",
			Key:   []byte(fmt.Sprintf("key-%d", i)),
			Value: []byte(fmt.Sprintf("hello-world-%d", i)),
		}
		// produce is non-blocking
		client.Produce(ctx, &msg,
			func(r *kgo.Record, errS error) { // this method is executed once
				// record is sent successfully or if there was any error
				if errS == nil {
					log.Info().Msgf("timestamp: %s, partition: %d, topic: %s, offset: %d",
						r.Timestamp, r.Partition, r.Topic, r.Offset)
				} else {
					log.Error().Err(errS).Msg("failed to produce message")
				}
			})
		time.Sleep(2 * time.Second)
	}

	client.Flush(ctx) // wait for all messages to be sent before closing the client
}

func consume(ctx context.Context) {
	// authCfg := plain.Auth{
	// 	User: "",
	// 	Pass: "",
	// }

	client, err := kgo.NewClient(
		kgo.SeedBrokers("localhost:9092"),
		kgo.ConsumerGroup("my-go-app"), // every 5s autocimmit async is done, but you must issue a poll first to even begin process of autocommitting offsets
		// by default autocommit is enabled and its called every autocommit.interval.ms (default 5s)
		// this will be done only after first poll is issued. Processing of batches of records is synchronous in the below example

		kgo.Balancers(kgo.CooperativeStickyBalancer()), // anyways set as default value

		// kgo.InstanceID("my-go-app-instance"), // static group membership, if you want to use it

		// kgo.BlockRebalanceOnPoll(), // by default we use cooperative sticky, if you dont want to use that and use eager partitioner then uncomment this

		kgo.ConsumeStartOffset(kgo.NewOffset().AtStart()), // When reading from partition 1st time in a consumer-group, start from the earliest available(not committed -- makes sense since we are seeing for 1st time) offset or right from the beginning
		// there are 3 options: NewOffset().AtStart() (used currently)
		// NewOffset().AtEnd(): ignore all previous msgs and start consuming from now
		// NewOffset().AtCommitted: immediately fail if we are reading as consumer-group for 1st time
		//kgo.SASL(authCfg.AsMechanism()),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create Kafka client")
	}
	defer client.Close()

	client.AddConsumeTopics("first_topic") // subscribe to topic
	for {

		// Poll for fetches
		fetches := client.PollRecords(ctx, 10)
		if errs := fetches.Errors(); len(errs) > 0 {
			for _, fetchErr := range errs {
				if errors.Is(fetchErr.Err, ctx.Err()) { // graceful shutdown
					log.Info().Msg("context canceled, stopping consumption")
					return
				}
				log.Error().Err(fmt.Errorf("fetch errors: %v", errs)).Msg("error while fetching messages")
			}
			continue
		}

		fetches.EachRecord(func(record *kgo.Record) {
			log.Info().Msgf("[%s] received message: %s from topic: %s partition: %d offset: %d",
				record.Timestamp, string(record.Value), record.Topic, record.Partition, record.Offset)
		})
	}
}

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

	go produce(ctx)
	consume(ctx)
}
