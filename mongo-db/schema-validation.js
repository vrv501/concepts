/* SHELL COMMANDS
use dbName 
*/

db.runCommand({collMod: "pictures", // collection name
        validator: {
            $jsonSchema: {
                bsonType: "object", 
                required: [
                    "title",
                    "creator"
                ], 
                properties: {
                    title: {
                        bsonType: "string",
                        description: "Title of the picture, must be a string and is required"
                    },
                    text: {
                        bsonType: "string",
                        description: "Text associated with the picture, must be a string"
                    },
                    creator: {
                        bsonType: "objectId",
                        description: "ID of the creator, must be an ObjectId"
                    },
                    comments: {
                        bsonType: "array",
                        description: "Array of comments, each comment must be an object with 'text' and 'author' fields",
                        items: {
                            bsonType: "object",
                            required: ["text", "author"],
                            properties: {
                                text: {
                                    bsonType: "string",
                                    description: "Text of the comment, must be a string and is required"
                                },
                                author: {
                                    bsonType: "objectId",
                                    description: "ID of the author of the comment, must be an ObjectId and is required"
                                }
                            }
                        }
                    }
                }
            }
        },
        validationAction: "warn" // error (default)
    })