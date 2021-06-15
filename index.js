const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const routerBuilder = require('./router')
const bodyParser = require('body-parser')
const app = express()

app.use(
    express.static(path.join(__dirname, '/public')),
    bodyParser.urlencoded({extended: false}),
    bodyParser.json(),
    express.json()
)
routerBuilder.buildConnection()
  .then(connectedClient => routerBuilder.buildRouter(connectedClient))
  .then(router => {
    app.use("/", router)
    app.listen(PORT, function() {
      console.log(`Node is listening on port ${PORT}...`)
    });
  }).catch((err) => {
    console.error(err)
  })