import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { MONGODB_OBJECT_ID_RULE } from '#src/utils/constants.js'
import { getDB } from '#src/config/db.js'

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message),
  title: Joi.string().required().min(1).max(50).trim().strict(),
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _delete: Joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    const newColumn = await COLUMN_SCHEMA.validateAsync(data, { abortEarly: false })

    return await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne({
        ...newColumn,
        boardId: new ObjectId(newColumn.boardId)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  const result = await getDB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) })

  return result
}

const deleteManyByBoardId = async (id) => {
  try {
    return await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .deleteMany({ boardId: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const pushToCardOrderIds = async (card) => {
  try {
    const result = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(card.columnId) },
        { $push: { cardOrderIds: new ObjectId(card._id) } },
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

    if (data.cardOrderIds && data.cardOrderIds.length > 0) {
      data.cardOrderIds = data.cardOrderIds.map((cardId) => {
        return new ObjectId(cardId)
      })
    }

    const result = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: Date.now() } },
        { returnDocument: 'after' }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const pullFromCardOrderIds = async (card) => {
  try {
    const result = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(card.columnId) },
        { $pull: { cardOrderIds: new ObjectId(card._id) } },
        { returnDocument: 'after' }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_SCHEMA,
  createNew,
  findOneById,
  deleteManyByBoardId,
  pushToCardOrderIds,
  update,
  deleteOneById,
  pullFromCardOrderIds
}

export default columnModel
