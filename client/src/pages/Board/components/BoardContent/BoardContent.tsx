import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Active,
  Collision,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DroppableContainer,
  // MouseSensor,
  Over,
  // TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from 'src/customLibs/dndKitSensor'
import { arrayMove } from '@dnd-kit/sortable'
import cloneDeep from 'lodash/cloneDeep'
import { Box } from '@mui/material'
import ColumnList from './components/ColumnList'
import { BoardType } from 'src/types/board.type'
import { ColumnType } from 'src/types/column.type'
import { CardType } from 'src/types/card.type'
import { mapOrder } from 'src/utils/sort'
import Column from './components/Column'
import Card from './components/Card'
import { generatePlaceholderCard } from 'src/utils/generatePlaceholderCard'

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
  // Card flickering when center of draggable at the equal distance between other draggables
  // https://github.com/clauderic/dnd-kit/issues/1128#issuecomment-1671336452
  const lastOverId = useRef<string | null>(null)
  const customCollisionDetection = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: any) => {
      if (draggingItem.type === 'column') return closestCorners({ ...args })

      // tìm các điểm giao nhau va chạm với con trỏ
      const pointerIntersection: Collision[] = pointerWithin(args)
      // nếu kéo ra khỏi khung hình hoặc các khu vực ko có card hay column thì ko làm gì nữa
      if (!pointerIntersection.length) return

      let overId = getFirstCollision(pointerIntersection, 'id')
      // nếu overId là column thì sẽ dùng closestCenter để tìm cardId gần nhất trong khu vực va chạm
      if (overId) {
        const checkColumn = orderedColumns.find((col) => col._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container: DroppableContainer) =>
                container.id !== overId && checkColumn?.cardOrderIds.includes(container.id as string)
            )
          })[0]?.id
        }
        lastOverId.current = overId as string
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [draggingItem, orderedColumns]
  )

  useEffect(() => {
    const latestOrderedCols = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(latestOrderedCols)
  }, [board])

  const findColumnByCardId = (cardId: string) => {
    return orderedColumns.find((col) => col?.cards.some((card) => card._id === cardId))
  }

  const dragCardToAnotherColumn = (
    activeColumn: ColumnType,
    overColumn: ColumnType,
    activeId: string,
    overId: string,
    active: Active,
    over: Over,
    activeData: CardType
  ) => {
    setOrderedColumns(() => {
      const overCardIndex = overColumn.cards.findIndex((card) => card._id === overId) as number

      // copy from dnd kit github
      // tính toán index mới cho activeCard sắp đc thả (trên hay dưới so với overCard)
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      const newIndex = overCardIndex >= 0 ? overCardIndex + modifier : activeColumn.cards.length + 1

      const cloneColumns: ColumnType[] = cloneDeep(orderedColumns)
      const oldColumn = cloneColumns.find((col) => col._id === activeData.columnId) as ColumnType
      const newColumn = cloneColumns.find((col) => col._id === overColumn._id) as ColumnType

      // remove activeCard from oldColumn
      oldColumn.cards = oldColumn.cards.filter((card) => card._id !== activeId)
      // push placeholderCard (an empty card) into oldColumn if oldColumn is empty
      if (oldColumn.cards.length === 0) oldColumn.cards.push(generatePlaceholderCard(oldColumn))
      oldColumn.cardOrderIds = oldColumn.cardOrderIds.filter((id) => id !== activeId)

      // check if activeCard is already in newColumn, if yes, remove it
      // or if it's a placeholder card, remove it
      newColumn.cards = newColumn.cards.filter((card) => card._id !== activeId && !card.FE_placeHolderCard)
      // update activeCard columnId to newColumn id
      activeData.columnId = newColumn._id
      // insert activeCard into newColumn
      newColumn.cards.splice(newIndex, 0, activeData)
      newColumn.cardOrderIds.splice(newIndex, 0, activeData._id)

      return cloneColumns
    })
  }

  const handleDragStart = (e: DragStartEvent) => {
    const { id, data } = e.active
    setDraggingItem({
      id: id as string,
      type: data.current?.columnId ? 'card' : 'column',
      data: data.current
    })
  }

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e

    // drap-drop column works fine so just return
    if (draggingItem.type === 'column' || !over || !active) return

    // drag-drop card to another column
    const {
      id: activeId,
      data: { current: activeData }
    } = active
    const {
      id: overId,
      data: { current: overData }
    } = over

    const activeColumn = findColumnByCardId(activeId as string)
    const overColumn = findColumnByCardId(overId as string)

    if (!activeColumn || !overColumn) return

    if ((activeData as CardType).columnId !== (overData as CardType).columnId) {
      dragCardToAnotherColumn(
        activeColumn,
        overColumn,
        activeId as string,
        overId as string,
        active,
        over,
        activeData as CardType
      )
    }
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!active || !over || active.id === over.id) return

    if (draggingItem.type === 'card') {
      const {
        id: activeId,
        data: { current: activeData }
      } = active
      const {
        id: overId,
        data: { current: overData }
      } = over

      const activeColumn = findColumnByCardId(activeId as string)
      const overColumn = findColumnByCardId(overId as string)

      if (!activeColumn || !overColumn) return

      // drag-drop card to another column
      if ((activeData as CardType).columnId !== (overData as CardType).columnId) {
        dragCardToAnotherColumn(
          activeColumn,
          overColumn,
          activeId as string,
          overId as string,
          active,
          over,
          activeData as CardType
        )
      }
      // drag-drop card in the same column
      else {
        setOrderedColumns(() => {
          const cloneColumns: ColumnType[] = cloneDeep(orderedColumns)

          const targetColumn = cloneColumns.find((col) => col._id === (activeData as CardType).columnId) as ColumnType
          const oldIndex = targetColumn.cards.findIndex((card) => card._id === activeId) as number
          const newIndex = targetColumn.cards.findIndex((card) => card._id === overId) as number
          targetColumn.cards = arrayMove(targetColumn.cards, oldIndex, newIndex)
          targetColumn.cardOrderIds = targetColumn.cards.map((card) => card._id)

          return cloneColumns
        })
      }
    }

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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={customCollisionDetection as CollisionDetection}
    >
      <Box
        paddingBlock={'10px'}
        minHeight={(theme) =>
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
      </Box>
    </DndContext>
  )
}
