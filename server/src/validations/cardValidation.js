import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    boardId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    columnId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const cardValidation = {
  createNew
}

export default cardValidation
