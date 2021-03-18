const { Router } = require('express')
const mongo = require("./mongo")
let db
require('dotenv').config()

function buildConnection() {
    return mongo.getClient()
}

function buildRouter(client, dbName) {
    let router = new Router()

    client.then(connectedClient => {
        console.info('Connected successfully to server');
        db = mongo.getDatabase(connectedClient, dbName);
        kittenCollection = mongo.getCollection(db, process.env.KITTEN_COLLECTION)
    
        router.get("/test", (req, res) => {
            kittenCollection.find({ "name": req.query.name }).toArray().then(result => {
                res.json({ "result" : result })
            })
            
        })
      }).catch(err => console.error(err))

      router.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

      router.get("/message", (req, res) => {
        res.json({ "message": "Hello!" })
    })

    return new Promise((resolve, reject) => {
        resolve(router)
        reject("There was an error")
    })
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}
