import { UserType } from 'src/types/user.type'
import http from 'src/utils/http'
import { LogInSchemaType, SignUpSchemaType } from 'src/utils/schema'

const signup = async (data: Omit<SignUpSchemaType, 'confirmPassword'>) =>
  (await http.post<UserType>(`/users/signup`, data)).data

const login = async (data: LogInSchemaType) => (await http.post<UserType>(`/users/login`, data)).data

const logout = async () => await http.post(`/users/logout`)

const authAPI = {
  signup,
  login,
  logout
}

export default authAPI
