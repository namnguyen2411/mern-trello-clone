import cardModel from '#src/models/cardModel.js'
import columnModel from '#src/models/columnModel.js'

export const createNew = async (data) => {
  const newCardId = await cardModel.createNew(data)
  const newCard = await cardModel.findOneById(newCardId.insertedId)

  if (newCard) await columnModel.pushToCardOrderIds(newCard)
  return newCard
}

const deleteCard = async (id) => {
  const foundedCard = await cardModel.findOneById(id)
  if (!foundedCard) throw new ApiError(StatusCodes.NOT_FOUND, 'Card not found')

  await cardModel.deleteOneById(id)
  return await columnModel.pullFromCardOrderIds(foundedCard)
}

const cardService = {
  createNew,
  deleteCard
}

export default cardService
