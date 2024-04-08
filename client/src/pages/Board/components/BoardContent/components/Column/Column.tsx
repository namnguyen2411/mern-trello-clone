import { useState, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConfirm } from 'material-ui-confirm'
import { CSS } from '@dnd-kit/utilities'
import { ExpandMore, AddCard, DragHandle, Close } from '@mui/icons-material'
import { Box, Typography, Tooltip, Menu, MenuItem, ListItemText, Divider, Button, TextField } from '@mui/material'
import { BoardType } from 'src/types/board.type'
import { ColumnType } from 'src/types/column.type'
import CardList from '../CardList'
import cardAPI from 'src/apis/card.api'
import columnAPI from 'src/apis/column.api'

type ColumnProps = {
  column: ColumnType
}

export default function Column({ column }: ColumnProps) {
  const [openEditColumnTitle, setOpenEditColumnTitle] = useState(false)
  const [columnTitle, setColumnTitle] = useState(column.title)
  const [openAddNewCard, setOpenAddNewCard] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const queryClient = useQueryClient()
  const updateColumnTitleMutation = useMutation({
    mutationFn: columnAPI.updateColumn,
    onSuccess: (data) => {
      queryClient.setQueryData(['board', column.boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          columns: oldData.columns.map((col) => {
            if (col._id !== data._id) return col
            return {
              ...col,
              title: data.title
            }
          })
        }
      })
    }
  })

  const addCardMutation = useMutation({
    mutationFn: cardAPI.createNewCard,
    onSuccess: (data) => {
      queryClient.setQueryData(['board', column.boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          columns: oldData.columns.map((col) => {
            if (col._id !== data.columnId) return col
            return {
              ...col,
              cards: col.cards[0].FE_placeHolderCard ? [data] : [...col.cards, data],
              cardOrderIds: col.cardOrderIds[0].includes('placeholder') ? [data._id] : [...col.cardOrderIds, data._id]
            }
          })
        }
      })
    }
  })

  const deleteColumnMutation = useMutation({
    mutationFn: columnAPI.deleteColumn,
    onSuccess: (_data, deletedColumnId) => {
      queryClient.setQueryData(['board', column.boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          columns: oldData.columns.filter((col) => col._id !== deletedColumnId),
          columnOrderIds: oldData.columnOrderIds.filter((colId) => colId !== deletedColumnId)
        }
      })
    }
  })

  const confirm = useConfirm()
  const handleDeleteColumn = () => {
    handleClose()
    confirm({
      title: 'Delete column',
      description: 'This action will permanently delete this column and all of its cards. Are you sure?',
      confirmationButtonProps: {
        color: 'error',
        variant: 'contained'
      },
      cancellationButtonProps: {
        variant: 'contained'
      }
    }).then(() => {
      deleteColumnMutation.mutate(column._id)
    })
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    // Nếu sử dụng CSS.Transform như docs thì gặp lỗi kiểu co giãn
    // https://github.com/clauderic/dnd-kit/issues/117
    // Fix => CSS.Translate
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: 'none',
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const handleChangeColumnTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value)
  }

  const handleSubmitColumnTitle = () => {
    setColumnTitle(() => {
      const trimmedColumnTitle = columnTitle.trim()
      if (trimmedColumnTitle && trimmedColumnTitle !== column.title) {
        updateColumnTitleMutation.mutate({ _id: column._id, title: trimmedColumnTitle })
        return trimmedColumnTitle
      }
      return column.title
    })

    setOpenEditColumnTitle(!openEditColumnTitle)
  }

  const toggleAddNewCardHandler = () => {
    setCardTitle('')
    setOpenAddNewCard(!openAddNewCard)
    handleClose()
  }

  const handleChangeCardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value)
  }

  const handleAddNewCard = () => {
    if (!cardTitle) return

    addCardMutation.mutate({
      title: cardTitle,
      columnId: column._id,
      boardId: column.boardId
    })

    toggleAddNewCardHandler()
  }

  const handleClick = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    setAnchorEl(e.target as HTMLElement)
    setOpenAddNewCard((prev) => (prev === true ? false : false))
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    // Phải bọc div ở đây vì vấn đề chiều cao của col khi kéo thả dẫn đến lỗi kiểu flickering,
    // khi kéo col ngắn vào vị trí col dài hơn thì phải kéo vòng thấp xuống chứ ko thể kéo qua ngang
    // hoặc kéo vòng lên trên được
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => theme.trello.columnWidth,
          maxWidth: (theme) => theme.trello.columnWidth,
          bgcolor: (theme) => theme.palette.cardBg,
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px)`
        }}
      >
        {/* Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Column Title */}
          {/* Toggle edit column title */}
          {!openEditColumnTitle && (
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              variant='h6'
              onClick={() => setOpenEditColumnTitle(!openEditColumnTitle)}
            >
              {columnTitle}
            </Typography>
          )}

          {openEditColumnTitle && (
            <TextField
              autoFocus
              variant='standard'
              size='small'
              value={columnTitle}
              onChange={handleChangeColumnTitle}
              onBlur={handleSubmitColumnTitle}
            />
          )}
          {/* Column Header Dropdown */}
          <Box>
            <Tooltip title='More options'>
              <ExpandMore
                id='button-dropdown'
                aria-controls={open ? 'menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
              />
            </Tooltip>
            <Menu
              id='menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'button-dropdown'
              }}
            >
              <MenuItem onClick={toggleAddNewCardHandler}>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleDeleteColumn}>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Column Cards */}
        <CardList cards={column.cards} />

        {/* Column Footer */}
        <Box
          sx={{
            height: 'fit-content',
            padding: '8px 12px'
          }}
        >
          {/* Toggle add new card */}
          {!openAddNewCard && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                startIcon={<AddCard />}
                onClick={toggleAddNewCardHandler}
                sx={{
                  ':hover': {
                    bgcolor: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 400 : 700]
                  }
                }}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandle cursor={'grab'} />
              </Tooltip>
            </Box>
          )}

          {openAddNewCard && (
            <Box
              // Block DnD event propagation
              data-no-dnd='true'
              sx={{
                borderRadius: '6px',
                height: '100%',
                bgcolor: (theme) => theme.palette.cardBg,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <TextField
                size='small'
                label='Enter card title'
                type='text'
                variant='outlined'
                autoFocus
                value={cardTitle}
                onChange={handleChangeCardTitle}
                sx={{
                  width: '100%'
                }}
              />
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Button
                  variant='contained'
                  size='small'
                  onClick={handleAddNewCard}
                  sx={{
                    '&:hover': {
                      bgcolor: 'primary'
                    }
                  }}
                >
                  Add new Card
                </Button>
                <Close
                  fontSize='small'
                  sx={{
                    ml: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      color: (theme) => theme.palette.error.main
                    }
                  }}
                  onClick={toggleAddNewCardHandler}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}
