import { Container } from '@mui/material'

import Header from 'src/components/Header'
import BoardBar from './components/BoardBar'

export default function Board() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        paddingTop: 0.5
      }}
    >
      <Header />
      <BoardBar />
    </Container>
  )
}
