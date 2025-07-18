## Topics, Partitions, Brokers
- Topics are like data streams where producers and consumers exchange data
- Each topic is composed of one or more partitions. Partitions are a way to distribute data to allow horizontal scaling, redundancy, fault-tolerance
- A broker is a server which comprises of one or more partitions of same or different topics. Each broker is uniquely identified by an ID
- Multiple brokers means you're partitions can be spread across and so does data
- Each partition has a leader broker. When replication is turned on, each leader will also have one or more ISR(In-Sync Replicas) which will always be different brokers. Replication factor determines how many brokers can go down and still all your partitions will be reachable and no loss of data. For replication factor of N, you can sustain N-1 broker loss/being down.
- All data sent to topic within a partition is ordered. However as a whole across topic shouldn't be relied upon
- Data in partition older than some interval(14 days) is cleared/deleted

## Partition Rebalance
- When new partitions are created or consumers are added/removed in a consumer group partition rebalance happens
- This decides which consumer gets to read from what partitions.
- By default when above events happen it leads to stop the world events where all consumers must eventually stop processing. And once this is done rebalancing occurs. This is called eager partitioner
- However this can lead to large lags and can be annoying in few prod setups. To overcome there is cooperative rebalancing where subset of parttions are removed from consumers. Then we incrementally start adding these consumers to be consumed by different consumers
- The assignors can be decided by using value `partition.assignment.strategy`. RangeAssignor, RoundRobin, StickyAssignore, CooperativeStickyAssignor.
- If you assign `group.instance.id` to a consumer in a consumer group, and then few partitions are assigned to it. Now when consumer goes down its partitions will not be rebalanced until consumer joins back within `session.timeout.ms`. THis is called static group membership 


## Producers
- All producers write to leader of partition
- Each producer writes to a topic. However they can decide which partition to write to. If no key is speicifed by default round robin strategy is followed
- However if multiple messages are being sent in quick successions without keys, then multiple requests are batched together and sent to one of specifc partition. This is called StickyPartitioner
- If key is specified, the producer partition logic hashes the key and always writes any data to that partition alone
- By default murmur2 hashing algorithm is used to decide which parition a key goes to. However this formula depends on numOfPartitions. If for a topic on dayN, num of partitions is increased, then it breaks the behaviour of for a given key it will always go to same partition. So in this case, create a new topic!
- Data sent is serialized into byte stream depending on type of data thats going to be sent. Once data-type is decided for data, do not change it during its lifetime. If such a situation arises, create a new topic and write data with changed data-type to this topic
- Data once written can be acknowledged by producer in 3 different ways.
  - acks=0, data sent to leader and we dont care if write was successful
  - acks=1, data sent to leader and we wait for success from leader alone
  - acks=all, data sent to leader and we wait for success from leader and all of its ISR's
- Along with `acks=all` producer can also use `min.insync.replicas`. This is recommonded to be atmost replicationFactor-1
  - Lets take an example. RF=3, acks=all, `min.insync.replicas=1`, then producer will consider write successfull if only leader write is successful. For this topic can sustain max loss of 2 brokers
  - `min.insync.replicas=2`. then producer will consider write successfull if leader write & one of ISR write is successful. For this topic can sustain max loss of only 1 broker! (bcoz write will only be considered success by producer if record is written into leader and one of its ISR)
  - `min.insync.replicas=3`.NOT RECOMMONDED. then producer will consider write successfull if leader write & all of ISR writes are successful. For this topic can sustain max loss of 0 brokers! 
