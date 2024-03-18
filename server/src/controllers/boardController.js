import { StatusCodes } from 'http-status-codes'
import boardService from '../services/boardService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await boardService.createNew(req.body))
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await boardService.getDetails(req.params.id))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await boardService.update(req.params.id, req.body))
  } catch (error) {
    next(error)
  }
}

const boardController = {
  createNew,
  getDetails,
  update
}

export default boardController
