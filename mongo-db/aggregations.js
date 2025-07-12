// The below command groups all documents filtered by match
// then it groups the filtered documents based on id. They will all be merged into one document
// and the new fields will be created based on the aggregation functions used.
// You cannout use group & match to transform every document in the collection.
// You can only use group & match to transform the documents that are returned by the match stage
db.data.aggregate([
    {$match: {age: {$gt: 50}}}, // this is similar to filters used with find()
    {$group: {
        _id: {gender: "$gender"}, // this field is mandatory
        totalPersons: {$sum : 1}, // new fields. Sum of all grouped documents per id
        avgAge: {$avg: "$dob.age"}, // new field. AverageSum of dob.age of all documents grouped per id
    }},
    {$sort: {totalPersons: -1}}, // sort by totalPersons in descending order. 
                                // Can you use newly created fields in group stage

    // the below stages can be used for pagination
    // However unlike find the ordering of these stages is VERY IMPORTANT!!
    // Better usage is to use $sort first, then $skip and then $limit
    {$skip: 5}, // skip the first 5 documents. This is similar to skip in find() 
    {$limit: 5}, // by default aggregate will return cursor. However we can use limit to only return jsonArray (not cursor)

    {$out: "aggregatedData"} // this will create a new collection with the name aggregatedData and store the result of the aggregation in it
])

// when using $group with fields that are arrays, you need to take care of how on a given id the 
// different value of the array are merged
db.data.aggregate([
    {
        $unwind: "$hobbies" // unwind the hobbies array. This will create a new document for each hobby
                            // If the document has multiple hobbies, it will create multiple documents with same fields and id but each 
                            // element in the array will be one document   
    },
    {
        $group: {
            _id: {age: "$dob.age"}, // group by age
            hobbies: {$addToSet: "$hobbies"}, // since hobbies is unwinded, we can push each element into one singleField hobbies
                                             // addToSet ensures duplicates are removed
        }
    },
])


// Using projection to transform documents
// The projection stage allows you to transform the documents returned by the aggregation pipeline.
// You can use it to create new fields, decide what fields to appear in the output, and even rename fields.
// By default atleast one argument is required in porject
// Id is returned irrespective of arguments specified. Explicitly set it to 0 to not return it
db.data.aggregate([
    {
        $project: {
            _id: 0, phone: 1, 
            fullName: {
                $concat: [ // concatenates strings
                    {$toUpper: {$substrCP: ["$name.first", 0, 1]}}, // extract first letter of name.first and convert to uppercase
                    {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, // extract rest of the name.first
                    " ", 
                   {$toUpper: {$substrCP: ["$name.last", 0, 1]}},
                   {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]},
                ]
            }, 

        }
    }
])


db.aggregate([
{$project: 
    {
        _id: 0, 
        location: {
            type: "Point",// this will create a new field location with type Point
            coordinates: [
                {$convert: {input: "$location.coordinates.longitude", to: "double", onError: 0.0, onNull: 0.0}}, // convert string to double and handle errors
                {$toDouble: "$location.coordinates.latitude"} // convert string to double
            ]
        },
        birthYear: {$isoWeekYear: "$dob.date"}, // create a new field birthYear with ISO week year of dob.date
    }
}, 
])

// Projection with arrays
db.data.aggregate([
    {
        $project: {
            _id: 0, 
            hobbies: {$slice: ["$hobbies", 2]}, // slice the hobbies array to return only the first 2 elements
                                                // you can use slice with negative index to return all elements from that index.(eg: -2 will return last 2 elements)
                                                // you can also do $slice: ["$hobbies", -2, 1] to return 2nd element from last. ["$field", m, n] -- starting from that index m return n elements                  
            hobbiesCount: {$size: "$hobbies"}, // create a new field hobbiesCount with the size of the hobbies array                
        }
    }
])

// Filtering arrays in projection to return certain elements
db.data.aggregate([
    {
        $project: {
            _id: 0,
            scores: {
                $filter: {input: "$examScores", as: "sc", cond: {$gt: ["$$sc.scores", 50]}} // filter the examScores array to return only the scores greater than 50
            }
        }
    },
])


// Using bucket stage to group documents into ranges
// The $bucket stage allows you to group documents into ranges based on a specified field -- works similar to $group
// It creates buckets based on the specified boundaries and assigns documents to those buckets.
db.data.aggregate([
    {
        $bucket: {
            groupBy: "$dob.age", // this will act as _id similar to $group
            boundaries: [0, 18, 30, 50, 80, 120], // Decides the _id field values.
            // Example: it creates buckets of [0, 18), [18, 30), [30, 50), [50, 80), [80, 120)
            // Lets take 1st bucket, it will have all documents whose age >=0 and < 18
            output: { // since documents are grouped, you can create fields similar to $group
                numPersons: {$sum: 1}, 
                maxAge: {$max: "$dob.age"}, 
                minAge: {$min: "$dob.age"}, 
                avgAge: {$avg: "$registered.age"}
            }
        }
    }
])

// If you dont want to create boundaries and rather let MongoDB decide the boundaries based on the data, you can use $bucketAuto stage
// It will automatically create buckets based on the data distribution and the specified number of buckets.
db.data.aggregate([
    {
        $bucketAuto: {
            groupBy: "$dob.age", // this will act as _id similar to $group
            buckets: 5, // now id's will show you {min, max as boundaries in the _id field}
            output: { // since documents are grouped, you can create fields similar to $group
                numPersons: {$sum: 1}, 
                maxAge: {$max: "$dob.age"}, 
                minAge: {$min: "$dob.age"}, 
                avgAge: {$avg: "$registered.age"},
                names: {$push: {$concat: ["$firstName", " ", "$lastName"]}}
            }
        }
    }
])



// Stages shown above like $match, $group, and $project can be used in any order. 
// The stages can also be used multiple times in the same pipeline.
// However as data passes through the pipeline, it is transformed and the next stage will only see the transformed data.
// The order of the stages is important as it determines how the data is processed.
// If field is excluded in the first stage, it will not be available in the next stage.

