import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { EMAIL_RULE, PASSWORD_RULE } from '#src/utils/constants.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE.rule, EMAIL_RULE.message).email().max(50).trim().strict(),
    password: Joi.string().required().pattern(PASSWORD_RULE.rule, PASSWORD_RULE.message).min(6).max(50).trim().strict()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const userValidation = {
  createNew
}

export default userValidation
