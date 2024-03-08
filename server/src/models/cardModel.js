import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { getDB } from '#src/config/db.js'

const CARD_COLLECTION_NAME = 'cards'
const CARD_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
  columnId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  cover: Joi.string().optional(),
  description: Joi.string().optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _delete: Joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    const newCard = await CARD_SCHEMA.validateAsync(data, { abortEarly: false })

    return await getDB().collection(CARD_COLLECTION_NAME).insertOne(newCard)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  const result = await getDB()
    .collection(CARD_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) })

  return result
}

const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_SCHEMA,
  createNew,
  findOneById
}

export default cardModel
