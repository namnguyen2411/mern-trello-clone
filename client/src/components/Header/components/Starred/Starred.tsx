import { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { ExpandMore, StarRounded } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { BoardType } from 'src/types/board.type'
import starred from 'src/assets/starred.svg'

type StarredProps = {
  starredBoards: BoardType[]
}

export default function Starred({ starredBoards }: StarredProps) {
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
        sx={{
          mt: 1
        }}
      >
        {starredBoards.length > 0 &&
          starredBoards.map((board) => (
            <Link
              to={`b/${board._id}/${board.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              key={board._id}
            >
              <MenuItem onClick={handleClose} sx={{ alignItems: 'flex-start', gap: 1.5, pr: 0, py: 1 }}>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      maxWidth: '196px',
                      overflow: 'clip',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'horizontal'
                    }
                  }}
                >
                  {board.title}
                </ListItemText>
                <ListItemIcon>
                  <StarRounded
                    fontSize='small'
                    sx={{
                      color: (theme) => theme.trello.starIconColor
                    }}
                  />
                </ListItemIcon>
              </MenuItem>
            </Link>
          ))}

        {starredBoards.length === 0 && (
          <Box width='300px' p='12px' bgcolor='primary.100' borderRadius={1}>
            <Box>
              <img src={starred} />
            </Box>
            <Typography color='text.secondary' textAlign='center'>
              Star important boards to access them quickly and easily.
            </Typography>
          </Box>
        )}
      </Menu>
    </Box>
  )
}
