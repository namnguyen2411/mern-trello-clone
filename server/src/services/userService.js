import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import userModel from '#src/models/userModel.js'
import ApiError from '#src/utils/ApiError.js'
import env from '#src/config/environment.js'

const createNew = async (data) => {
  if (await userModel.findOneByEmail(data.email)) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
  }

  const newUserId = await userModel.createNew(data)
  const access_token = jwt.sign({ _id: newUserId }, env.JWT_SECRET, { expiresIn: '1d' })
  const result = await userModel.findOneById(newUserId.insertedId)
  delete result.password

  return { ...result, access_token }
}

const findOneById = async (id) => {
  return await userModel.findOneById(id)
}

const login = async (data) => {
  const existedUser = await userModel.findOneByEmail(data.email)
  // if (!existedUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

  if (!existedUser || existedUser.password !== data.password)
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Email or password is incorrect')

  const access_token = jwt.sign({ _id: existedUser._id }, env.JWT_SECRET, { expiresIn: '1d' })

  delete existedUser.password
  return { ...existedUser, access_token }
}

const logout = async (token) => {
  const result = await userModel.findOneById(jwt.verify(token, env.JWT_SECRET)._id)
  if (!result) throw new ApiError(StatusCodes.UNAUTHORIZED, StatusCodes[StatusCodes.UNAUTHORIZED])

  return { message: 'Logout successfully' }
}

const userService = {
  createNew,
  findOneById,
  login,
  logout
}

export default userService
