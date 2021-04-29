const express = require('express')
const PORT = process.env.PORT || 3000
const routerBuilder = require('./router')
const app = express()

app.use(
    express.static(__dirname + '/public'),
    express.bodyParser({ extended: false }),
    express.json()
)

routerBuilder.buildConnection()
  .then(connectedClient => routerBuilder.buildRouter(connectedClient))
  .then(router => {
    app.use("/", router)
    app.listen(PORT, function() {
      console.log(`Node is listening on port ${PORT}...`)
    });
  }).catch(err, () => {
    console.error(err)
  })