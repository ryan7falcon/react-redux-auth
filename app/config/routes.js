// Client-side routing done here

import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { AuthenticateContainer, MainContainer, HomeContainer, LogoutContainer, ThankYouContainer } from 'containers'
import { NotFound } from 'components'
import { checkIfAuthed } from 'helpers/utils'

// returns a <Router> that will be placed inside <Provider> in ./app/index.js
export default function getRoutes (store = {}, history = {browserHistory}) {
  // if the user is not authed, forward to /auth with nextPathname prop so that after authing they will be redirected back to where they were originally going, except if the route was '/logout', so that the user is not logged out right after logging in
  function checkAuth (nextState, replace) {
    var path = nextState.location.pathname
    if (path === '/auth') {
      if (checkIfAuthed(store)) {
        replace({
          pathname: '/',
          state: { nextPathname: path },
        })
      }
    } else {
      if (path === '/logout') {
        path = '/'
      }
      if (!checkIfAuthed(store)) {
        replace({
          pathname: '/auth',
          state: { nextPathname: path },
        })
      }
    }
  }

// all routes that don't match anything will go to * which is NotFound component
// provideTestimonial/:id will pas id as a param to the component
  return (
  <Router history={history}>
    <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth}/>
    <Route path='logout' component={LogoutContainer} onEnter={checkAuth}/>
    <Router path='/' component={MainContainer} onEnter={checkAuth}>
      <IndexRoute component={HomeContainer}/>
      <Route path='thankYou' component={ThankYouContainer}/>
      <Route path='*' component = {NotFound} status={404}/>
    </Router>
  </Router>
  )
}
