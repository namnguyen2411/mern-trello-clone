import { BoardType } from './board.type'

export type UserType = {
  _id: string
  email: string
  boardIds: BoardType['_id'][]
  username?: string
  avatar?: string
}
