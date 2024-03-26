import { useLocation, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import SideBar from './components/SideBar'
import YourBoards from './components/YourBoards'
import StarredBoards from './components/StarredBoards'
import boardAPI from 'src/apis/board.api'

export default function User() {
  const params = useParams()
  const userId = params.userId as string
  const locationState = useLocation().state

  if (locationState?.from === 'delete-board') {
    console.log(locationState?.message)
  }

  const queryclient = useQueryClient()
  const boardsByOwnerId = useQuery({
    queryKey: ['boards', 'userId', userId],
    queryFn: () => boardAPI.getBoardsByOwnerId(userId),
    enabled: !!userId
  })

  const boardsData = boardsByOwnerId.data || []
  queryclient.setQueryData(['boards', 'userId', userId], boardsData)
  const starredBoards = boardsData
    .filter((board) => board.starred)
    .sort((a, b) => (a.starredAt as number) - (b.starredAt as number))

  return (
    <Container maxWidth='lg'>
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
