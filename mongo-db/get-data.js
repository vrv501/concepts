// To import jsonArray inside mongo as collection of a database
// drop drops any existing collection in db with same name


/* SHELL COMMANDS
mongoimport file.json -d dbName -c collectionName --jsonArray --drop

use dbName 
*/


// find all documents in a collection
// returns a cursor which can be iterated over (like pagination)
db.collectionName.find({}) 

// To access a field in the documents(structured data), use the dot notation
// e.g., to find all documents where the 'title' field is 'My Picture'
db.collectionName.find({ "title": "My Picture" }).title  

// Use embedded fields or array documents inside filter
db.collectionName.find({ "comments.text": "Great picture!" }) // text can be embedded field inside 
                                                              // an array of objects (comments) in the document or a top-level field inside comments document

// Use projections to limit the fields returned
db.collectionName.find({}, { title: 1, creator: 1, _id: 0 })

// Join two collections when one of collection is using references to documents in another collection
db.collectionName.aggregate([{$lookup: {
                                from: "creators", // collection to join
                                localField: "creator", // field from the input documents
                                foreignField: "_id", // field from the documents of the "from" collection
                                as: "creatorDetails" // output array field
                            }}])

// Use comparision operators 
db.collectionName.find({ "age": { $gt: 30 } })
db.collectionName.find({ "age": { $gte: 30 } })
db.collectionName.find({ "age": { $lt: 30 } })

// Range check
db.collectionName.find({ "average": { $in: [3,4,5] } }) // Find documents where the 'average' field is either 3 or 4 or 5
db.collectionName.find({ "average": { $nin: [3,4,5] } }) // Find documents where the 'average' field is not 3 and 4 and 5

// using and & or 
db.collectionName.find({ $and: [ { "age": { $gt: 30 } }, { "age": { $lt: 50 }}]})
db.collectionName.find({ $or: [ { "age": { $lt: 30 } }, { "age": { $gt: 50 }}]})
db.collectionName.find({ $nor: [ { "age": { $lt: 30 } }, { "age": { $gt: 50 }}]})

// using not
db.collectionName.find({ "age": {$not: { $lt: 30 }} })

// using element operators 
db.collectionName.find({ "age": { $exists: true } }) // Find documents where 'age' field exists 
                                                    // if field exists and has value null, its still returned by this query
db.collectionName.find({ "age": { $exists: false } }) // Find documents where 'age' field does not exist
db.collectionName.find({ "age": { $type: "int" } }) // Find documents where 'age' field is of type int
db.collectionName.find({ "age": { $type: ["double", "int"] } }) // Find documents where 'age' field is of type double or int

// evaluation operators
db.collectionName.find({ "name": { $regex: "^John" } }) // Find documents where 'name' starts with "John"
db.collectionName.find({ "name": { $regex: "John$", $options: "i" } }) // Find documents where 'name'
                                                                // ends with "John" (case-insensitive)
db.collectionName.find({ "name": { $regex: /John/}}) // Find documents where 'name' contains "John"

db.collectionName.find({ "age": { $mod: [5, 0] } }) // Find documents where 'age' is divisible by 5

db.collectionName.find({ $expr: { $eq: ["$firstName", "$lastName"] } }) // Find documents where 'firstName' equals 'lastName'
db.collectionName.find({ $expr: { $gt: ["$firstName", "$lastName"] } }) 
db.collectionName.find({ $expr: { $gt: [{"$cond": {if: {$gt: ["$firstName", 10]}, then: {$subtract: ["$firstName", 10]}, else: "$firstName"}}, "$lastName"] } }) 

// cursors
db.collectionName.find({}).limit(10) // Limit the number of documents returned to 10
db.collectionName.find({}).skip(5) // Skip the first 5 documents in the result set
db.collectionName.find({}).sort({ age: 1 // 1 for ascending, -1 for descending order
     }) // Sort documents by 'age' in ascending order
db.collectionName.find({}).sort({ age: -1 }).skip(10).limit(10) // you can chain them to implement pagination