var express = require('express');
var app = express();
const bodyParser = require("body-parser")
var port = process.env.PORT || 3000;
const routerBuilder = require("./router")
const url = 'mongodb://localhost:27017';
const dbName = "test"

app.use(
    express.static(__dirname + "/public"), 
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
)

routerBuilder.buildConnection()
  .then(connectedClient => routerBuilder.buildRouter(connectedClient, dbName))
  .then(router => {
    app.use("/", router)
    app.listen(port, function() {
      console.log('Node is listening on port '+ port + '...')
    });
  }).catch(err, () => {
    console.error(err)
  })