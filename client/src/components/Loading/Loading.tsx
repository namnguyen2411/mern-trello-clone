import { Box, CircularProgress, Typography } from '@mui/material'

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <CircularProgress size={40} color='primary' />
      <Typography
        sx={{
          ml: 2,
          opacity: 1,
          '@keyframes fade': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.2 },
            '100%': { opacity: 1 }
          },
          animation: 'fade 2s linear infinite'
        }}
        className='loading'
        variant='h6'
        component='div'
        color='primary.main'
      >
        Loading...
      </Typography>
    </Box>
  )
}
