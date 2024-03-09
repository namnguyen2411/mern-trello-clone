import { useState, MouseEvent } from 'react'
import { SwitchAccount, Logout, AccountCircle } from '@mui/icons-material'
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title='Account'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ padding: 0 }}
          aria-controls={open ? 'menu-profile' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30
            }}
            alt='avatar'
            src='https://mui.com/static/images/avatar/1.jpg'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id='menu-profile'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button-profile'
        }}
        sx={{
          marginTop: 1.75
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SwitchAccount fontSize='medium' />
          </ListItemIcon>
          Switch accounts
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize='medium' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
