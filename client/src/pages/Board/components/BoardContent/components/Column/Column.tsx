import { useState, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ExpandMore, AddCard, ContentCut, DeleteForever, Cloud, DragHandle, Close } from '@mui/icons-material'
import {
  Box,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  TextField
} from '@mui/material'
import { ColumnType } from 'src/types/column.type'
import CardList from '../CardList'
import { mapOrder } from 'src/utils/sort'

type ColumnProps = {
  column: ColumnType
}

export default function Column({ column }: ColumnProps) {
  const [openAddNewCard, setOpenAddNewCard] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

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

  const toggleAddNewCardHandler = () => {
    setCardTitle('')
    setOpenAddNewCard(!openAddNewCard)
  }

  const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value)
  }

  const handleAddNewCard = () => {
    if (!cardTitle) return

    // gọi api để thêm Card

    toggleAddNewCardHandler()
  }

  const handleClick = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    setAnchorEl(e.target as HTMLElement)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderCards = mapOrder(column.cards, column.cardOrderIds, '_id')

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
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            variant='h6'
          >
            {column.title}
          </Typography>
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
              <MenuItem>
                <ListItemIcon>
                  <AddCard fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForever fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Column Cards */}
        <CardList cards={orderCards} />

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
                onChange={handleCardTitleChange}
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
