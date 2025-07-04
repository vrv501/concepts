db.collectionName.explain().find() //can also use update, delete
// it has winningPlan which tells us what its doing (ex: COLSCAN, IXSCAN)
// explain can take argument called "executionStats" to get time taken to run the query 
// number of documents examined, number of documents returned, etc.

db.collectionName.createIndex({ fieldName: 1 }) // 1 for ascending, -1 for descending
// multiple fields can be used as indexes
// single field indexes help speed up find results by ordering based on field 
// the trade-off is longer inserts, updates and in some-cases for finds as well!
// If you have query which will return all of documents, indexes will not help & will not even speed up 
// finds

db.collectionName.deleteIndex({ fieldName: 1 }) // to delete an index

// index creation blocks the collection by default
// this means until index is created, inserts, updates and deletes will be blocked
// To get around this(especially in production), you can create index in background
db.collectionName.createIndex({ fieldName: 1 }, { background: true }) // this will create the index in the background
// this means that inserts, updates and deletes will not be blocked while the index is being created
// however, this will take longer to create the index as it is being created in the background

// compound index -- order of fields matter!!
db.collectionName.createIndex({ fieldName1: 1, fieldName2: 1 }) 
// compound indexes are used when you have queries that filter on multiple fields
// compound index will have index combination of both fields
// compound indexes speds up when finding using any left to right fields(defined when creating indexes) or all fields used while creating indexes

// indexes also help during sorting hwne using find() with cursor
// when large number of documents are present sorting can timeout unless we have index on that field

db.collectionName.getIndexes() // to get all indexes on a collection

// unqiue indexes can also be used to ensure when documents are inserted, they do not have duplicate values in the field
db.collectionName.createIndex({ fieldName: 1 }, { unique: true }) // this will ensure that no two documents can have the same value for fieldName
// if you try to insert a document with the same value for fieldName, it will throw an error
// when unique index is created remember if document doesnt have that field and you try to insert 
// another document without field, it will fail. Bcause two documents cannot exist without that field
// that is used as index

// partial indexes can be used to create indexes on a subset of documents in a collection
db.collectionName.createIndex({ fieldName: 1 }, { partialFilterExpression: { fieldName: { $exists: true } } }) 
// this will create an index on fieldName
// only for documents where fieldName exists
// partial indexes can be used to create indexes on a subset of documents in a collection
// this can help reduce the size of the index and speed up queries that filter on that field

// partialFilterExpression can use fields which are not indexes. For example you can create
// index of dob.age for documents where gender is male
db.collectionName.createIndex({ "dob.age": 1 }, { partialFilterExpression: {gender: "male"}}) 
// You can also sorts of find query operators for partialFilterExpression

// combine unique and partialFilterExpression to create index which will ensure field is unique 
// and still allow multiple documents to be inserted without that field
db.collectionName.createIndex({ fieldName: 1 }, { unique: true, partialFilterExpression: { fieldName: { $exists: true } } }) 

// TTL Index -- only single field indexes not compound
db.collectionName.createIndex({ fieldName: 1 }, { expireAfterSeconds: 3600 })
// this will create an index on fieldName which will delete documents after 1 hour
// this is useful for caching data or for data that is only relevant for a certain period of time
// the fieldName must be a date field(new Date() or ISODate()) or a field that can be converted to a date
// the expireAfterSeconds is the number of seconds after which the document will be deleted

// when you combine projections in find with field to query. if this field is indexed
// then you execute covered query where indexscan is performed without returning entire document

// if you use field which is array of values, then index is multiKey index
// you cannot use compound index where both fields are arrays(multikey)
// However you can create compoundIndex&multiKeyIndex where one field is array and other is not

// Text Indexes
db.collectionName.createIndex({ fieldName: "text" }) // this will create a text index on fieldName
// text indexes are used for full-text search on string fields

// They ignore stop-words like "the", "a", "an", "is", etc. and also ignore case
// They will tokenize the string and create an index on each word
// You are only allowed to have one text index per collection as they are expensive to maintain

// To search using this index you could use like
db.collectionName.find({ $text: { $search: "search term" } }) // This will return all records from field used a sindex and return
// documents that contain either search or term in the fieldName

// If you want to search for exact phrase you can use double quotes
db.collectionName.find({ $text: { $search: "\"search term\"" } })

// To sort results based on text index relevance you can use
db.collectionName.find({ $text: { $search: "search term" } }).sort({ score: { $meta: "textScore" } })
// this will sort the results based on the relevance of the search term in the fieldName
// the score will be a number between 0 and 1, where 1 is the most relevant
// you can also use $meta: "textScore" in projection to get the score of each document
db.collectionName.find({ $text: { $search: "search term" } }, { score: { $meta: "textScore" } })

// To delete text index you can use
db.collectionName.dropIndex("fieldName_text") // the name of the index will be fieldName_text by default
// you can also use db.collectionName.getIndexes() to get the name

// You can also create text indexes on multiple fields
db.collectionName.createIndex({ fieldName1: "text", fieldName2: "text" }) // this will create a text index on both fieldName1 and fieldName2
// You can search on both fields using $text operator
db.collectionName.find({ $text: { $search: "search term" } }) // "search term" can be in either fieldName1 or fieldName2

// To search for documents not containing a word you can use
db.collectionName.find({ $text: { $search: "search -term" } })
// this will return all documents that contain "search" but not "term"(just put minus before term)

// You can set default language for text index
db.collectionName.createIndex({ fieldName: "text" }, { default_language: "english" }) // this will set the default language for the text index to English
// you can also set the language for each document using the language field
// this is useful for languages that have different stop-words or tokenization rules

// When merging multiple fields as text index, you can use weights to give more importance to one field over another
db.collectionName.createIndex({ fieldName1: "text", fieldName2: "text" }, { weights: { fieldName1: 10, fieldName2: 1 } })
// this will give more importance to fieldName1 over fieldName2 when searching

// this will search for "search term" in german language and will be case sensitive(by default it's false)
db.collectionName.find({$text: { $search: "search term" , $language: "german", $caseSensitive: true } }) 
