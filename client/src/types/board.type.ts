import { ColumnType } from './column.type'

export type BoardType = {
  _id: string
  title: string
  type: 'private' | 'public'
  columnOrderIds: ColumnType['_id'][]
  columns: ColumnType[]
}
