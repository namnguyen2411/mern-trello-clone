import { Container, Divider, useColorScheme } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import { ModeType } from 'src/types/mode.type'

export default function Board() {
  const { setMode } = useColorScheme()

  useEffect(() => {
    setMode(localStorage.getItem('prevMode') as ModeType)
  }, [])

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
