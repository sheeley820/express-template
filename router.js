const { Router } = require('express')
const mongo = require('./mongo')
require('dotenv').config()
const DB_NAME = process.env.DB_NAME || "test"

function buildConnection() {
    return mongo.getClient()
}

async function buildRouter(client) {
    let router = new Router()

    let db = await mongo.getDatabase(client, DB_NAME);
    let targetCollection = await mongo.getCollection(db, process.env.TARGET_COLLECTION)

    router.get('/', (req, res) => res.sendFile(__dirname + "index.html"))

    router.get('/ping', (req, res) => res.status(200).send('Server is up.'))

    router.route('/test')
          .get((req, res) => {
                targetCollection.find({ "name": req.query.name })
                        .toArray()
                        .then(result => {
                            res.status(200).json({ "result" : result })
                        })
          })
          .post((req, res) => {
                targetCollection.insert(req.body.data)
                res.status(200)
                res.send('Yo')
          })

    router.get('/message', (req, res) => {
        res.status(200).json({ "message": "Hello!" })
    })

    return router
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}