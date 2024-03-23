export const publicRoutes = {
  home: '/signup',
  signup: '/signup',
  login: '/login',
  logout: '/logout'
}

export const privateRoutes = {
  boards: '/boards'
}

const userBaseUrl = '/users'
export const authRoutes = {
  signup: userBaseUrl + '/signup',
  login: userBaseUrl + '/login',
  logout: userBaseUrl + '/logout'
}
