// Production settings for the server
// -------------------------------------
// this stuff is for Bluemix

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
// var cfenv = require('cfenv')

// get the app environment from Cloud Foundry
// var appEnv = cfenv.getAppEnv()

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express')

const common = require('./server')
var compression = require('compression')
var path = require('path')
const port = 8080

// create a new express server
const app = express()

// Production
app.use(compression())
// serving everything as static stuff
app.use(express.static(__dirname + '/dist'))

common.setApp(app)

app.get('*', function response (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

common.listen(app, port)
