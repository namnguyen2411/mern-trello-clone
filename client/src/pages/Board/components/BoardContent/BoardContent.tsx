import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import { Stack } from '@mui/material'
import ColumnList from './components/ColumnList'
import { ColumnType } from 'src/types/column.type'
import { mockData } from 'src/apis/mock-data'
import { MAIN_LAYOUT_PADDING_TOP } from 'src/layouts/MainLayout'

export default function BoardContent() {
  const [orderedColumns, setOrderedColumns] = useState<ColumnType[]>([])

  useEffect(() => {
    setOrderedColumns(mockData.board.columns as ColumnType[])
  }, [])

  return (
    <DndContext>
      <Stack
        flexDirection={'row'}
        paddingBlock={'10px'}
        height={(theme) =>
          `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px - ${MAIN_LAYOUT_PADDING_TOP})`
        }
        bgcolor={(theme) => theme.palette.boardContentBg}
      >
        {/* <ColumnList columns={orderedColumns} /> */}
      </Stack>
    </DndContext>
  )
}
