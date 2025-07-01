db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $set: { fieldToUpdate: "newValue", anotherField: "vlue" } }, // Replace with the field and value you want to update(overwrite if field exists) or add
)

db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $inc: {age: 1}, $set: {field: "cal"} }, // increment age by 1 and combine with $set to add/update other fields
)
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $inc: {age: -1}, $set: {field: "cal"} }, // increment age by 1 and combine with $set to add/update other fields
)

// keep in mind you cant use both inc and set on same field, it will throw an error

db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $min: {age: 35} }, // only update if age is greater than 35 or null, otherwise no change. it basically does age: min(age, 35). if age is already min then age field is not updated
)
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $max: {age: 35} }, // only update if age is less than 35 or null, otherwise no change. it basically does age: max(age, 35). if age is already max then age field is not updated
)
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $mul: {age: 2.3} }, // multiply age by 2.3
)

// to drop field(different from setting field to null)
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $unset: { phoneNumber: "" } } // drop phoneNumber field (value can be anything, it is ignored)
)

// rename fields
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $rename: { "oldFieldName": "newFieldName" } } // rename oldFieldName to newFieldName
)

// if you want update non existing document, you can use upsert option
db.collectionName.updateOne(
    { name: "Maria" },
    { $set: { age: 30 } },
    { upsert: true } // if document with name "Maria" does not exist,
) // this will automatically create a new document with name "Maria" and age 30 and also new _id

// arrays of embedded docs update
// add new element to array of embedded documents
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $push: { hobbies: { title: "sports", frequency: 5 } } } // add new hobby to hobbies array
)

// add new element to array of embedded documents with specific position
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $push: { hobbies: { title: "sports", frequency: 5 } }, $position: 0 } // add new hobby to hobbies array at position 0 (beginning of array)
)

// add multiple elements to array of embedded documents
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $push: { 
      hobbies: { 
        $each: [{ title: "sports", frequency: 5 }, { title: "reading", frequency: 3 }], 
        $sort: {frequency: -1} // sort the array by frequency in descending order after adding new elements(final array)
      }
    } 
  } 
)

// add without duplicates
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $addToSet: { hobbies: { title: "sports", frequency: 5 } } } // add new hobby to hobbies array
  // if hobby with title "sports" already exists in hobbies array, it will not be added again
)

// remove element from array of embedded documents
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $pull: { hobbies: { title : "sports" } } } // remove hobby with title "sports" from hobbies array
)

// remove using using position
db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $pop: { hobbies: 1 } } // remove last element from hobbies array
)

db.collectionName.updateOne(
  { _id: ObjectId("60c72b2f9b1e83f8c8b4567") }, 
  { $pop: { hobbies: -1 } } // remove first element from hobbies array
)

// update docs inside array
/*
| Operator                   | Meaning                                                                 | Example                                          |
| -------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| `$`                        | Only updates the **first array element matched by the query condition** | `{ "hobbies.$.freq": 1 }`                        |
| `$[]`                      | Updates **all elements in the array**                                   | `{ "hobbies.$[].freq": 1 }`                      |
| `$[elem]` + `arrayFilters` | Updates **all matching elements that meet array filter conditions**     | `{ "hobbies.$[elem].freq": 1 }` + `arrayFilters` |
*/

// update first element that **matches query condition**(not 1st element) in array for documents returned by query filter  
db.collectionName.updateOne({hobbies: {$elemMatch: {title: "sports", frequency: {$gte: 4}}}},
  {$set: {"hobbies.$.highFrequency": true}} 
)
// when using $ operator, you have to ensure the query conditions also returns not just document but also the array element you want to update, 
// otherwise it will throw error

// update all elements in array for documents returned by query filter
// query filter need not narrow down array elements
db.collectionName.updateOne({hobbies: {$elemMatch: {title: "sports"}}},
  {$set: {"hobbies.$[].highFrequency": true}}
)

// update specific elements, not just first match element
// query filter need not narrow down array elements
// arrayFilters can be different from query filter
db.collectionName.updateOne({hobbies: {$elemMatch: {title: "sports"}}},
  {$set: {"hobbies.$[ele].highFrequency": true}},
  {arrayFilters: [{"ele.frequency": {$gte: 4}}]} // this will update all elements in hobbies array that have frequency >= 4
)