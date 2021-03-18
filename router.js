const { Router } = require('express')
const mongo = require("./mongo")
require('dotenv').config()

function buildConnection() {
    return mongo.getClient()
}

async function buildRouter(client, dbName) {
    let router = new Router()

    console.info('Connected successfully to server');
    let db = await mongo.getDatabase(client, dbName);
    let kittenCollection = await mongo.getCollection(db, process.env.KITTEN_COLLECTION)

    router.get("/test", (req, res) => {
        kittenCollection.find({ "name": req.query.name }).toArray().then(result => {
            res.json({ "result" : result })
        })
    })

    router.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

    router.get("/message", (req, res) => {
        res.json({ "message": "Hello!" })
    })

    return router
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}