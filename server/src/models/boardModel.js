import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { BOARD_TYPE, MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { getDB } from '#src/config/db.js'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  type: Joi.string().valid(BOARD_TYPE.public, BOARD_TYPE.private).required(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _delete: Joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    const newBoard = await BOARD_SCHEMA.validateAsync(data, { abortEarly: false })

    return await getDB().collection(BOARD_COLLECTION_NAME).insertOne(newBoard)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  const result = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) })

  return result
}

const boardModel = {
  BOARD_SCHEMA,
  createNew,
  findOneById
}

export default boardModel
