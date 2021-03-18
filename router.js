const { Router } = require('express')
let router = new Router()
const { getClient } = require("./mongo")
let db
let collection

getClient().then(connectedClient => {
    console.log('Connected successfully to server');
    db = connectedClient.db("local");
    collection = db.collection("users")
  
    router.get("/test", (req, res) => {
        console.log("In our router.")
    })

    router.get("/users", (req, res) => {
        collection.find({"name": "bob"}).toArray().then(result => {
            console.log(result)
        })
        
    })
    // client.close().then(() => console.log("Closing db connection..."));
  }).catch(err => console.error(err))

module.exports = {
    router: router
}
