import { isLoggedIn } from '@/api/auth'

export function checkAuth (from, to, next) {
  if (isLoggedIn()) {
    next()
  } else {
    next({
      path: '/municipal-page',
      query: {
        return_to: to.path
      }
    })
  }
}