import http from 'src/utils/http'
import { BoardType } from 'src/types/board.type'

export const getBoardDetails = async (boardId: string) => {
  const respone = await http.get<BoardType>(`boards/${boardId}`)
  return respone.data
}

const boardAPI = {
  getBoardDetails
}

export default boardAPI
