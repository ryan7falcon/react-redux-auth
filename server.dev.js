// Development settings for the server
// -------------------------------------
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const common = require('./server')
var express = require('express')
var path = require('path')
const port = 8080

// create a new express server
const app = express()

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
})

// serving static stuff like main.css and images
app.use(express.static(path.join(__dirname, 'app', 'public')))

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

common.setApp(app)

// no server routing, forward all requests to index.html
app.get('*', function response (req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')))
  res.end()
})

common.listen(app, port)
