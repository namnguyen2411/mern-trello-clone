import { ColumnType } from './column.type'
import { UserType } from './user.type'

export type BoardType = {
  _id: string
  ownerId: UserType['_id']
  starred: boolean
  starredAt: number | null
  title: string
  slug: string
  type: 'private' | 'public'
  columnOrderIds: ColumnType['_id'][]
  columns: ColumnType[]
  updatedAt: number | null
}
