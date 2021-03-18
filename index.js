const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const routerBuilder = require('./router')
const mongo = require('./mongo')

const PORT = process.env.PORT || 3000;

let app = express();

app.use(
    express.static(__dirname + "/public"), 
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
)

let mongoClient = mongo.getClient()

routerBuilder.buildRouter(mongoClient).then(router => {
  app.use("/", router)
  app.listen(port, function() {
    console.log(`Node is listening on port ${PORT}...`)
  });
})
