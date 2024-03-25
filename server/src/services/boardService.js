import { StatusCodes } from 'http-status-codes'
import cloneDeep from 'lodash/clonedeep.js'
import { slugify } from '#src/utils/formatter.js'
import boardModel from '#src/models/boardModel.js'
import columnModel from '#src/models/columnModel.js'
import cardModel from '#src/models/cardModel.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (data) => {
  const updatedData = { ...data, slug: slugify(data.title) }
  const newBoardId = await boardModel.createNew(updatedData)

  return await boardModel.findOneById(newBoardId.insertedId)
}

const findOneById = async (id) => {
  return await boardModel.findOneById(id)
}

const getBoardsByOwnerId = async (data) => {
  return await boardModel.getBoardsByOwnerId(data)
}

const getDetails = async (id) => {
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

const update = async (id, data) => {
  if (data.title) data.slug = slugify(data.title)

  return await boardModel.update(id, data)
}

const dragCardToAnotherColumn = async (data) => {
  // remove dragged card from old column
  await columnModel.update(data.oldColumnId, {
    cardOrderIds: data.oldColumnCardOrderIds
  })
  // add dragged card to new column
  await columnModel.update(data.newColumnId, {
    cardOrderIds: data.newColumnCardOrderIds
  })
  // update active card columnId value to new column id
  await cardModel.update(data.cardId, {
    columnId: data.newColumnId
  })

  return {
    message: 'Update success'
  }
}

const boardService = {
  createNew,
  getBoardsByOwnerId,
  findOneById,
  getDetails,
  update,
  dragCardToAnotherColumn
}

export default boardService
