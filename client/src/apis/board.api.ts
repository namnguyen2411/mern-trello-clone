import http from 'src/utils/http'
import { BoardType } from 'src/types/board.type'
import { CardType } from 'src/types/card.type'
import { ColumnType } from 'src/types/column.type'
import { UserType } from 'src/types/user.type'

type CreateNewBoardDataType = Pick<BoardType, 'type' | 'title' | 'ownerId'>
type UpdateBoardDataType = Omit<Partial<BoardType>, '_id' | 'userId' | 'slug' | 'createdAt'> & {
  _id: BoardType['_id']
}
type DragCardToAnotherColumnDataType = {
  cardId: CardType['_id']
  oldColumnId: ColumnType['_id']
  oldColumnCardOrderIds: CardType['_id'][]
  newColumnId: ColumnType['_id']
  newColumnCardOrderIds: CardType['_id'][]
}

const createNewBoard = async (data: CreateNewBoardDataType) => (await http.post<BoardType>('/boards/create', data)).data

const getBoardsByOwnerId = async (ownerId: UserType['_id']) =>
  (await http.post<BoardType[]>(`/boards/${ownerId}}`, { ownerId })).data

const getBoardDetails = async (boardId: string) => {
  const respone = await http.get<BoardType>(`boards/${boardId}`)
  return respone.data
}

const updateBoard = async (data: UpdateBoardDataType) => (await http.put<BoardType>(`boards/${data._id}`, data)).data

const dragCardToAnotherColumnAPI = async (data: DragCardToAnotherColumnDataType) =>
  (await http.put<{ message: string }>('boards/dragging_card', data)).data

const deleteBoard = async (id: string) =>
  (await http.delete<{ message: string; data: BoardType }>(`/boards/${id}`)).data

const boardAPI = {
  createNewBoard,
  getBoardsByOwnerId,
  getBoardDetails,
  updateBoard,
  deleteBoard,
  dragCardToAnotherColumnAPI
}

export default boardAPI
