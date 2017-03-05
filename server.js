// Server settings that are common for both production and development

/* eslint-env node */

/* eslint no-console: 0 */

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

module.exports = {
  setApp: function setApp (app) {
    app.use(bodyParser.json())

    // this is an example on how to mock a service
    app.post('/auth/login', (req, res) => {
      if (req.body.username === '123' && req.body.password === 'test') {
        // var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
        var employee = {
          id: 123456,
          username: 123456,
          display_name: 'John Smith',
          title: 'Developer',
          executive: 'Innovation&Technology',
        }
        var token = jwt.sign({ employee: employee }, 'secret-key')
        var userInfo = {
          employee: employee,
          token: token,
        }
        res.status(200).json(userInfo)
      } else {
        res.sendStatus(403)
      }
    })

    app.get('/auth/user_info', (req, res) => {
      var token = req.headers['authorization']
      if (!token) {
        res.sendStatus(401)
      } else {
        try {
          var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
          res.status(200).json({
            employee: decoded,
            token: token,
          })
        } catch (e) {
          res.sendStatus(401)
        }
      }
    })
  },
  listen: function listen (app, port) {
    // this will be printed to the console when the server starts
    app.listen(port, function onStart (err) {
      if (err) {
        console.log(err)
      }
      console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    })
  },
}
