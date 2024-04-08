export const publicRoutes = {
  home: '/',
  signup: '/signup',
  login: '/login',
  logout: '/logout'
}

export const privateRoutes = {
  boardDetails: '/b/:boardId/:slug',
  userBoards: '/u/:userId/boards',
  userProfile: '/u/:userId/profile'
}

const userBaseUrl = '/users'
export const authRoutes = {
  signup: userBaseUrl + '/signup',
  login: userBaseUrl + '/login',
  logout: userBaseUrl + '/logout'
}

export const accountRoutes = {
  profile: '/profile',
  security: '/security'
}
