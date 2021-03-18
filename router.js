const { Router } = require('express')
const mongo = require("./mongo")
const DB_NAME = process.env.DB_NAME || "test"

async function buildRouter(client) {
    console.log(`Client: ${client}`)
    let router = new Router()
    let db = await mongo.getDatabase(client, DB_NAME)
    
    router.get("/test", async (req, res) => {
        kittenCollection = mongo.getCollection(db, process.env.KITTEN_COLLECTION)
        let result = await kittenCollection.find({ "name": req.query.name }).toArray()
        res.json({ "result" : result })
    })

    router.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

    router.get("/message", (req, res) => {
        res.json({ "message": "Hello!" })
    })

    return new Promise((resolve, reject) => {
        if(router) {
            resolve(router)
        } else {
            reject("There was an error")
        }
    })
}

module.exports = {
    buildRouter: buildRouter
}
