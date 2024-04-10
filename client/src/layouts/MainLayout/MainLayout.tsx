import { Container, Divider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

export default function MainLayout() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        paddingTop: (theme) => theme.trello.MAIN_LAYOUT_PADDING_TOP
      }}
    >
      <Header />
      <Divider />
      <Outlet />
    </Container>
  )
}
