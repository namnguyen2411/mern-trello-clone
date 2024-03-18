import { ColumnType } from 'src/types/column.type'
import http from 'src/utils/http'

type UpdateColumnDataType = Omit<Partial<ColumnType>, '_id'> & { _id: ColumnType['_id'] }

const createNewColumn = async (data: Pick<ColumnType, 'boardId' | 'title'>) =>
  (await http.post<ColumnType>('/columns', data)).data

const updateColumn = async (data: UpdateColumnDataType) => await http.put<ColumnType>(`/columns/${data._id}`, data)

const deleteColumn = async (id: string) => await http.delete(`/columns/${id}`)

const columnAPI = {
  createNewColumn,
  updateColumn,
  deleteColumn
}

export default columnAPI
