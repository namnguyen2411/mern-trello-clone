import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { BOARD_TYPE, MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { getDB } from '#src/config/db.js'
import columnModel from './columnModel.js'
import cardModel from './cardModel.js'

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

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const findOneById = async (id) => {
  const result = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) })

  return result
}

const getDetails = async (id) => {
  const result = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .aggregate([
      { $match: { _id: new ObjectId(id), _delete: false } },
      {
        $lookup: { from: columnModel.COLUMN_COLLECTION_NAME, localField: '_id', foreignField: 'boardId', as: 'columns' }
      },
      { $lookup: { from: cardModel.CARD_COLLECTION_NAME, localField: '_id', foreignField: 'boardId', as: 'cards' } }
    ])
    .toArray()

  return result[0] || null
}

const pushToColumnOrderIds = async (column) => {
  try {
    const result = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(column.boardId) },
        { $push: { columnOrderIds: new ObjectId(column._id) } },
        { returnDocument: 'after' }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    // remove invalid fields from data
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    return await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: Date.now() } },
        { returnDocument: 'after' }
      )
  } catch (error) {
    throw new Error(error)
  }
}

const boardModel = {
  BOARD_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushToColumnOrderIds,
  update
}

export default boardModel
