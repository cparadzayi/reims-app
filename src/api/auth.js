export function login (username, password) {
  return new Promise((resolve, reject) => {
    // in future get these from db
    let user = {
      username: 'a@b.com',
      password: '12345678'
    }
    if (user.username === username && user.password === password) {
      localStorage.setItem('loggedIn', true)
      resolve()
    } else {
      reject()
    }
  })
}

export function logout () {
  localStorage.removeItem('loggedIn')
}

export function isLoggedIn () {
  return !!JSON.parse(localStorage.getItem('loggedIn'))
}
