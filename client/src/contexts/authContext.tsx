import { createContext, useState } from 'react'
import { getProfileFromLocalStorage } from 'src/utils/auth'

export type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initalState: AuthContextType = {
  isAuthenticated: getProfileFromLocalStorage() ? true : false,
  setIsAuthenticated: () => {}
}

export const AuthContext = createContext<AuthContextType>(initalState)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalState.isAuthenticated)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
