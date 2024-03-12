import { BoardType } from 'src/types/board.type'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import { mockData } from 'src/apis/mock-data'

export default function Board() {
  return (
    <>
      <BoardBar boardTitle={mockData.board.title} boardType={mockData.board.type} />
      <BoardContent board={mockData.board as BoardType} />
    </>
  )
}
