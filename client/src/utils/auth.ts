import { UserType } from 'src/types/user.type'

// access_token
const getAccessTokenFromLocalStorage = (): string | null => localStorage.getItem('access_token')
const setAccessTokenToLocalStorage = (token: string) => localStorage.setItem('access_token', token)

const getProfileFromLocalStorage = (): UserType | null => {
  const profile = localStorage.getItem('profile')
  if (profile) return JSON.parse(profile) as UserType
  return null
}
const setProfileToLocalStorage = (profile: UserType) => localStorage.setItem('profile', JSON.stringify(profile))

const clearLocalStorage = () => {
  localStorage.removeItem('profile')
  localStorage.removeItem('access_token')
}

export {
  getProfileFromLocalStorage,
  setProfileToLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  clearLocalStorage
}
