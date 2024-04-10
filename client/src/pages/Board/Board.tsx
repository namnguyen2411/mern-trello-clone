import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import boardAPI from 'src/apis/board.api'
import { generatePlaceholderCard } from 'src/utils/generatePlaceholderCard'
import { mapOrder } from 'src/utils/sort'

export default function Board() {
  const params = useParams()
  const boardId = params.boardId as string
  const location = useLocation()
  const locateFrom = location.state?.from

  const boardResponse = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardAPI.getBoardDetails(boardId),
    staleTime: 1000 * 60 * 30 // 30 minutes
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
      <Helmet>
        <title>{boardData.title} | Trello</title>
        <meta name='description' content="User's boards" />
      </Helmet>
      <BoardBar
        boardTitle={boardData.title}
        boardType={boardData.type}
        boardId={boardData._id}
        userId={boardData.ownerId}
      />
      <BoardContent board={boardData} locateFrom={locateFrom} />
    </>
  )
}
