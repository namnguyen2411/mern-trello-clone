import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { BOARD_TYPE } from '#src/utils/constants.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    type: Joi.string().required().valid(BOARD_TYPE.public, BOARD_TYPE.private)
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    type: Joi.string().valid(BOARD_TYPE.public, BOARD_TYPE.private)
  })

  try {
    // allowUnknown is used to allow extra fields in the request body that are not defined in the schema
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const boardValidation = {
  createNew,
  update
}

export default boardValidation
