import { slugify } from '#src/utils/formatter.js'
import boardModel from '#src/models/boardModel.js'

export const createNew = async (data) => {
  const updatedData = { ...data, slug: slugify(data.title) }
  const newBoardId = await boardModel.createNew(updatedData)

  return await boardModel.findOneById(newBoardId.insertedId)
}

const boardService = {
  createNew
}

export default boardService
