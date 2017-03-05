// stores user info

import { login, fetchUser } from 'helpers/api'
import { checkHttpStatus, parseJSON, getLocalToken, setLocalToken, unsetLocalToken } from 'helpers/utils'
// import jwtDecode from 'jwt-decode'

// constants

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

// Action creators

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  unsetLocalToken()
  console.warn('Error', error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Wrong userId or password',
    status: error.status,
    statusText: error.statusText,
  }
}

// save user info to redux
export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

// get the token and user info from the server using credentials
export function loginWithCredentials (username, password) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return login(username, password)
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((data) => {
      try {
        // console.log(data)
        // let decoded = jwtDecode(data.token)
        const token = data.token
        setLocalToken(token)
        dispatch(loginUserSuccess(data.employee))
      } catch (e) {
        dispatch(fetchingUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token',
          },
        }))
      }
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

// auth the user with the data got from the server
export function loginUserSuccess (userInfo) {
  return function (dispatch) {
    const username = userInfo.username
    dispatch(authUser(username))
    dispatch(fetchingUserSuccess(username, userInfo, Date.now()))
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    unsetLocalToken()
    dispatch(unauthUser())
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

// get user info using the token in localstorage
export function fetchAndHandleUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return fetchUser(getLocalToken())
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((data) => {
      try {
        dispatch(loginUserSuccess(data))
      } catch (e) {
        dispatch(fetchingUserFailure({
          response: {
            status: 403,
            statusText: 'error',
          },
        }))
      }
    })
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

// initial state

const initialUserState = {
  lastUpdated: 0,
  info: {
    display_name: '',
    username: '',
  },
}

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: '',
}

// Reducers

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    default :
      return state
  }
}
