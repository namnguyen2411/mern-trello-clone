import { useState, MouseEvent } from 'react'
import { ExpandMore, ContentCut, Cloud } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'

export default function Starred() {
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
      <Button
        id='button-starred'
        aria-controls={open ? 'menu-starred' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMore />}
        sx={{
          '& .MuiButton-endIcon': {
            ml: '2px'
          }
        }}
      >
        Starred
      </Button>
      <Menu
        id='menu-starred'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'button-starred'
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize='small' />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘X
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize='small' />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
