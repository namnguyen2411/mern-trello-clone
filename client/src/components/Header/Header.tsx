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

type Props = { name?: string } & StackProps
const STACK_SX_PROPS: Props = {
  direction: 'row',
  alignItems: 'center'
}

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <Stack
      {...STACK_SX_PROPS}
      justifyContent={'space-between'}
      gap={4}
      px={2}
      height={(theme) => theme.trello.headerHeight}
      sx={{
        overflowX: 'auto'
      }}
    >
      {/* Left side */}
      <Stack {...STACK_SX_PROPS} gap={2}>
        {/* Logo */}
        <Stack {...STACK_SX_PROPS} gap={0.5} color={'primary.main'} sx={{ cursor: 'pointer' }}>
          <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' />
          <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Trello
          </Typography>
        </Stack>
        {/* Starred dropdown */}
        <Starred />
        {/* Create button */}
        <Button variant='contained' size='small' startIcon={<LibraryAdd />}>
          Create
        </Button>
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
