import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'

export const BOARD_PADDING_TOP = '4px'

export default function Board() {
  return (
    <>
      <BoardBar />
      <BoardContent />
    </>
  )
}
