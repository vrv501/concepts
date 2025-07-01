db.collectionName.insertOne(
    { title: "Picture 1", creator: ObjectId("60c72b2f9b1e8d3f4c8b4567") }
)

db.collectionName.insertMany([
    { title: "Picture 2", creator: ObjectId("60c72b2f9b1e8d3f4c8b4568") },
    { title: "Picture 3", creator: ObjectId("60c72b2f9b1e8d3f4c8b4569") }
])

// by default when you are inserting many documents into collection
// and when one of element fails to insert, all records after that will also be no inserted
// This is because mongodb by default does ordered inserts
// You can disable this by using ordered: false 
db.collectionName.insertMany([
    { title: "Picture 1", creator: ObjectId("60c72b2f9b1e8d3f4c8b4567") },
    { title: "Picture 2", creator: ObjectId("60c72b2f9b1e8d3f4c8b4568") }
], { ordered: false }) // unordered insert


// By default write acknoledgement is set to true, where you would get response from mongo 
// when record is inserted to memory
// You can disable this by setting writeConcern ack to 0 (by default it is 1)
db.collectionName.insertOne(
    { title: "Picture 3", creator: ObjectId("60c72b2f9b1e8d3f4c8b4569") },
    { writeConcern: { w: 0 } } // no acknowledgement
)

// You can also ensure write is resistant against dataloss by using journal write
// This will wait until record is written both into memory and journal
// by default journal write is set to false
db.collectionName.insertOne(
    { title: "Picture 4", creator: ObjectId("60c72b2f9b1e8d3f4c8b4570") },
    { writeConcern: { w: 1, j: true } } 
)


// by default all insertOne/operationOne are atomic
// whereas operationMany are not atomic