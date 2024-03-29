import { useState, MouseEvent } from 'react'
import { Logout, AccountCircle } from '@mui/icons-material'
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import { Link } from 'react-router-dom'

type ProfileProps = {
  userId: string
}

export default function Profile({ userId }: ProfileProps) {
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
        <Link to={`u/${userId}/profile`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Divider />
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
