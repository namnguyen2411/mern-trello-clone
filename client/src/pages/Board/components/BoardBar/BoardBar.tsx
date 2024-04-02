import { useState, MouseEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import { Public, Lock, Delete } from '@mui/icons-material'
import { Chip, Tooltip, Box, Menu, MenuItem, ListItemIcon, Button, TextField, ListItemText } from '@mui/material'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'
import { UserType } from 'src/types/user.type'
import { useNavigate } from 'react-router-dom'

type BoardBarProps = {
  boardTitle: string
  boardType: 'public' | 'private'
  boardId: BoardType['_id']
  userId: UserType['_id']
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

export default function BoardBar({ boardTitle, boardType, boardId, userId }: BoardBarProps) {
  const [openEditBoardTitle, setOpenEditBoardTitle] = useState(false)
  const [boardTitleState, setBoardTitleState] = useState(boardTitle)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [boardTypeState, setboardTypeState] = useState<'public' | 'private'>(boardType)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

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

  const deleteBoardMutation = useMutation({
    mutationFn: boardAPI.deleteBoard,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ['board', boardId] })
      queryClient.setQueryData(['boards', 'userId', userId], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return oldData.filter((board) => board._id !== boardId)
      })

      navigate(`/u/${userId}/boards`, {
        state: {
          from: 'delete-board',
          message: data.message
        }
      })

      toast.success(data.message, {
        position: 'top-right',
        autoClose: 4000
      })
    }
  })

  const confirm = useConfirm()
  const handleDeleteBoard = () => {
    confirm({
      title: 'Delete Board',
      description: 'This action will permanently delete this board and all of its columns and cards. Are you sure?',
      confirmationButtonProps: {
        color: 'error',
        variant: 'contained'
      },
      cancellationButtonProps: {
        variant: 'contained'
      }
    })
      .then(() => {
        deleteBoardMutation.mutate(boardId)
      })
      .catch(() => {})
  }

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
      alignItems={'center'}
      justifyContent={'space-between'}
      px={2}
      height={(theme) => theme.trello.boardBarHeight}
      bgcolor={(theme) => (theme.palette.mode === 'light' ? '#eee' : '#333')}
      fontSize={16}
      sx={{
        overflowX: 'auto'
      }}
    >
      {/* Left side */}
      <Box display='flex' alignItems='center' gap={3}>
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
      {/* Right side */}
      <Box
        mr='12px'
        sx={{
          '& .MuiSvgIcon-root': {}
        }}
      >
        <Box display='flex' alignItems='center'>
          <Tooltip title='Delete board'>
            <Chip
              sx={{ ...CHIP_SX_PROPS, cursor: 'pointer' }}
              icon={<Delete />}
              label='Delete'
              onClick={handleDeleteBoard}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}
