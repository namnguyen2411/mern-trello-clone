import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // create a new board
    // const createdBoard = ...
    // res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
  }
}

const boardController = {
  createNew
}

export default boardController
