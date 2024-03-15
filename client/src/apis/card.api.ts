import { CardType } from 'src/types/card.type'
import http from 'src/utils/http'

const createNewCard = async (data: Pick<CardType, 'columnId' | 'boardId' | 'title'>) =>
  (await http.post<CardType>('/cards', data)).data

const cardAPI = {
  createNewCard
}

export default cardAPI
