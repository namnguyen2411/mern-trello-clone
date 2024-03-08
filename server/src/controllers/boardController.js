import { StatusCodes } from 'http-status-codes'
import boardService from '#src/services/boardService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({
      message: 'Create a new board successfully',
      data: await boardService.createNew(req.body)
    })
  } catch (error) {
    next(error)
  }
}

const boardController = {
  createNew
}

export default boardController
