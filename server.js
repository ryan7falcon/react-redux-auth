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
        var user = {
          id: 123456,
          username: 'johns',
          display_name: 'John Smith',
        }
        var token = jwt.sign({ user: user }, 'secret-key')
        var result = {
          user: user,
          token: token,
        }
        res.status(200).json(result)
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
            user: decoded.user,
            token: token,
          })
        } catch (e) {
          res.sendStatus(401)
        }
      }
    })

    app.get('/users/:id', (req, res) => {
      var token = req.headers['authorization']
      if (!token) {
        res.sendStatus(401)
      } else {
        try {
          var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
          res.status(200).json({
            id: req.params.id,
            username: req.params.id,
            display_name: 'John Smith',
          })
        } catch (e) {
          res.sendStatus(401)
        }
      }
    })

    app.get('/posts/:id', (req, res) => {
      var token = req.headers['authorization']
      if (!token) {
        res.sendStatus(401)
      } else {
        try {
          var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
          res.status(200).json({
            id: req.params.id,
            author: {
              id: '1',
              username: 'johns',
              display_name: 'John Smith',
            },
            title: 'My awesome blog post',
            comments: [
              {
                id: '324',
                commenter: {
                  id: '2',
                  username: 'nickdoe',
                  display_name: 'Nick Doe',
                },
              },
            ],
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
