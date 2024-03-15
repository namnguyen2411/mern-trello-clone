import { useQuery } from '@tanstack/react-query'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import boardAPI from 'src/apis/board.api'

const boardId = '65eaf36047cb08791e8d6345'

export default function Board() {
  const boardResponse = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardAPI.getBoardDetails(boardId)
  })
  const boardData = boardResponse.data

  if (!boardData) return null
  return (
    <>
      <BoardBar boardTitle={boardData.title} boardType={boardData.type} />
      <BoardContent board={boardData} />
    </>
  )
}
