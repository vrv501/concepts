package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/opensearch-project/opensearch-go/v4"
	"github.com/opensearch-project/opensearch-go/v4/opensearchapi"
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

	kafkaClient, err := kgo.NewClient(
		kgo.SeedBrokers("localhost:9092"),
		kgo.ConsumerGroup("opensearch-app"),
		kgo.ConsumeStartOffset(kgo.NewOffset().AtStart()),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create Kafka client")
	}
	defer kafkaClient.Close()
	kafkaClient.AddConsumeTopics("wikimedia.recentchange") // subscribe to topic

	client, err := opensearchapi.NewClient(
		opensearchapi.Config{
			Client: opensearch.Config{
				Addresses: []string{"http://localhost:9200"},
				// Username:  "admin",
				// Password:  "myStrongPassword123!",
			},
		},
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to create OpenSearch client")
	}

	infoResp, err := client.Info(ctx, nil)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get info from OpenSearch")
	}
	log.Info().Msgf("Cluster Name: %s Cluster UUID: %s Version Number: %s",
		infoResp.ClusterName, infoResp.ClusterUUID, infoResp.Version.Number)

	indexName := "wikimedia"
	_, err = client.Indices.Create(
		ctx,
		opensearchapi.IndicesCreateReq{
			Index: indexName,
		},
	)
	var opensearchError *opensearch.StructError
	// Load err into opensearch.Error to access the fields and tolerate if the index already exists
	if err != nil {
		if errors.As(err, &opensearchError) {
			if opensearchError.Err.Type != "resource_already_exists_exception" {
				log.Fatal().Err(err).Msg("failed to create index")
			}
		} else {
			log.Fatal().Err(err).Msg("failed to create index")
		}
	}

	var buf bytes.Buffer
	for {
		// Poll for fetches
		fetches := kafkaClient.PollRecords(ctx, 10)
		if errs := fetches.Errors(); len(errs) > 0 {
			for _, fetchErr := range errs {
				if errors.Is(fetchErr.Err, ctx.Err()) { // graceful shutdown
					log.Info().Msg("context canceled, stopping consumption")
					return
				}
				log.Error().Err(fmt.Errorf("fetch errors: %v", errs)).
					Msg("error while fetching messages")
			}
			continue
		}

		fetches.EachRecord(func(record *kgo.Record) {
			log.Debug().Msgf("[%s] received message from partition: %d offset: %d",
				record.Timestamp, record.Partition, record.Offset)
			id := fmt.Sprintf("%s-%d-%d",
				record.Topic, record.Partition, record.Offset)
			m, _ := buf.WriteString(fmt.Sprintf(`{"index":{"_index":"%s","_id":"%s"}}`,
				indexName, id))
			n, _ := buf.WriteRune('\n')
			_, err := buf.Write(record.Value)
			if err != nil {
				buf.Truncate(buf.Len() - m - n) // remove last two lines
				log.Error().Err(err).Msg("failed to write record value to buffer")
				return
			}
			buf.WriteRune('\n')
		})

		if buf.Len() == 0 {
			log.Info().Msg("no records to process")
			continue
		}

		_, err = client.Bulk(ctx, opensearchapi.BulkReq{
			Index: indexName,
			Body:  &buf,
		})
		if err != nil {
			log.Error().Err(err).Msg("failed to execute bulk request")
		}
		buf.Reset()
	}
}
