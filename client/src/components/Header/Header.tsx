import { useState } from 'react'
import { LibraryAdd, Search, Close, NotificationsNone, HelpOutline } from '@mui/icons-material'
import {
  Badge,
  Button,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  StackProps
} from '@mui/material'

import { ReactComponent as TrelloIcon } from 'src/assets/trello.svg'
import ModeSelect from 'src/components/Header/components/ModeSelect'
import Starred from './components/Starred'
import Profile from './components/Profile'
import useCreateNewBoard from 'src/hooks/useCreateNewBoard'
import CreateNewBoardDialog from '../CreateNewBoardDialog'
import { CreateNewBoardFormType } from '../CreateNewBoardDialog/CreateNewBoardDialog'
import { UserType } from 'src/types/user.type'
import { Link } from 'react-router-dom'
import useQueryBoards from 'src/hooks/useQueryBoards'

type Props = { name?: string } & StackProps
const STACK_SX_PROPS: Props = {
  direction: 'row',
  alignItems: 'center'
}

const newBoardFormInitial: CreateNewBoardFormType = {
  title: '',
  type: 'public'
}

export default function Header() {
  const user: UserType = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile') as string) : null

  const [searchValue, setSearchValue] = useState('')
  const [openCreateNewBoard, setOpenCreateNewBoard] = useState(false)
  const [createNewBoardForm, setCreateNewBoardForm] = useState<CreateNewBoardFormType>(newBoardFormInitial)

  const boardsData = useQueryBoards(user._id)
  const starredBoards = boardsData
    .filter((board) => board.starred)
    .sort((a, b) => (a.starredAt as number) - (b.starredAt as number))

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleCloseCreateNewBoard = () => {
    setOpenCreateNewBoard(false)
    setCreateNewBoardForm(newBoardFormInitial)
  }

  const { handleSubmitCreateNewForm } = useCreateNewBoard(user._id, createNewBoardForm, handleCloseCreateNewBoard)

  return (
    <Stack
      {...STACK_SX_PROPS}
      justifyContent={'space-between'}
      gap={4}
      px={2}
      height={(theme) => theme.trello.headerHeight}
      marginTop='-1px'
      sx={{
        overflowX: 'auto'
      }}
    >
      {/* Left side */}
      <Stack {...STACK_SX_PROPS} gap={2}>
        {/* Logo */}
        <Link to={`/u/${user._id}/boards`} style={{ textDecoration: 'none' }}>
          <Stack {...STACK_SX_PROPS} gap={0.5} color={'primary.main'} sx={{ cursor: 'pointer' }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' />
            <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Trello
            </Typography>
          </Stack>
        </Link>
        {/* Starred dropdown */}
        <Starred starredBoards={starredBoards} />
        {/* Create button */}
        <Button variant='contained' size='small' startIcon={<LibraryAdd />} onClick={() => setOpenCreateNewBoard(true)}>
          Create
        </Button>
        {/* Create new board dialog */}
        <CreateNewBoardDialog
          openCreateNewBoard={openCreateNewBoard}
          handleCloseCreateNewBoard={handleCloseCreateNewBoard}
          createNewBoardForm={createNewBoardForm}
          setCreateNewBoardForm={setCreateNewBoardForm}
          handleSubmitCreateNewForm={handleSubmitCreateNewForm}
        />
      </Stack>

      {/* Right side */}
      <Stack {...STACK_SX_PROPS} gap={2}>
        {/* Search */}
        <TextField
          size='small'
          label='Search'
          type='text'
          value={searchValue}
          onChange={handleSearchChange}
          sx={{
            minWidth: '260px'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search color='primary' fontSize='small' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end' sx={{ marginRight: -1 }}>
                {searchValue !== '' && <Close fontSize='small' cursor={'pointer'} onClick={() => setSearchValue('')} />}
              </InputAdornment>
            )
          }}
        />
        {/* Mode Select */}
        <ModeSelect />
        {/* Notifications */}
        <Tooltip title='Notifications'>
          <Badge color='error' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNone color='primary' />
          </Badge>
        </Tooltip>
        {/* Help */}
        <Tooltip title='Help' color='text.primary'>
          <HelpOutline color='primary' sx={{ cursor: 'pointer' }} />
        </Tooltip>
        {/* Profile */}
        <Profile />
      </Stack>
    </Stack>
  )
}
