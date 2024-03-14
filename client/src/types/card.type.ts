import { BoardType } from './board.type'
import { ColumnType } from './column.type'

export type CardType = {
  _id: string
  boardId: BoardType['_id']
  columnId: ColumnType['_id']
  title: string
  cover: string | null
  description: string | null
  FE_placeHolderCard?: boolean
}
