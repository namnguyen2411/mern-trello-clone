import { useQuery } from '@tanstack/react-query'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import boardAPI from 'src/apis/board.api'
import { generatePlaceholderCard } from 'src/utils/generatePlaceholderCard'
import { mapOrder } from 'src/utils/sort'

const boardId = '65eaf36047cb08791e8d6345'

export default function Board() {
  const boardResponse = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardAPI.getBoardDetails(boardId)
  })
  const boardData = boardResponse.data

  // Add placeholder card to empty column
  boardData?.columns.forEach((col) => {
    if (col.cards.length === 0) {
      col.cards.push(generatePlaceholderCard(col))
      col.cardOrderIds = col.cards.map((card) => card._id)
    } else {
      col.cards = mapOrder(col.cards, col.cardOrderIds, '_id')
    }
  })

  if (!boardData) return null
  return (
    <>
      <BoardBar boardTitle={boardData.title} boardType={boardData.type} boardId={boardData._id} />
      <BoardContent board={boardData} />
    </>
  )
}
