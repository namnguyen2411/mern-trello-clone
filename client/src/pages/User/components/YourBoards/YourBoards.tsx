import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Public, Lock, Close, StarRounded, StarOutlineRounded } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'
import { UserType } from 'src/types/user.type'
import boardAPI from 'src/apis/board.api'

type YourBoardsProps = {
  user: UserType
  boards: BoardType[]
}

type CreateNewBoardFormType = {
  title: string
  type: BoardType['type']
}

const newBoardFormInitial: CreateNewBoardFormType = {
  title: '',
  type: 'public'
}

export default function YourBoards({ user, boards }: YourBoardsProps) {
  const [openCreateNewBoard, setOpenCreateNewBoard] = useState(false)
  const [createNewBoardForm, setCreateNewBoardForm] = useState<CreateNewBoardFormType>(newBoardFormInitial)
  const [hoverBoardId, setHoverBoardId] = useState('')
  const [hoverBoardStar, setHoverBoardStar] = useState('')

  const queryClient = useQueryClient()
  const createNewBoardMutation = useMutation({
    mutationFn: boardAPI.createNewBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', user._id], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return [...oldData, data]
      })
    }
  })

  const setStarredBoardMutation = useMutation({
    mutationFn: boardAPI.updateBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', user._id], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return oldData.map((board) => {
          if (board._id === data._id) return data
          return board
        })
      })
    }
  })

  const unsetStarredBoardMutation = useMutation({
    mutationFn: boardAPI.updateBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', user._id], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return oldData.map((board) => {
          if (board._id === data._id) return data
          return board
        })
      })
    }
  })

  const handleSetStarredBoard = (_id: BoardType['_id']) => {
    setStarredBoardMutation.mutate({
      _id,
      starred: true,
      starredAt: Date.now()
    })
  }

  const handleUnsetStarredBoard = (_id: BoardType['_id']) => {
    unsetStarredBoardMutation.mutate({
      _id,
      starred: false,
      starredAt: Date.now()
    })
  }

  const handleCloseCreateNewBoard = () => {
    setOpenCreateNewBoard(false)
    setCreateNewBoardForm(newBoardFormInitial)
  }

  const handleSubmitCreateNewForm = () => {
    createNewBoardMutation.mutate({
      title: createNewBoardForm.title,
      type: createNewBoardForm.type,
      ownerId: user._id
    })

    handleCloseCreateNewBoard()
  }

  return (
    <Box>
      {/* Title */}
      <Typography variant='h6'>Your boards</Typography>
      {/* Your boards */}
      <Box display='flex' rowGap={3} columnGap={2} alignItems='center' flexWrap='wrap' mt={2}>
        {boards.map(({ _id, title, slug, starred }) => (
          <Card
            key={_id}
            onMouseEnter={() => setHoverBoardId(_id)}
            onMouseLeave={() => setHoverBoardId('')}
            sx={{
              width: 190,
              height: 98,
              borderRadius: 1,
              position: 'relative',
              border: '1px solid transparent',
              '&:hover': { borderColor: 'primary.dark' },
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
              '& .MuiSvgIcon-root': {
                fontSize: '24px',
                ':hover': { fontSize: '26px' }
              }
            }}
          >
            <Link to={`/b/${_id}/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography component='div' fontWeight='bold'>
                  {title}
                </Typography>
              </CardContent>
            </Link>
            {/* Starred and not hovered */}
            {starred && hoverBoardStar !== _id && (
              <StarRounded
                onClick={() => handleSetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
                fontSize='medium'
                cursor='pointer'
                sx={{
                  position: 'absolute',
                  right: '16px',
                  bottom: 4,
                  transition: '0.2s',
                  color: (theme) => theme.trello.starIconColor
                }}
              />
            )}
            {/* Starred and hovered */}
            {starred && hoverBoardStar === _id && (
              <StarOutlineRounded
                onClick={() => handleUnsetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
                fontSize='medium'
                cursor='pointer'
                sx={{
                  position: 'absolute',
                  right: '16px',
                  bottom: 4,
                  transition: '0.2s',
                  color: (theme) => theme.trello.starIconColor
                }}
              />
            )}
            {/* Not starred */}
            {!starred && (
              <StarOutlineRounded
                onClick={() => handleSetStarredBoard(_id)}
                fontSize='medium'
                cursor='pointer'
                sx={{
                  p: '2px',
                  position: 'absolute',
                  right: hoverBoardId === _id ? '16px' : '-100%',
                  bottom: 4,
                  transition: '0.2s',
                  '&:hover': { p: 0 },
                  zIndex: 2
                }}
              />
            )}
          </Card>
        ))}
        {/* Create new board card */}
        <Card
          onClick={() => setOpenCreateNewBoard(true)}
          sx={{
            width: 190,
            height: 98,
            borderRadius: 1,
            cursor: 'pointer',
            border: '1px solid transparent',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
            '&:hover': { borderColor: 'primary.dark' }
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: '14px'
            }}
          >
            Create new board
          </CardContent>
        </Card>
        {/* Create new board dialog */}
        <Dialog
          sx={{
            '& .MuiPaper-root': {
              width: '360px'
            }
          }}
          open={openCreateNewBoard}
          onClose={handleCloseCreateNewBoard}
        >
          {/* Dialog title */}
          <DialogTitle marginBottom={3} display='flex' justifyContent='space-between' alignItems='center'>
            Create board
            <Close
              fontSize='medium'
              onClick={handleCloseCreateNewBoard}
              cursor='pointer'
              sx={{ padding: 0.5, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' } }}
            />
          </DialogTitle>
          <DialogContent>
            {/* Enter board title */}
            <Box marginBottom={2}>
              <DialogContentText color='text.primary'>Board title (required)</DialogContentText>
              <TextField
                value={createNewBoardForm.title}
                onChange={(e) => setCreateNewBoardForm({ ...createNewBoardForm, title: e.target.value })}
                autoFocus
                fullWidth
                margin='dense'
                name='title'
                type='text'
                variant='outlined'
                sx={{
                  '& .MuiInputBase-input': {
                    py: 1
                  }
                }}
              />
            </Box>
            {/* Select board type */}
            <Box>
              <FormControl fullWidth>
                <DialogContentText mb={1} color='text.primary'>
                  Board type
                </DialogContentText>
                <Select
                  value={createNewBoardForm.type}
                  onChange={(e) =>
                    setCreateNewBoardForm({ ...createNewBoardForm, type: e.target.value as BoardType['type'] })
                  }
                  name='type'
                  defaultValue='public'
                  sx={{
                    '& .MuiSelect-select': {
                      py: 1,
                      display: 'flex',
                      alignItems: 'center'
                    },
                    '& .MuiListItemIcon-root': {
                      minWidth: '36px'
                    }
                  }}
                >
                  <MenuItem value='public'>
                    <ListItemIcon>
                      <Public fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Public</ListItemText>
                  </MenuItem>
                  <MenuItem value='private'>
                    <ListItemIcon>
                      <Lock fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Private</ListItemText>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          {/* Dialog actions */}
          <DialogActions>
            <Button
              type='submit'
              variant='contained'
              onClick={handleSubmitCreateNewForm}
              disabled={!createNewBoardForm.title.trim()}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
