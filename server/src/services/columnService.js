import { StatusCodes } from 'http-status-codes'
import columnModel from '#src/models/columnModel.js'
import boardModel from '#src/models/boardModel.js'
import cardModel from '#src/models/cardModel.js'
import ApiError from '#src/utils/ApiError.js'

const createNew = async (data) => {
  const newColumnId = await columnModel.createNew(data)
  const newColumn = await columnModel.findOneById(newColumnId.insertedId)

  if (newColumn) {
    newColumn.cards = []
    await boardModel.pushToColumnOrderIds(newColumn)
  }

  return newColumn
}
const update = async (id, data) => {
  return await columnModel.update(id, data)
}

const deleteColumn = async (id) => {
  const targetColumn = await columnModel.findOneById(id)

  if (!targetColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')

  await columnModel.deleteOneById(id)
  await cardModel.deleteManyByColumnId(id)
  await boardModel.pullFromColumnOrderIds(targetColumn)

  return {
    message: 'Delete column success'
  }
}

const columnService = {
  createNew,
  update,
  deleteColumn
}

export default columnService
