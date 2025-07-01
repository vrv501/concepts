// capped collection
db.createCollection("cappedCollection", { capped: true, size: 100000, max: 1000 }) // Create a capped collection with a maximum size of 100000 bytes and a maximum of 1000 documents
// once capped collection is created, you cannot change its size or max documents and if number of documents exceeds max, the oldest documents will be removed maintaining max limit on number of documents
// size means that Collection cannot exceed 100,000 bytes of storage
// Includes document data + indexes + metadata
// it also clears old data utomatically

// replica set is combination of primary node(writes) along with multiple
// secondary nodes which are copies of primary node which undergo async replication
// when primary node goes down secondary node is promoted to primary and we shouldnt face downtine 
// also you can configure reads to happen not just with primary but with secondary nodes
// this combination of primary and secondary nodes is called replica set

// sharding is used to distribute data across multiple nodes not replication
// it is used to scale horizontally
// sharding is used to scale out the database by distributing data across multiple servers/shards.
// each shard is a replica set and it can be deployed on multiple servers
// it is used to handle large datasets and high throughput operations
// mongos router decides which shard to send the query to, using shard key
// if shard key is not provided for queries then its broadcasted to all shards by mongos 