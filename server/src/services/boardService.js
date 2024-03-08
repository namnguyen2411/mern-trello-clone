import { StatusCodes } from 'http-status-codes'
import cloneDeep from 'lodash/clonedeep.js'
import { slugify } from '#src/utils/formatter.js'
import boardModel from '#src/models/boardModel.js'
import ApiError from '#src/utils/ApiError.js'

export const createNew = async (data) => {
  const updatedData = { ...data, slug: slugify(data.title) }
  const newBoardId = await boardModel.createNew(updatedData)

  return await boardModel.findOneById(newBoardId.insertedId)
}

export const findOneById = async (id) => {
  return await boardModel.findOneById(id)
}

export const getDetails = async (id) => {
  const boardDetail = await boardModel.getDetails(id)

  if (!boardDetail) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

  const cloneBoard = cloneDeep(boardDetail)

  cloneBoard.columns = cloneBoard.columns.map((col) => {
    return {
      ...col,
      cards: cloneBoard.cards.filter((card) => card.columnId.equals(col._id))
    }
  })

  delete cloneBoard.cards

  return cloneBoard
}

const boardService = {
  createNew,
  findOneById,
  getDetails
}

export default boardService
