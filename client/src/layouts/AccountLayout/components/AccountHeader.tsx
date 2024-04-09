import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, SvgIcon } from '@mui/material'
import { ReactComponent as TrelloIcon } from 'src/assets/trello.svg'
import authContext from 'src/contexts/authContext'
import Profile from 'src/components/Header/components/Profile'
import { accountRoutes } from 'src/routes'

const pages = ['Profile', 'Security']

function AccountHeader() {
  const pathName = useLocation().pathname
  const { profile } = useContext(authContext)
  const userId = profile?._id as string
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          bgcolor: 'whitesmoke'
        }}
      >
        {/* Logo */}
        <Link to={`/u/${userId}/boards`} style={{ textDecoration: 'none', marginRight: '1rem' }}>
          <Box
            alignItems='center'
            gap={0.5}
            color={'primary.dark'}
            sx={{ cursor: 'pointer', display: { xs: 'none', md: 'flex' } }}
          >
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize='medium' />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Trello
            </Typography>
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'primary.dark' }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1
          }}
        >
          <Link to={`/u/${userId}/boards`} style={{ textDecoration: 'none' }}>
            <Box display='flex' alignItems='center' gap={0.5} color={'primary.dark'} sx={{ cursor: 'pointer' }}>
              <SvgIcon component={TrelloIcon} inheritViewBox fontSize='medium' />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                Trello
              </Typography>
            </Box>
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4, ml: 4 }}>
          {pages.map((page) => (
            <Link
              to={page === 'Profile' ? accountRoutes.profile : accountRoutes.security}
              key={page}
              style={{ textDecoration: 'none' }}
              onClick={handleCloseNavMenu}
            >
              <Box
                sx={{
                  my: 2,
                  display: 'block',
                  fontWeight: '500',
                  color: pathName.includes(page.toLowerCase()) ? '#1976d2' : 'black',
                  borderBottom: pathName.includes(page.toLowerCase()) ? '2px solid #1976d2' : 'none',
                  ':hover': {
                    borderBottom: '2px solid lightgray'
                  }
                }}
              >
                {page}
              </Box>
            </Link>
          ))}
        </Box>

        <Profile />
      </Toolbar>
    </AppBar>
  )
}
export default AccountHeader
