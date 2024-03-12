import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

export default function Board() {
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
      <Outlet />
    </Container>
  )
}
