import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import notFound from 'src/assets/404.jpg'

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'white'
      }}
    >
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant='h1' color='black'>
              Not Found
            </Typography>
            <Typography variant='h6' color='black'>
              The page you're looking for doesn't exist.
            </Typography>
            <Button variant='contained' sx={{ mt: 2 }} onClick={() => (window.location.href = '/')}>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={5}>
            <img src={notFound} alt='404 not found' width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
