/* SHELL COMMANDS
use dbName 
*/

db.collectionName.find({genre: "Crime"}) // Find all documents where genre array has "Crime"
db.collectionName.find({genre: ["Crime"]}) // Find all documents where genre array contains only "Crime" and no other value


// Use projection operators to return first matching element inside array(not entire document because we are using projection)
db.collectionName.find({}, { genres: { $elemMatch: { $eq: "Crime" } } })

// SPECIAL CASE
// When you are using eq and ne with array of embedded documents/arrays, they behave differently
db.collectionName.find({ "network.country.name": { $eq: "Canada" } }) // This will return documents where any one element of array contains an object with "name" field equal to "Canada"

db.collectionName.find({ "network.country.name": { $ne: "Canada" } }) // This will return documents where **no** element of array contains an object with "name" field equal to "Canada"
                                                                          // match all elements of array and should not have name set to Canada

// array operators
db.collectionName.find({ "tags": { $all: ["tag1", "tag2"] } }) // Find documents where 'tags' array contains both "tag1" and "tag2" in any order along with any other elements
db.collectionName.find({ "tags": { $size: 3 } }) // Find documents where 'tags' array has exactly 3 elements
db.collectionName.find({ $expr: {$gte: [{$size: {$ifNull: ["$tags", []]}}, 3]} }) // Find documents where 'tags' array has atleast 3 elements
                                                                                  // If tags is missing then it will be substituted with [], which $size can calculate
db.collectionName.find({ "hobbies": { $elemMatch: { name: "Shuttle", outdoorSport: true } } }) // Find documents wherehobbies is array of documents. it must find atleast one embedded document which has name and outdoorSport fields in same document
                                                                                              // without it if we use and along with "hobbies.name" and "hobbies.outdoorSport", it will return documents where any one of the elements in the hobbies array has name set to "Shuttle" and any other element has outdoorSport set to true
db.collectionName.find({ "hobbies": { $elemMatch: { $eq: "cricket" } } }) 

// array projection operators
// The below projection operators can only be used for projection
// $, $elemMatch, $slice, $meta
db.collectionName.find({}, { comments: { $elemMatch: { $eq: "Great picture!" } } })

// $: Used to return the first element of an array that matches the specified condition
db.collectionName.find({genres: "drama"}, { "genres.$": 1 }) // Returns only the element(first match) that matches "drama" in the genres array

// $elemMatch: Used to return only the first element of an array that matches the specified condition
db.collectionName.find({}, { comments: { $elemMatch: { $eq: "Great picture!" } } }) // Returns only the first comment with text "Great picture!"
db.collectionName.find({genres: "drama"}, { cgenres: { $elemMatch: { $eq: "Horror" }}}) // Returns all documents which contain drama in genre and then match "Horror" in the genres array

// $slice: Used to limit the number of elements returned in an array
db.collectionName.find({}, { comments: { $slice: 5 } }) // Returns only the first 5 comments
db.collectionName.find({}, { comments: { $slice: [-5, 3] } }) // Returns 3 comments starting from the 5th last comment
db.collectionName.find({}, { comments: { $slice: [1,3] } }) // Returns 3 comments starting from the second comment
