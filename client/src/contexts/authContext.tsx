import { createContext, useState } from 'react'
import { UserType } from 'src/types/user.type'
import { getProfileFromLocalStorage } from 'src/utils/auth'

export type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserType | null
  setProfile: React.Dispatch<React.SetStateAction<UserType | null>>
  reset: () => void
}

const initalState: AuthContextType = {
  isAuthenticated: getProfileFromLocalStorage() ? true : false,
  setIsAuthenticated: () => {},
  profile: getProfileFromLocalStorage(),
  setProfile: () => {},
  reset: () => {}
}

export const AuthContext = createContext<AuthContextType>(initalState)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalState.isAuthenticated)
  const [profile, setProfile] = useState<UserType | null>(initalState.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
