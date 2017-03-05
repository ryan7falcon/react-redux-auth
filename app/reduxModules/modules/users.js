// stores user info

import { getLocalToken, setLocalToken, unsetLocalToken } from 'helpers/utils'
import { CALL_API, getJSON } from 'redux-api-middleware'
import { REQUEST_POSTS, RECEIVE_POSTS, FAILURE_POSTS } from './posts'
import _ from 'lodash'
// import jwtDecode from 'jwt-decode'

// constants
const UNAUTH_USER = 'UNAUTH_USER'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

const REQUEST_USER = '/user/REQUEST'
const RECEIVE_USER = '/user/RECEIVE'
const RECEIVE_ACTIVE_USER = '/user/RECEIVE_ACTIVE'
const FAILURE_USER = '/user/FAILURE'

// Action creators

export function logoutAndUnauth () {
  unsetLocalToken()
  return {
    type: UNAUTH_USER,
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export function getUser (id) {
  return {
    [CALL_API]: {
      endpoint: `users/${id}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getLocalToken()}`},
      types: [REQUEST_USER, RECEIVE_USER, FAILURE_USER],
    },
  }
}

export function loginWithCredentials (username, password) {
  return {
    [CALL_API]: {
      endpoint: `/auth/login`,
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: '123', password: 'test'}),
      types: [
        REQUEST_USER,
        {
          type: RECEIVE_ACTIVE_USER,
          payload: (action, state, res) => {
            const result = getJSON(res).then((data) => {
              setLocalToken(data.token)
              return data
            })
            return result
          }
        },
        FAILURE_USER,
      ],
    },
  }
}

export function getActiveUser () {
  return {
    [CALL_API]: {
      endpoint: `/auth/user_info`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getLocalToken()}`},
      types: [REQUEST_USER, RECEIVE_ACTIVE_USER, FAILURE_USER],
    },
  }
}

// initial state

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: '',
  userIds: [],
}

// Reducers

export default function users (state = initialState, action) {
  switch (action.type) {

    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case REQUEST_USER:
      return {
        ...state,
        isFetching: true,
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case RECEIVE_ACTIVE_USER:
      return !action.payload.user
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.payload.user.id]: action.payload.user,
          isAuthed: true,
          authedId: action.payload.user.id,
        }
    case RECEIVE_USER:
      return !action.payload.id
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.payload.id]: action.payload,
          userIds: _.union([action.payload.id], state.userIds),
        }
    case RECEIVE_POSTS:
      console.log(Object.keys(action.payload.entities.users))
      return !action.payload.result
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          ...action.payload.entities.users,
          userIds: _.union(Object.keys(action.payload.entities.users), state.userIds),
        }
    case FAILURE_USER:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }
    default :
      return state
  }
}
