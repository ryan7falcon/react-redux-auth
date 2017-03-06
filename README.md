# react-redux-auth

Boilerplate for react &amp; redux projects with autentication using jwt

- uses material-ui for styling
- mocks server response for logging in with name and password and getting user info using jwt token
- login and password are anything, to use actual form values change loginWithCredentials function in app/reduxModules/modules/users.js and change the first app.post function in server.js to test for values you like (now its username '123' and password 'test')
- thought-through routing with a protected page, available only after logging in, redirects to a page that user initially wanted to go but was brought to login because they were not authenticated
- "npm run build","npm start" are used for production, "npm run dev" for development, this setup makes it easier to deploy on Bluemix
- yarn is used for package management (I noticed that it's much faster than npm), "yarn install" to install all dependencies
- webpack 2 is used
- eslintrc included for convinience (install eslint separatly, I prefere having it globally installed)
- an example of using normalizr in included
- deployed on heroku https://react-redux-auth-jwt.herokuapp.com/

to use:

```
  git clone https://github.com/ryan7falcon/react-redux-auth.git
  yarn install
 ```
  
to run with development settings:

```
  npm run dev
```

to run with production settings:

```
  npm run build
  npm start
```

