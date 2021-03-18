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
// app.get("/", (req, res) => res.sendFile(__dirname + "index.html"))

// app.get("/json", (req, res) => {
//   let message = "Hellow World"
//   res.json({ "message": message })
// })

// app.get("/now", (req, res, next) => {
//   req.time = new Date().toString()
//   next()
// }, (req, res) => {
//   res.json({time: req.time})
// })

let mongoClient = routerBuilder.buildConnection()

routerBuilder.buildRouter(mongoClient, dbName).then(router => {
  app.use("/", router)
  app.listen(port, function() {
    console.log('Node is listening on port '+ port + '...')
  });
})
