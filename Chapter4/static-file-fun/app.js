// var express = require('express')
// var path = require('path')
// var fs = require('fs')

// var app = express()
// app.use(function (req, res, next) {
//   console.log('Request IP: ' + req.url)
//   console.log('Request Date: ' + new Date())
//   // res.end("Hello")
//   next()
// })

// app.use(function (req, res, next) {
//   var filePath = path.join(__dirname,"static",req.url)
//   fs.exists(filePath, function (exists) {
//     if (exists) {
//       res.sendFile(filePath)
//     } else {
//       next()
//     }
//   })
// })

// app.use(function(req,res){
//     res.status(404);
//     res.send("File not found")
// })
// app.listen(3000, function () {
//   console.log('App started on port 3000')
// })

/// // with morgan logger ////
var express = require('express')
var morgan = require('morgan')
var path = require('path')
var fs = require('fs')
var app = express()

app.use(morgan('short'))

var staticPath = path.join(__dirname,"static")
app.use(express.static(staticPath))

app.use(function (req, res) {
  res.status(404)
  res.send('File not found')
})
app.listen(3000, function () {
  console.log('App started on port 3000')
})
