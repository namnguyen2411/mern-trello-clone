import { useState, MouseEvent } from 'react'
import { Public, Lock } from '@mui/icons-material'
import { StackProps, Stack, Chip, Tooltip, Box, Menu, MenuItem, ListItemIcon, Button } from '@mui/material'

// type BoardBarProps = {
//   board: BoardType | null
// }

type Props = { name?: string } & StackProps
const STACK_SX_PROPS: Props = {
  direction: 'row',
  alignItems: 'center'
}

const CHIP_SX_PROPS = {
  color: 'primary.main',
  bgcolor: 'transparent',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.100'
  }
}

export default function BoardBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [boardType, setboardType] = useState<'public' | 'private'>('public')
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleBoardType = (type: 'public' | 'private') => {
    setboardType(type)
    setAnchorEl(null)
  }

  return (
    <Stack
      {...STACK_SX_PROPS}
      gap={3}
      px={2}
      height={(theme) => theme.trello.boardBarHeight}
      bgcolor={(theme) => (theme.palette.mode === 'light' ? '#eee' : '#333')}
      fontSize={16}
      sx={{
        overflowX: 'auto'
      }}
    >
      {/* Board title */}
      <Tooltip title={'Change title'}>
        <Chip sx={{ ...CHIP_SX_PROPS, fontWeight: 'bold', fontSize: '1rem' }} label={'MERN Trello Clone'} clickable />
      </Tooltip>
      {/* Board type */}
      <Box>
        <Tooltip title='Change type'>
          <Button
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'board-type' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            {
              <Chip
                sx={{ ...CHIP_SX_PROPS, textTransform: 'capitalize' }}
                icon={boardType === 'public' ? <Public fontSize='small' /> : <Lock fontSize='small' />}
                label={boardType}
              />
            }
          </Button>
        </Tooltip>
        <Menu
          id='board-type'
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'button-profile'
          }}
          sx={{
            marginTop: 1.75
          }}
        >
          <MenuItem onClick={() => handleBoardType('public')}>
            <ListItemIcon>
              <Public fontSize='medium' />
            </ListItemIcon>
            Public
          </MenuItem>
          <MenuItem onClick={() => handleBoardType('private')}>
            <ListItemIcon>
              <Lock fontSize='medium' />
            </ListItemIcon>
            Private
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  )
}
