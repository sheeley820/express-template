const { Router } = require('express')
const mongo = require('./mongo')
const fs = require('fs')
require('dotenv').config()
const DB_NAME = process.env.DB_NAME

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
                            res.status(200)
                            .json({ "result" : result })
                        })
          })
          .post((req, res) => {
            targetCollection.insertOne(req.body)
                .then(result => {
                    res.status(200)
                    .json({ "result": result})
                }).catch((err) => {
                    res.status(400)
                    .json({ "error": err})
                })
          })

    router.route('/postTest')
        .post((req, res) => {
            let request = req.body
            if (request.hasOwnProperty('message')) {
                res.status(200)
                .json({ message: "Thanks"})
            } else {
                res.status(400)
                .json({ message: "Please send json with 'message' key"})
            }
        })

    router.get('/message', (req, res) => {
        res.status(200).json({ "message": "Hello!" })
    })

    router.get('/data', (req, res) => {
        let rawData = fs.readFileSync('./csvjson.json')
        let parsedData = JSON.parse(rawData)
        res.json(parsedData.data)
    })

    return router
}

module.exports = {
    buildConnection: buildConnection,
    buildRouter: buildRouter
}