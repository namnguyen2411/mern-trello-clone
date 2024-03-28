import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { StarRounded, StarOutlineRounded } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'
import useSetStarredBoard from 'src/hooks/useSetStarredBoard'
import useUnsetStarredBoard from 'src/hooks/useUnsetStarredBoard'
import useCreateNewBoard from 'src/hooks/useCreateNewBoard'
import CreateNewBoardDialog from 'src/components/CreateNewBoardDialog'
import { CreateNewBoardFormType } from 'src/components/CreateNewBoardDialog/CreateNewBoardDialog'

type YourBoardsProps = {
  userId: string
  boards: BoardType[]
}

const newBoardFormInitial: CreateNewBoardFormType = {
  title: '',
  type: 'public'
}

export default function YourBoards({ userId, boards }: YourBoardsProps) {
  const [openCreateNewBoard, setOpenCreateNewBoard] = useState(false)
  const [createNewBoardForm, setCreateNewBoardForm] = useState<CreateNewBoardFormType>(newBoardFormInitial)
  const [hoverBoardId, setHoverBoardId] = useState('')
  const [hoverBoardStar, setHoverBoardStar] = useState('')

  const { handleSetStarredBoard } = useSetStarredBoard(userId)
  const { handleUnsetStarredBoard } = useUnsetStarredBoard(userId)

  const handleCloseCreateNewBoard = () => {
    setOpenCreateNewBoard(false)
    setCreateNewBoardForm(newBoardFormInitial)
  }

  const { handleSubmitCreateNewForm } = useCreateNewBoard(userId, createNewBoardForm, handleCloseCreateNewBoard)

  return (
    <Box>
      {/* Title */}
      <Typography variant='h6'>Your boards</Typography>
      {/* Your boards */}
      <Box display='flex' rowGap={3} columnGap={2} alignItems='center' flexWrap='wrap' mt={2}>
        {boards.map(({ _id, title, slug, starred }) => (
          <Card
            key={_id}
            onMouseEnter={() => setHoverBoardId(_id)}
            onMouseLeave={() => setHoverBoardId('')}
            sx={{
              width: 190,
              height: 98,
              borderRadius: 1,
              position: 'relative',
              border: '1px solid transparent',
              '&:hover': { borderColor: 'primary.dark' },
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
              '& .MuiSvgIcon-root': {
                position: 'absolute',
                fontSize: '24px',
                bottom: 4,
                transition: '0.2s',
                cursor: 'pointer',
                ':hover': { fontSize: '26px' }
              }
            }}
          >
            <Link to={`/b/${_id}/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography
                  component='div'
                  fontWeight='bold'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {title}
                </Typography>
              </CardContent>
            </Link>
            {/* Starred and not hovered */}
            {starred && hoverBoardStar !== _id && (
              <StarRounded
                onClick={() => handleSetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
                fontSize='medium'
                sx={{
                  right: '16px',
                  color: (theme) => theme.trello.starIconColor
                }}
              />
            )}
            {/* Starred and hovered */}
            {starred && hoverBoardStar === _id && (
              <StarOutlineRounded
                onClick={() => handleUnsetStarredBoard(_id)}
                onMouseEnter={() => setHoverBoardStar(_id)}
                onMouseLeave={() => setHoverBoardStar('')}
                fontSize='medium'
                sx={{
                  right: '16px',
                  color: (theme) => theme.trello.starIconColor
                }}
              />
            )}
            {/* Not starred */}
            {!starred && (
              <StarOutlineRounded
                onClick={() => handleSetStarredBoard(_id)}
                fontSize='medium'
                sx={{
                  right: hoverBoardId === _id ? '16px' : '-100%'
                }}
              />
            )}
          </Card>
        ))}
        {/* Create new board card */}
        <Card
          onClick={() => setOpenCreateNewBoard(true)}
          sx={{
            width: 190,
            height: 98,
            borderRadius: 1,
            cursor: 'pointer',
            border: '1px solid transparent',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.cardBg,
            '&:hover': { borderColor: 'primary.dark' }
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: '14px'
            }}
          >
            Create new board
          </CardContent>
        </Card>
        {/* Create new board dialog */}
        <CreateNewBoardDialog
          openCreateNewBoard={openCreateNewBoard}
          handleCloseCreateNewBoard={handleCloseCreateNewBoard}
          createNewBoardForm={createNewBoardForm}
          setCreateNewBoardForm={setCreateNewBoardForm}
          handleSubmitCreateNewForm={handleSubmitCreateNewForm}
        />
      </Box>
    </Box>
  )
}
