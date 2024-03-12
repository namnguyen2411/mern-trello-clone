import { BoardType } from './board.type'
import { CardType } from './card.type'

export type ColumnType = {
  _id: string
  boardId: BoardType['_id']
  title: string
  cardOrderIds: CardType['_id'][]
  cards: CardType[]
}
