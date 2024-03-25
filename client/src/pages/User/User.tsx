import { useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import SideBar from './components/SideBar'
import YourBoards from './components/YourBoards'
import StarredBoards from './components/StarredBoards'
import { UserType } from 'src/types/user.type'
import boardAPI from 'src/apis/board.api'

export default function User() {
  const location = useLocation()
  const user = location.state as UserType

  const queryclient = useQueryClient()
  const boardsByOwnerId = useQuery({
    queryKey: ['boards', 'userId', user._id],
    queryFn: () => boardAPI.getBoardsByOwnerId(user._id),
    enabled: !!user._id
  })

  const boardsData = boardsByOwnerId.data || []
  queryclient.setQueryData(['boards', 'userId', user._id], boardsData)
  const starredBoards = boardsData
    .filter((board) => board.starred)
    .sort((a, b) => (a.starredAt as number) - (b.starredAt as number))

  return (
    <Container maxWidth='lg'>
      <Box marginTop={5} display='flex' gap={6} flexWrap={'nowrap'}>
        <SideBar />
        <Box display='flex' flexDirection='column' rowGap={6}>
          {starredBoards.length > 0 && <StarredBoards user={user} boards={starredBoards} />}
          <YourBoards user={user} boards={boardsData} />
        </Box>
      </Box>
    </Container>
  )
}
