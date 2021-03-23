const express = require('express');
let app = express();
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000;
const routerBuilder = require("./router")

app.use(
    express.static(__dirname + "/public"), 
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
)

routerBuilder.buildConnection()
  .then(connectedClient => routerBuilder.buildRouter(connectedClient))
  .then(router => {
    app.use("/", router)
    app.listen(PORT, function() {
      console.log('Node is listening on port '+ PORT + '...')
    });
  }).catch(err, () => {
    console.error(err)
  })