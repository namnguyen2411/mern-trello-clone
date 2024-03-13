import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Stack } from '@mui/material'
import ColumnList from './components/ColumnList'
import { BoardType } from 'src/types/board.type'
import { ColumnType } from 'src/types/column.type'
import { CardType } from 'src/types/card.type'
import { mapOrder } from 'src/utils/sort'
import Column from './components/Column'
import Card from './components/Card'
import { arrayMove } from '@dnd-kit/sortable'

type BoardProps = {
  board: BoardType
}

type DraggingItemType = {
  id: string
  type?: 'column' | 'card'
  data?: Record<string, unknown>
}

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

export default function BoardContent({ board }: BoardProps) {
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])
  const [draggingItem, setDraggingItem] = useState<DraggingItemType>({
    id: '',
    type: undefined,
    data: undefined
  })

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

  const handleDragStart = (e: DragStartEvent) => {
    const { id, data } = e.active
    setDraggingItem({
      id: id as string,
      type: data.current?.columnId ? 'card' : 'column',
      data: data.current
    })
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (!active || !over || active.id === over.id) return

    if (draggingItem.type === 'card') {
      //
    }

    // console.log(active.id, over.id)
    if (draggingItem.type === 'column') {
      const oldIndex = orderedColumns.findIndex((col) => col._id === active.id)
      const newIndex = orderedColumns.findIndex((col) => col._id === over.id)
      setOrderedColumns(arrayMove(orderedColumns, oldIndex, newIndex))
    }

    setDraggingItem({
      id: '',
      type: undefined,
      data: undefined
    })
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Stack
        flexDirection={'row'}
        paddingBlock={'10px'}
        height={(theme) =>
          `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px - ${theme.trello.MAIN_LAYOUT_PADDING_TOP})`
        }
        bgcolor={(theme) => theme.palette.boardContentBg}
      >
        <ColumnList columns={orderedColumns} />

        <DragOverlay dropAnimation={dropAnimation}>
          {draggingItem.id === '' ? null : draggingItem.type === 'column' ? (
            <Column column={draggingItem.data as ColumnType} />
          ) : (
            <Card card={draggingItem.data as CardType} />
          )}
        </DragOverlay>
      </Stack>
    </DndContext>
  )
}
