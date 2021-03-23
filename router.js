const { Router } = require('express')
const mongo = require("./mongo")
require('dotenv').config()
const DB_NAME = process.env.DB_NAME || "test"

function buildConnection() {
    return mongo.getClient()
}

async function buildRouter(client) {
    console.info('Connected successfully to server');
    let router = new Router()

    let db = await mongo.getDatabase(client, DB_NAME);
    let kittenCollection = await mongo.getCollection(db, process.env.KITTEN_COLLECTION)

    router.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

    router.route('/test')
          .get((req, res) => {
                kittenCollection.find({ "name": req.query.name })
                        .toArray()
                        .then(result => {
                            res.json({ "result" : result })
                        })
          })
          .post((req, res) => {
                kittenCollection.insert(req.body.data)
                res.status(200)
                res.send("Yo")
          })

    router.get("/message", (req, res) => {
        res.json({ "message": "Hello!" })
    })

    return router
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}