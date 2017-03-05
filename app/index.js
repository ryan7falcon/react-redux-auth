import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as reducers from 'reduxModules'
import getRoutes from './config/routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// this will be usefull if we make the app isomorphic
const initialState = window.__REDUX_STATE__

// browserHistory is needed for urls looking like they should, localhost:8080/something, hashHistory makes it ugly
const baseHistory = browserHistory

// this enables see routing events in redux logs and potentially do routing with redux actions (not doing it now)
const routingMiddleware = routerMiddleware(baseHistory)

// reducers define what happens to the redux store when each event is dispatched
const reducer = combineReducers({...reducers, routing: routerReducer})

// thunk allows to wrap reducers in dispatch function so in components we don't have to do dispatch(someFunc()) every time, we just do someFunc()
const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk, routingMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

// creating redux store
export const store = createStore(
  reducer,
  initialState,
  enhancer,
)

// this is where history gets synced with the store so you can control routing with actions and see location change as actions in redux logs
const history = syncHistoryWithStore(baseHistory, store)

// render the app. <Provider> is for redux store.
render(
    <Provider store={store}>
       {getRoutes(store, history)}
    </Provider>,
    document.getElementById('app')
)
