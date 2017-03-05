// functions that are used across the app

// =========================Fetching=============================

// checking if response status is ok
export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// parsing json from http response
export function parseJSON (response) {
  return response.json()
}

// =========================Authentication========================

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed || checkToken()
}

export function checkToken () {
  if (!getLocalToken()) return false
  else return true
}

export function getLocalToken () {
  return localStorage.getItem('token')
}

export function setLocalToken (token) {
  localStorage.setItem('token', token)
}

export function unsetLocalToken () {
  localStorage.removeItem('token')
}

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}
