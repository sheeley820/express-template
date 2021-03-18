const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url);
let db

function getClient(mongoClient = client) {
    return mongoClient.connect()
}

function getDatabase(client, dbName) {
    return (dbName) ? client.db(dbName) : client.db()
}

function getCollection(db, collectionName) {
    return db.collection(collectionName)
}

// .then(connectedClient => {
//   console.log('Connected successfully to server');

//   db = client.db(dbName);

//   client.close().then(() => console.log("Closing db connection..."));
// }).catch(err => console.error(err))

module.exports = {
    getClient : getClient,
    getDatabase: getDatabase,
    getCollection: getCollection
}