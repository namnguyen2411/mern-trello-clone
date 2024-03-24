import { useLocation } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import SideBar from './components/SideBar'
import YourBoards from './components/YourBoards'
import StarredBoards from './components/StarredBoards'

export default function User() {
  const location = useLocation()
  const { _id, email, username } = location.state

  return (
    <Container maxWidth='lg'>
      <Box marginTop={5} display='flex' gap={6} flexWrap={'nowrap'}>
        <SideBar />
        <Box display='flex' flexDirection='column' rowGap={6}>
          <StarredBoards />
          <YourBoards />
        </Box>
      </Box>
    </Container>
  )
}
