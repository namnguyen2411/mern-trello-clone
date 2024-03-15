import { StatusCodes } from 'http-status-codes'
import columnService from '#src/services/columnService.js'

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await columnService.createNew(req.body))
  } catch (error) {
    next(error)
  }
}

const columnController = {
  createNew
}

export default columnController
