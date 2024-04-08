import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AccountHeader from './components'

export default function AccountLayout() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        bgcolor: 'white'
      }}
    >
      <AccountHeader />
      <Outlet />
    </Container>
  )
}
