import { StatusCodes } from 'http-status-codes'
import cardService from '#src/services/cardService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await cardService.createNew(req.body))
  } catch (error) {
    next(error)
  }
}

const cardController = {
  createNew
}

export default cardController
