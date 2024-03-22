import { StatusCodes } from 'http-status-codes'
import userModel from '#src/models/userModel.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (data) => {
  if (await userModel.findOneByEmail(data.email)) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
  }

  const newUserId = await userModel.createNew(data)
  const result = await userModel.findOneById(newUserId.insertedId)
  delete result.password

  return result
}

const findOneById = async (id) => {
  return await userModel.findOneById(id)
}

const login = async (data) => {
  const existedUser = await userModel.findOneByEmail(data.email)
  // if (!existedUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

  if (!existedUser || existedUser.password !== data.password)
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Email or password is incorrect')

  delete existedUser.password
  return existedUser
}

const userService = {
  createNew,
  findOneById,
  login
}

export default userService
