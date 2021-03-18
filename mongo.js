const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url);
let db

function getClient() {
    return client.connect()
}

// .then(connectedClient => {
//   console.log('Connected successfully to server');

//   db = client.db(dbName);

//   client.close().then(() => console.log("Closing db connection..."));
// }).catch(err => console.error(err))

module.exports = {
    getClient : getClient
}