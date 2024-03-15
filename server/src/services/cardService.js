import cardModel from '#src/models/cardModel.js'
import columnModel from '#src/models/columnModel.js'

export const createNew = async (data) => {
  const newCardId = await cardModel.createNew(data)
  const newCard = await cardModel.findOneById(newCardId.insertedId)

  if (newCard) await columnModel.pushToCardOrderIds(newCard)
  return newCard
}

const cardService = {
  createNew
}

export default cardService
