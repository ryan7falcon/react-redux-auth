// const protocol = 'http://'
// const localServer = 'localhost'
// const port = ':9080'
// const remoteServer = 'remote.com'
// const version = '/api-v1'

// const localhost = ''
// const remote = protocol + remoteServer + version

// const rootFolder = localhost
// const rootFolder = remote

// ================================Authentication========================================
export function login (username, password) {
  return fetch('/auth/login', {
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: '123', password: 'test'}),
  })
}

export function fetchUser (token) {
  return fetch('/auth/user_info', {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}
