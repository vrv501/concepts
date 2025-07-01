/* SHELL COMMANDS
use dbName 
*/

// drop db
db.dropDatabase()

// drop collection
db.collectionName.drop()

// drop all documents in a collection
db.collectionName.deleteMany({})

// delete a specific document
db.collectionName.deleteOne({ _id: ObjectId("yourObjectIdHere")}) // filter inside {} -- first argument
                                                                  // same filters as find/findOne

