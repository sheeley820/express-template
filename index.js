var express = require('express');
var app = express();
const bodyParser = require("body-parser")
var port = process.env.PORT || 3000;
const { router } = require("./router")

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

app.use("/", router)
app.listen(port, function(){
  console.log('Node is listening on port '+ port + '...')
});