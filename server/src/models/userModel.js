import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '#src/config/db.js'
import { MONGODB_OBJECT_ID_RULE, PASSWORD_RULE } from '#src/utils/constants.js'

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'createdAt']

const USER_COLLECTION_NAME = 'users'
const USER_SCHEMA = Joi.object({
  boardIds: Joi.array()
    .items(Joi.string().pattern(MONGODB_OBJECT_ID_RULE.rule).message(MONGODB_OBJECT_ID_RULE.message))
    .default([]),
  email: Joi.string().email().required().min(1).max(50).trim().strict(),
  password: Joi.string().required().pattern(PASSWORD_RULE.rule, PASSWORD_RULE.message).min(6).max(50).trim().strict(),
  username: Joi.string().optional(),
  fullName: Joi.string().optional(),
  avatar: Joi.string().optional(),
  jobTitle: Joi.string().optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const createNew = async (data) => {
  try {
    const newUser = await USER_SCHEMA.validateAsync(data, { abortEarly: false })

    return await getDB().collection(USER_COLLECTION_NAME).insertOne(newUser)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByEmail = async (email) => {
  try {
    return await getDB().collection(USER_COLLECTION_NAME).findOne({ email })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })

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
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: Date.now() } },
        { returnDocument: 'after' }
      )
  } catch (error) {
    throw new Error(error)
  }
}

const userModel = {
  USER_COLLECTION_NAME,
  createNew,
  findOneById,
  findOneByEmail,
  update
}

export default userModel
