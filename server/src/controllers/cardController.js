import { StatusCodes } from 'http-status-codes'
import cardService from '#src/services/cardService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await cardService.createNew(req.body))
  } catch (error) {
    next(error)
  }
}

const deleteCard = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await cardService.deleteCard(req.params.id))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await cardService.update(req.params.id, req.body))
  } catch (error) {
    next(error)
  }
}

const cardController = {
  createNew,
  deleteCard,
  update
}

export default cardController
