import { CardType } from 'src/types/card.type'
import { ColumnType } from 'src/types/column.type'
import http from 'src/utils/http'

const createNewCard = async (data: Pick<CardType, 'columnId' | 'boardId' | 'title'>) =>
  (await http.post<CardType>('/cards', data)).data

const deleteCard = async (id: CardType['_id']) => (await http.delete<Omit<ColumnType, 'cards'>>(`/cards/${id}`)).data

const cardAPI = {
  createNewCard,
  deleteCard
}

export default cardAPI
