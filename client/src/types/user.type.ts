import { BoardType } from './board.type'

export type UserType = {
  _id: string
  email: string
  boardId: BoardType['_id'][]
  username?: string
  fullName?: string
  avatar?: string
  jobTitle?: string
}
