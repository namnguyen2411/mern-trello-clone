import http from 'src/utils/http'
import { BoardType } from 'src/types/board.type'

type updateBoardDataType = Omit<Partial<BoardType>, '_id'> & { _id: BoardType['_id'] }

const getBoardDetails = async (boardId: string) => {
  const respone = await http.get<BoardType>(`boards/${boardId}`)
  return respone.data
}

const updateBoard = async (data: updateBoardDataType) => http.put<BoardType>(`boards/${data._id}`, data)

const deleteBoard = async (id: string) => await http.delete(`/boards/${id}`)

const boardAPI = {
  getBoardDetails,
  updateBoard,
  deleteBoard
}

export default boardAPI
