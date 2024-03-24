import { useState } from 'react'
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 250,
        '& .MuiListSubheader-root': {
          lineHeight: 'unset',
          py: 0.5,
          bgcolor: 'transparent'
        },
        '& .MuiListItemIcon-root': {
          minWidth: '40px',
          paddingLeft: 1.5
        },
        '& .MuiButtonBase-root': {
          py: '2px',
          mt: '2px',
          borderRadius: 2,
          color: selectedIndex === 0 ? '#0c66e4' : 'text.primary',
          bgcolor: selectedIndex === 0 ? 'rgba(66, 165, 245, 0.2)' : 'transparent',
          '&:hover': {
            bgcolor: selectedIndex === 0 ? 'rgba(66, 165, 245, 0.2)' : 'gray'
          }
        }
      }}
      component='nav'
      subheader={<ListSubheader component='div'>My Workspace</ListSubheader>}
    >
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
        <ListItemIcon>
          <svg
            width='20'
            height='20'
            role='presentation'
            focusable='false'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z'
              fill='currentColor'
            />
          </svg>
        </ListItemIcon>
        <ListItemText primary='Boards' />
      </ListItemButton>
    </List>
  )
}
