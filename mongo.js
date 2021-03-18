const MongoClient = require('mongodb').MongoClient;
const URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const defaultOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }

async function getClient(options = defaultOptions) {
    console.info('Connected successfully to server');
    let client = await MongoClient.connect(URL, options);
    return client
}

async function getDatabase(client, dbName) {
    return await (dbName) ? client.db(dbName) : client.db()
}

async function getCollection(db, collectionName) {
    return await db.collection(collectionName)
}

module.exports = {
    getClient : getClient,
    getDatabase: getDatabase,
    getCollection: getCollection
}