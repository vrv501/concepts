// You can create users and assign roles. This will also assign user to database on which it was crated
// this db will be called authenticationDatabase

// lets say we logged in as root user 
// Then we swicth to db we want to create users 
// use dbName
db.createUser({user: "username", pwd: "password", roles: ["roleName"]})

// roleNames or roles are created or built-in roles can be used 
// Once user is crated , user needs to also specify authenticationDatabase and switch(use) that db
// to do whatever operations are allowed by the role assigned to user 

// To get info about user
db.getUser("username")

// If you want to update roles or assign new databases you can do
db.updateUser("username", {
    pwd: "newpswd",  // optional. can update password
    roles: ["existingRole", "newRole"] // these roles will replace what user already has
})

// To add database and what role to use on that database
db.updateUser("username", {
    roles: ["existingRole", {role: "newrole", db: "dbName"}] // remember to also mention what roles user already has                                                  
})

db.dropUser("username") // to drop user
db.getUsers() // to get all users on current db
db.getRoles() // to get all roles on current db
                             
// Transactions
// To use this we need mongodb v4 and replicaSets
const session = db.getMongo().startSession() // start a session. This will return a session object
session.startTransaction() // start a transaction. This will start a transaction on the session object
const userColl = session.getDatabase("dbname").collName1 // get the collection on which you want to perform operations
const orderColl = session.getDatabase("dbname").collName2 // get another collection on which you want to perform operations
userColl.insertOne({name: "John Doe"}) // insert a document in user collection
orderColl.insertOne({user: "John Doe", order: "Pizza"}) // insert a document in order collection
session.commitTransaction() // commit the transaction. This will save the changes made
 // after this only all changes are saved to database
session.endSession() // end the session. This will end the session and release the resources
// If you want to rollback the transaction, you can use 
session.abortTransaction() 