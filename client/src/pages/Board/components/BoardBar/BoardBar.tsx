import { useState, MouseEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Public, Lock } from '@mui/icons-material'
import { Chip, Tooltip, Box, Menu, MenuItem, ListItemIcon, Button, TextField, ListItemText } from '@mui/material'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'

type BoardBarProps = {
  boardTitle: string
  boardType: 'public' | 'private'
  boardId: BoardType['_id']
}

const CHIP_SX_PROPS = {
  color: 'primary.main',
  bgcolor: 'transparent',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.100'
  }
}

export default function BoardBar({ boardTitle, boardType, boardId }: BoardBarProps) {
  const [openEditBoardTitle, setOpenEditBoardTitle] = useState(false)
  const [boardTitleState, setBoardTitleState] = useState(boardTitle)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [boardTypeState, setboardTypeState] = useState<'public' | 'private'>(boardType)
  const open = Boolean(anchorEl)

  const queryClient = useQueryClient()
  const updateBoardMutation = useMutation({
    mutationFn: boardAPI.updateBoard,
    onSuccess: ({ title, slug, type }) => {
      queryClient.setQueryData(['board', boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          title,
          slug,
          type
        }
      })
    }
  })

  const handleChangeBoardTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitleState(event.target.value)
  }

  const handleSubmitBoardTitle = () => {
    const trimmedBoardTitle = boardTitleState.trim()
    setBoardTitleState(() => {
      if (trimmedBoardTitle && trimmedBoardTitle !== boardTitle) {
        updateBoardMutation.mutate({ _id: boardId, title: trimmedBoardTitle })
        return trimmedBoardTitle
      }
      return boardTitle
    })
    setOpenEditBoardTitle(!openEditBoardTitle)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleBoardTypeChange = (type: 'public' | 'private') => {
    if (type !== boardTypeState) {
      setboardTypeState(type)
      updateBoardMutation.mutate({ _id: boardId, type })
    }
    setAnchorEl(null)
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={3}
      px={2}
      height={(theme) => theme.trello.boardBarHeight}
      bgcolor={(theme) => (theme.palette.mode === 'light' ? '#eee' : '#333')}
      fontSize={16}
      sx={{
        overflowX: 'auto'
      }}
    >
      {/* Board title */}
      <Box>
        {/* Toggle edit board title */}
        {!openEditBoardTitle && (
          <Tooltip title={'Change title'}>
            <Chip
              sx={{ ...CHIP_SX_PROPS, fontWeight: 'bold', fontSize: '1rem' }}
              label={boardTitleState}
              onClick={() => setOpenEditBoardTitle(!openEditBoardTitle)}
              clickable
            />
          </Tooltip>
        )}

        {openEditBoardTitle && (
          <TextField
            size='small'
            variant='outlined'
            value={boardTitleState}
            onChange={handleChangeBoardTitle}
            onBlur={handleSubmitBoardTitle}
            autoFocus
          />
        )}
      </Box>
      {/* Board type */}
      <Box>
        <Tooltip title='Change type'>
          <Button
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'board-type' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            {
              <Chip
                sx={{ ...CHIP_SX_PROPS, textTransform: 'capitalize' }}
                icon={boardTypeState === 'public' ? <Public fontSize='small' /> : <Lock fontSize='small' />}
                label={boardTypeState}
              />
            }
          </Button>
        </Tooltip>
        <Menu
          id='board-type'
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'button-profile'
          }}
        >
          <MenuItem onClick={() => handleBoardTypeChange('public')}>
            <ListItemIcon>
              <Public fontSize='small' />
            </ListItemIcon>
            <ListItemText>Public</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleBoardTypeChange('private')}>
            <ListItemIcon>
              <Lock fontSize='small' />
            </ListItemIcon>
            <ListItemText>Private</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
