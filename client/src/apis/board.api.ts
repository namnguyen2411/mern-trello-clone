import http from 'src/utils/http'
import { BoardType } from 'src/types/board.type'
import { CardType } from 'src/types/card.type'
import { ColumnType } from 'src/types/column.type'

type updateBoardDataType = Omit<Partial<BoardType>, '_id'> & { _id: BoardType['_id'] }
type DragCardToAnotherColumnDataType = {
  cardId: CardType['_id']
  oldColumnId: ColumnType['_id']
  oldColumnCardOrderIds: CardType['_id'][]
  newColumnId: ColumnType['_id']
  newColumnCardOrderIds: CardType['_id'][]
}

const getBoardDetails = async (boardId: string) => {
  const respone = await http.get<BoardType>(`boards/${boardId}`)
  return respone.data
}

const updateBoard = async (data: updateBoardDataType) =>
  (await http.put<BoardType & { slug: string }>(`boards/${data._id}`, data)).data

const dragCardToAnotherColumnAPI = async (data: DragCardToAnotherColumnDataType) =>
  (await http.put<BoardType>('boards/dragging_card', data)).data

const deleteBoard = async (id: string) => (await http.delete<{ message: string }>(`/boards/${id}`)).data

const boardAPI = {
  getBoardDetails,
  updateBoard,
  deleteBoard,
  dragCardToAnotherColumnAPI
}

export default boardAPI
