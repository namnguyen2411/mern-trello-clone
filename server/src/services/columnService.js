import columnModel from '#src/models/columnModel.js'
import boardModel from '#src/models/boardModel.js'

export const createNew = async (data) => {
  const newColumnId = await columnModel.createNew(data)
  const newColumn = await columnModel.findOneById(newColumnId.insertedId)

  if (newColumn) {
    newColumn.cards = []
    await boardModel.pushToColumnOrderIds(newColumn)
  }

  return newColumn
}

const columnService = {
  createNew
}

export default columnService
