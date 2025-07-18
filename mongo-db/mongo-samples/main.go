// Connects to MongoDB and sets a Stable API version
package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
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

	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb://localhost:27017/shop?retryWrites=true").SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(opts)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to MongoDB")
	}
	defer client.Disconnect(ctx)

	// Send a ping to confirm a successful connection
	var result bson.M
	db := client.Database("shop")
	if err := db.
		RunCommand(ctx, bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		log.Fatal().Err(err).Msg("Failed to ping MongoDB")
	}
	col := db.Collection("products")

	// Create a Decimal128 for the price
	price, err := bson.ParseDecimal128("19.99")
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to create Decimal128")
	}

	resp, err := col.InsertOne(ctx, bson.M{"name": "Sample Product", "price": price, "in_stock": true})
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to insert document")
	}

	cursor, err := col.Find(ctx, bson.M{"_id": resp.InsertedID})
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to find document")
	}

	var results []bson.M
	err = cursor.All(ctx, &results)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to decode cursor")
	}
	for _, r := range results {
		fmt.Println(r["_id"], r["price"])
	}

	resp1 := col.FindOne(ctx, bson.M{"_id": resp.InsertedID})
	if err = resp1.Err(); err != nil {
		log.Fatal().Err(err).Msg("Failed to find document")
	}
	if err = resp1.Decode(&result); err != nil {
		log.Fatal().Err(err).Msg("Failed to decode document")
	}
	fmt.Println(result["_id"], result["price"])

	_, err = col.UpdateOne(ctx, bson.M{"_id": resp.InsertedID}, bson.M{"$set": bson.M{"price": price}})
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to update document")
	}

	_, err = col.DeleteOne(ctx, bson.M{"_id": resp.InsertedID})
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to delete document")
	}

	cursor, err = col.Find(ctx, bson.M{},
		options.Find().SetSort(bson.D{{Key: "price", Value: 1}}),
		options.Find().SetSkip(1),
		options.Find().SetLimit(5),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to find document")
	}

	err = cursor.All(ctx, &results)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to decode cursor")
	}
	for _, r := range results {
		fmt.Println(r["_id"], r["price"])
	}
}
