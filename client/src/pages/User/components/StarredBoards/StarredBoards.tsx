import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { StarOutline, Star } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'

export default function YourBoards() {
  const [hoverBoardIndex, setHoverBoardIndex] = useState(-1)

  const handleUnsetStarredBoard = (id: BoardType['_id']) => {
    console.log(id)
    // call api unset starred board
  }

  return (
    <Box>
      {/* Title */}
      <Typography variant='h6' display='flex' alignItems='center' gap={1}>
        <StarOutline fontSize='medium' />
        Starred boards
      </Typography>
      {/* Starred boards */}
      <Box display='flex' rowGap={3} columnGap={2} alignItems='center' flexWrap='wrap' mt={2}>
        <Card
          onMouseEnter={() => setHoverBoardIndex(0)}
          onMouseLeave={() => setHoverBoardIndex(-1)}
          sx={{
            width: 190,
            height: 98,
            borderRadius: 1,
            position: 'relative',
            border: '1px solid transparent',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
            '&:hover': { borderColor: 'primary.dark' }
          }}
        >
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography component='div' fontWeight='bold'>
                Goals and Tasks - Personal Life
              </Typography>
            </CardContent>
          </Link>
          <Star
            onClick={() => handleUnsetStarredBoard('boardId')}
            fontSize='medium'
            cursor='pointer'
            sx={{
              p: '2px',
              position: 'absolute',
              right: '16px',
              bottom: 4,
              transition: '0.2s',
              color: (theme) => theme.trello.starIconColor,
              '&:hover': { p: 0 }
            }}
          />
        </Card>
      </Box>
    </Box>
  )
}
