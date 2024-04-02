import { useState, MouseEvent, useContext } from 'react'
import { Logout, AccountCircle } from '@mui/icons-material'
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, useColorScheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import authContext from 'src/contexts/authContext'

type ProfileProps = {
  userId: string
}

export default function Profile({ userId }: ProfileProps) {
  const { mode } = useColorScheme()
  const { reset, profile } = useContext(authContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      setAnchorEl(null)
      reset()
      localStorage.setItem('prevMode', mode as string)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title={profile?.username ? `${profile.username} (${profile.email})` : profile?.email}>
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
              <AccountCircle fontSize='medium' />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='medium' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
