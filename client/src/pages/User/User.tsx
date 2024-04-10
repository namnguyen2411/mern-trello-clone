import { useContext } from 'react'
import { Box, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import SideBar from './components/SideBar'
import YourBoards from './components/YourBoards'
import StarredBoards from './components/StarredBoards'
import useQueryBoards from 'src/hooks/useQueryBoards'
import authContext from 'src/contexts/authContext'
import { UserType } from 'src/types/user.type'

export default function User() {
  const { isAuthenticated, profile } = useContext(authContext)
  const userId = isAuthenticated ? (profile as UserType)._id : ''

  const boardsData = useQueryBoards(userId)
  const starredBoards = boardsData
    .filter((board) => board.starred)
    .sort((a, b) => (a.starredAt as number) - (b.starredAt as number))

  return (
    <Container maxWidth='lg'>
      <Helmet>
        <title>Boards | Trello</title>
        <meta name='description' content='Boards page' />
      </Helmet>
      <Box marginTop={5} display='flex' gap={6} flexWrap={'nowrap'}>
        <SideBar />
        <Box display='flex' flexDirection='column' rowGap={6}>
          {starredBoards.length > 0 && <StarredBoards userId={userId} boards={starredBoards} />}
          <YourBoards userId={userId} boards={boardsData} />
        </Box>
      </Box>
    </Container>
  )
}
