import { useEffect, useState } from 'react'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Stack } from '@mui/material'
import ColumnList from './components/ColumnList'
import { BoardType } from 'src/types/board.type'
import { ColumnType } from 'src/types/column.type'
import { mapOrder } from 'src/utils/sort'

type BoardProps = {
  board: BoardType
}

export default function BoardContent({ board }: BoardProps) {
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])

  // https://docs.dndkit.com/api-documentation/sensors
  // Require the mouse to move by 10 pixels before activating
  const mouseSensors = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  // The delay property represents the duration (milliseconds),
  // that a draggable item needs to be held by the touch input before a drag start event is emitted.
  const touchSensors = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensors, touchSensors)

  useEffect(() => {
    const latestOrderedCols = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(latestOrderedCols)
  }, [board])

  return (
    <DndContext sensors={sensors}>
      <Stack
        flexDirection={'row'}
        paddingBlock={'10px'}
        height={(theme) =>
          `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px - ${theme.trello.MAIN_LAYOUT_PADDING_TOP})`
        }
        bgcolor={(theme) => theme.palette.boardContentBg}
      >
        <ColumnList columns={orderedColumns} />
      </Stack>
    </DndContext>
  )
}