- By default producer retries are unlimited. You can override this obviously. There's also delivery timeout which is max time to wait before considering write is failure. There's also backoff time between each retries. 
- You can also set max inflight requests which are basically max number of parallel requests sent to kafka to write same records in-case of retries
- By default in kafka >= v3, producers are idempotent and kafka ensures it doesnt commit duplicate records sent by producers
- Some sane settings(use kafka >= v3 and up-to-date client sdk's):  
  ```
  acks=all
  atleast replicaton factor=3
  min.insync.replicas=2 # set in brokers not clients
  retries=unlimited
  delivery.timeout.ms=120000(2min) // max time after which write is considered failed. All retries must happen within this timeframe
  max.in.flight.requests.per.connection=5 // n umber of writes to kakfka(can be messages batches also!)
  ```
- Message compression can be enabled at producer side by tinering with batch size and `linger.ms`. It's useful in high throughput scenarios as its using less bandwidth, faster transfer times. Tradeoff is extra cpu cycles on producer side. Recommded to be enabled at producer side. It is also configured on brokers as well to ensure data writeen to topics is less. However settings this has different behaviours. 
  - none. all compressed batches sent are decompressed in brokers
  - producer. they simply dump data as is. consumers have to decompress them!
  - specific type(gzip, lz4 etc). If it matches with producer dumped as is. Or decompress, compress again(load on brokers). consumers have to decompress them!
- linger.ms is max time to wait before sending batch for kafka write. batch size is max batch size(duh!). and compression ensures batch is compressed and sent so faster transfer times, less bandwidth   
  ```
  compression.type: snappy
  linger.ms: 20(ms)
  batch.size: 32768 bytes(32kib)
  ```

## Consumers, Offsets
- Consumers can choose to read from partion which is either leader or one of its ISR. They **pull** data from topic partitions by polling
- Byte stream data is deserailsised into appropriate data types depending on data-type set. So make sure not to change it during its lifetime. If such a situation arises, create a new topic and write data with changed data-type to this topic
- By default if a single consumer is reading from a topic, it reads from all partitions
- By default data on a partition/topic is immutable. So consumer periodicially updates offset(how many msgs have been read in that partition) to a topic called __consumer__offsets. This will be used to continue from where it left off in case of prodcuer goes down.
- Offsets must be periodically committed by consumers in multiple ways:
  - Atleast once: Data is received, processed and once done, the offset is commited. Possibility of msg being received again. Consumers logic must be idempotent
  - Atmost Once: Offset is set as and when data is received even before processing. Possible msg loss
  - Exactly Once: Using Kafka Workflows with Transactional API/Streams API. Also possible using Kafka Sink using idempotent consumer

## Consumer groups
- Consumers can be grouped into something called consumer groups. Each consumer group is created using something called group.id which must be unqiue. Each consumer part of consumer group will be given exclusive access to one or more partitions. This means lets say we have 3 consumers part of group and topic with 5 partitions. Then consumer 1 reads from 1,3 partions. consumer 2 reads from 2 partition and consumer 3 reads from partition 4,5. Notice how each consume rin the whole group reads from their own exclusive partitions. 
- In an event where there are more consumers in a consumer group than partitions, then some of the consuemrs will be idle/wont do anything. However if any existing consumers goes down, rebalancing will be done and consumers which are idle will take over the role of previous consumer which went down and continue to read from where it left off from those consumer's exclusive partitions.
- That being said, multiple consumer groups can read from shared paritions. Because they are part of different consumer groups they can share partions to read, however consumers within group will alwyas have exclusive partitions. 
- The idea is to not map individual consumers to partitions, but let multiple concurrent consumers read across exclusive partitions which increases reliability at consumer end
- rebalancing of consumers per partition happens automatically as and when consumers scale-up or go-down
- Offsets are then committed for each partition by consumer per consumer group. Each consumer group will have its own offset_topic
- Offsets can be replyed, reset provided the messages still exists in the partition. To reset offsets no consumer form consumer-group should be consuming


## Kafka Connect, Streams, Schema Registry
- Both producer & consumer from kafka topics are low level constructs. Over time kafka introduced higher level constructs that can help with interacting with Kafka
- Kafka Connect: External Streams => Kafka and Kafka => Kafka Sink
- Kafka Streams: transformations between kafka topics (kafka => kafka)
- Schema Regsirty: Schema for msgs being dumped and consumed
#### Kafka Connect
- SSE Connector to pull data(from external events, queues, dbs) and store in kafka
- Sink connector to publish data from kafka into external storages/sinks(dbs, s3, file-systems)
- At a high level, you have sources, sinks, kakfka Cluster. In between kafka cluster & data points we have the connect cluster which takes care of pulling, persisting and publishing data
- https://confluent.io/hub - For OSS connectors

## Deployments
```bash
$ cd platform
$ docker compose up -d --wait
# Once above command is successful, access http://localhost:8080 and create topics 
```