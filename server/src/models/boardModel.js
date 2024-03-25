import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { BOARD_TYPE, MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { getDB } from '#src/config/db.js'
import columnModel from './columnModel.js'
import cardModel from './cardModel.js'

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_SCHEMA = Joi.object({
  ownerId: Joi.string()
    .required()
    .pattern(MONGODB_OBJECT_ID_RULE.rule)
    .message(MONGODB_OBJECT_ID_RULE.message)
    .trim()
    .strict(),
  starred: Joi.boolean().default(false),
  starredAt: Joi.date().timestamp('javascript').default(null),
  title: Joi.string().required().min(1).max(50).trim().strict(),
  slug: Joi.string().min(1).trim().strict(),
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

    return await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne({ ...newBoard, ownerId: new ObjectId(newBoard.ownerId) })
  } catch (error) {
    throw new Error(error)
  }
}

const getBoardsByOwnerId = async (data) => {
  const result = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .find({ ownerId: new ObjectId(data.ownerId) })
    .toArray()

  return result
}

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

    if (data.columnOrderIds && data.columnOrderIds.length > 0) {
      data.columnOrderIds = data.columnOrderIds.map((columnId) => {
        return new ObjectId(columnId)
      })
    }

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

const pullFromColumnOrderIds = async (column) => {
  try {
    const result = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(column.boardId) },
        { $pull: { columnOrderIds: new ObjectId(column._id) } },
        { returnDocument: 'after' }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_SCHEMA,
  createNew,
  getBoardsByOwnerId,
  findOneById,
  getDetails,
  pushToColumnOrderIds,
  update,
  pullFromColumnOrderIds
}

export default boardModel
