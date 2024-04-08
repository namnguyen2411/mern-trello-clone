import { useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'

const FORMCONTROL_SX_PROPS = {
  border: '1px solid lightgray',
  minWidth: '360px',
  '& .MuiInputBase-input': {
    color: 'black',
    py: 1
  },
  ':hover': {
    bgcolor: 'whitesmoke'
  },
  ':focus-within': {
    borderColor: 'transparent',
    ':hover': {
      bgcolor: 'transparent'
    }
  }
}

export default function Security() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setNewShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowNewPassword = () => setNewShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Box width={'584px'}>
        <Typography variant='h5' color='black' mt={4} fontWeight='500'>
          Security
        </Typography>
        <Typography variant='body2' color='black' mt={5} fontWeight='500' fontSize={'1rem'}>
          Change your password
        </Typography>
        <Box display='flex' flexDirection='column' mt={2}>
          {/* Current password */}
          <FormControl sx={{ mt: 1, width: '25ch' }} variant='outlined'>
            <label style={{ color: '#6B778C', fontSize: '13px' }}>Current password</label>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter current password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    sx={{
                      color: 'grey'
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ ...FORMCONTROL_SX_PROPS }}
            />
          </FormControl>
          {/* New password */}
          <FormControl sx={{ mt: 1, width: '25ch' }} variant='outlined'>
            <label style={{ color: '#6B778C', fontSize: '13px' }}>New password</label>
            <OutlinedInput
              type={showNewPassword ? 'text' : 'password'}
              placeholder='Enter new password'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    sx={{
                      color: 'grey'
                    }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ ...FORMCONTROL_SX_PROPS }}
            />
          </FormControl>
          <Button variant='contained' size='small' color='info' sx={{ mt: 3, maxWidth: 'fit-content' }}>
            Save changes
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
