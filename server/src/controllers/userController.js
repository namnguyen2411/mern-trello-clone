import { StatusCodes } from 'http-status-codes'
import userService from '#src/services/userService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await userService.createNew(req.body))
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await userService.login(req.body))
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await userService.logout(req.headers.authorization))
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await userService.findOneById(req.params.id))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await userService.update(req.params.id, req.body))
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await userService.changePassword(req.body))
  } catch (error) {
    next(error)
  }
}

const boardController = {
  createNew,
  login,
  logout,
  getProfile,
  update,
  changePassword
}

export default boardController
