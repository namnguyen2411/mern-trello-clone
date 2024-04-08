import http from 'src/utils/http'
import { UserType } from 'src/types/user.type'

type UpdateProfileDataType = Pick<UserType, '_id' | 'fullName' | 'username' | 'jobTitle' | 'avatar'>

const getProfile = async (id: UserType['_id']) => (await http.get<UserType>(`/users/${id}`)).data

const updateProfile = async (data: UpdateProfileDataType) => (await http.put<UserType>(`/users/${data._id}`, data)).data

const changePassword = async (data: { _id: UserType['_id']; password: string; newPassword: string }) =>
  (await http.put<{ message: string }>(`/users/change-password`, data)).data

const userAPI = {
  getProfile,
  updateProfile,
  changePassword
}

export default userAPI
