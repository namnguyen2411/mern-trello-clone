import { useState } from 'react'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { NoteAdd, Close } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import { ColumnType } from 'src/types/column.type'
import Column from '../Column'

type ColumnListProps = {
  columns: ColumnType[]
}

export default function ColumnList({ columns }: ColumnListProps) {
  const [openAddNewColumn, setOpenAddNewColumn] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const toggleAddNewColumnHandler = () => {
    setOpenAddNewColumn(!openAddNewColumn)
    setColumnTitle('')
  }

  const handleColumnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value)
  }

  const handleAddNewColumn = () => {
    if (!columnTitle) return

    // gọi api để thêm column

    toggleAddNewColumnHandler()
  }

  return (
    <SortableContext items={columns.map((column) => column._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { margin: 2 }
        }}
      >
        {columns?.map((column) => <Column key={column._id} column={column} />)}

        {/* Close add new column */}
        {!openAddNewColumn && (
          <Box
            onClick={toggleAddNewColumnHandler}
            sx={{
              minWidth: (theme) => theme.trello.addNewColumnWidth,
              maxWidth: (theme) => theme.trello.addNewColumnWidth,
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: (theme) => theme.palette.cardBg
            }}
          >
            <Button
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
              startIcon={<NoteAdd />}
            >
              Add new column
            </Button>
          </Box>
        )}

        {/* Open add new column */}
        {openAddNewColumn && (
          <Box
            sx={{
              minWidth: (theme) => theme.trello.addNewColumnWidth,
              maxWidth: (theme) => theme.trello.addNewColumnWidth,
              mx: 2,
              padding: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: (theme) => theme.palette.cardBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              size='small'
              label='Enter column title'
              type='text'
              variant='outlined'
              autoFocus
              value={columnTitle}
              onChange={handleColumnTitleChange}
              sx={{
                width: '100%',
                color: 'inherit'
              }}
            />
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button
                variant='contained'
                size='small'
                onClick={handleAddNewColumn}
                sx={{
                  '&:hover': {
                    bgcolor: 'primary'
                  }
                }}
              >
                Add new column
              </Button>
              <Close
                fontSize='small'
                cursor={'pointer'}
                sx={{
                  ml: 1,
                  '&:hover': {
                    color: 'error.main'
                  }
                }}
                onClick={toggleAddNewColumnHandler}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}
