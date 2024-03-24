import { useState } from 'react'
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
import { Public, Lock, Close, StarOutline } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'

export default function YourBoards() {
  const [openCreateNewBoard, setOpenCreateNewBoard] = useState(false)
  const [form, setForm] = useState<{ title: string; type: 'public' | 'private' }>({ title: '', type: 'public' })
  const [hoverBoardIndex, setHoverBoardIndex] = useState(-1)

  const handleSetStarredBoard = (id: BoardType['_id']) => {
    console.log(id)
    // call api set starred board
  }

  return (
    <Box>
      {/* Title */}
      <Typography variant='h6'>Your boards</Typography>
      {/* Your boards */}
      <Box display='flex' rowGap={3} columnGap={2} alignItems='center' flexWrap='wrap' mt={2}>
        <Card
          onMouseEnter={() => setHoverBoardIndex(0)}
          onMouseLeave={() => setHoverBoardIndex(-1)}
          sx={{
            width: 190,
            height: 98,
            borderRadius: 1,
            position: 'relative',
            border: '1px solid transparent',
            '&:hover': { borderColor: 'primary.dark' },
            bgcolor: (theme) => (theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg)
          }}
        >
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography component='div' fontWeight='bold'>
                Goals and Tasks - Personal Life
              </Typography>
            </CardContent>
          </Link>
          <StarOutline
            onClick={() => handleSetStarredBoard('boardId')}
            fontSize='medium'
            cursor='pointer'
            sx={{
              p: '2px',
              position: 'absolute',
              right: hoverBoardIndex === 0 ? '16px' : '-100%',
              bottom: 4,
              transition: '0.2s',
              '&:hover': { p: 0 },
              zIndex: 2
            }}
          />
        </Card>
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
          onClose={() => setOpenCreateNewBoard(false)}
          PaperProps={{
            component: 'form',
            onChange: (event: React.FormEvent<HTMLFormElement>) => {
              const formData = new FormData(event.currentTarget)
              const formJson = Object.fromEntries((formData as any).entries())
              const { title, type } = formJson
              setForm({ title: title.trim(), type })
            },
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              setOpenCreateNewBoard(false)
              // call api create new board
            }
          }}
        >
          {/* Dialog title */}
          <DialogTitle marginBottom={3} display='flex' justifyContent='space-between' alignItems='center'>
            Create board
            <Close
              fontSize='medium'
              onClick={() => setOpenCreateNewBoard(false)}
              cursor='pointer'
              sx={{ padding: 0.5, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' } }}
            />
          </DialogTitle>
          <DialogContent>
            {/* Enter board title */}
            <Box marginBottom={2}>
              <DialogContentText color='text.primary'>Board title (required)</DialogContentText>
              <TextField
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
            <Button type='submit' variant='contained' disabled={!form.title.trim()}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
