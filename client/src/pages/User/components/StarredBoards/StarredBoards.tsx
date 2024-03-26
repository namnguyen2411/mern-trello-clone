import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { StarOutlineRounded, StarRounded } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'
import { UserType } from 'src/types/user.type'
import useUnsetStarredBoard from 'src/hooks/useUnsetStarredBoard'

type StarredBoardsProps = {
  user: UserType
  boards: BoardType[] | []
}

export default function YourBoards({ user, boards }: StarredBoardsProps) {
  const [hoverBoardStar, setHoverBoardStar] = useState('')

  const { handleUnsetStarredBoard } = useUnsetStarredBoard(user)

  return (
    <Box>
      {/* Title */}
      <Typography variant='h6' display='flex' alignItems='center' gap={1}>
        <StarOutlineRounded fontSize='large' />
        Starred boards
      </Typography>
      {/* Starred boards */}
      <Box display='flex' rowGap={3} columnGap={2} alignItems='center' flexWrap='wrap' mt={2}>
        {boards.map(({ _id, title, slug }) => (
          <Card
            key={_id}
            sx={{
              width: 190,
              height: 98,
              borderRadius: 1,
              position: 'relative',
              border: '1px solid transparent',
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
              '&:hover': { borderColor: 'primary.dark' },
              '& .MuiSvgIcon-root': {
                fontSize: '24px',
                ':hover': { fontSize: '26px' }
              }
            }}
          >
            <Link to={`/b/${_id}/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography component='div' fontWeight='bold'>
                  {title}
                </Typography>
              </CardContent>
            </Link>
            {/* Display STAR icon */}
            {hoverBoardStar !== _id && (
              <StarRounded
                onClick={() => handleUnsetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
                fontSize='medium'
                cursor='pointer'
                sx={{
                  position: 'absolute',
                  right: '16px',
                  bottom: 4,
                  transition: '0.2s',
                  color: (theme) => theme.trello.starIconColor
                }}
              />
            )}
            {/* Display STAR OUTLINE icon */}
            {hoverBoardStar === _id && (
              <StarOutlineRounded
                onClick={() => handleUnsetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
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
            )}
          </Card>
        ))}
      </Box>
    </Box>
  )
}
