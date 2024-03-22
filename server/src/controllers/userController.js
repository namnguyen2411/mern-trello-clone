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

const boardController = {
  createNew,
  login
}

export default boardController
