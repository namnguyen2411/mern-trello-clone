import { CardType } from 'src/types/card.type'
import { ColumnType } from 'src/types/column.type'
import http from 'src/utils/http'

type UpdateCardDataType = Pick<Partial<CardType>, 'title' | 'description' | 'cover'> & { _id: CardType['_id'] }

const createNewCard = async (data: Pick<CardType, 'columnId' | 'boardId' | 'title'>) =>
  (await http.post<CardType>('/cards', data)).data

const updateCard = async (data: UpdateCardDataType) => (await http.put<CardType>(`/cards/${data._id}`, data)).data

const deleteCard = async (id: CardType['_id']) => (await http.delete<Omit<ColumnType, 'cards'>>(`/cards/${id}`)).data

const cardAPI = {
  createNewCard,
  deleteCard,
  updateCard
}

export default cardAPI
