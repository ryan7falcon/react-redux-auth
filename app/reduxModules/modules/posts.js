import { getLocalToken } from 'helpers/utils'
import { schema, normalize } from 'normalizr'
import { CALL_API, getJSON } from 'redux-api-middleware'
import _ from 'lodash'

// constants

export const REQUEST_POSTS = '/posts/REQUEST'
export const RECEIVE_POSTS = '/posts/RECEIVE'
export const FAILURE_POSTS = '/posts/FAILURE'

const userSchema = new schema.Entity('users')
const commentSchema = new schema.Entity('comments', {
  commenter: userSchema,
})
const postSchema = new schema.Entity('posts', {
  author: userSchema,
  comments: [commentSchema],
})


// Action creators

export function getPost (id) {
  return {
    [CALL_API]: {
      endpoint: `posts/${id}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getLocalToken()}` },
      types: [
        REQUEST_POSTS,
        {
          type: RECEIVE_POSTS,
          payload: (action, state, res) => {
            return getJSON(res).then((json) => normalize(json, postSchema))
          },
        },
        FAILURE_POSTS,
      ],
    },
  }
}

// initial state

const initialState = {
  isFetching: true,
  error: '',
  postIds: [],
}

// Reducers
export default function posts (state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
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
          ...action.payload.entities.posts,
          postIds: _.union([action.payload.result], state.postIds),
        }
    case FAILURE_POSTS:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }
    default :
      return state
    }
}