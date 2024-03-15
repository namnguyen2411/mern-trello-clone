import { ColumnType } from 'src/types/column.type'
import http from 'src/utils/http'

const createNewColumn = async (data: Pick<ColumnType, 'boardId' | 'title'>) =>
  (await http.post<ColumnType>('/columns', data)).data

const columnAPI = {
  createNewColumn
}

export default columnAPI
