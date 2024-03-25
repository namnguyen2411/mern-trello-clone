import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { BOARD_TYPE } from '#src/utils/constants.js'
import ApiError from '#src/utils/ApiError.js'
import { MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { generalPropertiesSchema } from '#src/utils/schema.js'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    ownerId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    title: Joi.string().required().min(1).max(50).trim().strict(),
    type: Joi.string().required().valid(BOARD_TYPE.public, BOARD_TYPE.private)
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const getBoardsByOwnerId = async (req, res, next) => {
  const schema = Joi.object({
    ownerId: generalPropertiesSchema.extract('_id')
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
    title: Joi.string().min(1).max(50).trim().strict(),
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

const dragCardToAnotherColumn = async (req, res, next) => {
  const schema = Joi.object({
    cardId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    oldColumnId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    oldColumnCardOrderIds: Joi.array()
      .required()
      .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message)),
    newColumnId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    newColumnCardOrderIds: Joi.array()
      .required()
      .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message))
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const boardValidation = {
  createNew,
  update,
  dragCardToAnotherColumn,
  getBoardsByOwnerId
}

export default boardValidation
