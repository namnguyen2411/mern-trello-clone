import Joi from 'joi'
import { BOARD_TYPE } from '#src/utils/constants.js'
import { MONGODB_OBJECT_ID_RULE, EMAIL_RULE, PASSWORD_RULE } from '#src/utils/constants.js'

export const generalPropertiesSchema = Joi.object({
  _id: Joi.string()
    .required()
    .pattern(MONGODB_OBJECT_ID_RULE.rule)
    .message(MONGODB_OBJECT_ID_RULE.message)
    .trim()
    .strict(),
  arrayIds: Joi.array()
    .required()
    .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message)),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

export const trelloSchema = Joi.object({
  title: Joi.string().required().min(1).max(50).trim().strict(),
  slug: Joi.string().min(1).trim().strict(),
  type: Joi.string().required().valid(BOARD_TYPE.public, BOARD_TYPE.private),
  starred: Joi.boolean().default(false),
  _delete: Joi.boolean().default(false)
})

export const userSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().required().pattern(EMAIL_RULE.rule, EMAIL_RULE.message).email().max(50),
  password: Joi.string().required().pattern(PASSWORD_RULE.rule, PASSWORD_RULE.message).min(6).max(50)
})
