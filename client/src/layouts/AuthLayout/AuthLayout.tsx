import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        bgcolor: (theme) => theme.palette.cardBg
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Outlet />
      </Box>
    </Container>
  )
}
