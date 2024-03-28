import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogContentText,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  DialogActions,
  Button
} from '@mui/material'
import { Close, Public, Lock } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'

export type CreateNewBoardFormType = {
  title: string
  type: BoardType['type']
}

type CreateNewBoardDialogProps = {
  openCreateNewBoard: boolean
  handleCloseCreateNewBoard: () => void
  createNewBoardForm: CreateNewBoardFormType
  setCreateNewBoardForm: React.Dispatch<React.SetStateAction<CreateNewBoardFormType>>
  handleSubmitCreateNewForm: () => void
}

export default function CreateNewBoardDialog({
  openCreateNewBoard,
  handleCloseCreateNewBoard,
  createNewBoardForm,
  setCreateNewBoardForm,
  handleSubmitCreateNewForm
}: CreateNewBoardDialogProps) {
  return (
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
  )
}
