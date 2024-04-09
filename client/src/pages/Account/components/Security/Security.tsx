import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography
} from '@mui/material'
import { changePasswordSchema, ChangePasswordSchemaType } from 'src/utils/schema'
import userAPI from 'src/apis/user.api'
import authContext from 'src/contexts/authContext'
import { UserType } from 'src/types/user.type'

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
  const { profile } = useContext(authContext)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setNewShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: ''
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: userAPI.changePassword,
    onSuccess: (data) => {
      reset()
      toast.success(data.message)
    },
    onError: (error) => {
      setError('password', {
        type: 'custom',
        message: error.message
      })
    }
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowNewPassword = () => setNewShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = (data: ChangePasswordSchemaType) => {
    changePasswordMutation.mutate({
      _id: (profile as UserType)._id,
      password: data.password,
      newPassword: data.newPassword
    })
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' mt={2}>
            {/* Current password */}
            <FormControl sx={{ mt: 1, width: '400px', minHeight: '81px' }} variant='outlined'>
              <label style={{ color: '#6B778C', fontSize: '13px' }}>Current password</label>
              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    error={!!errors.password}
                    autoComplete='off'
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
                )}
              />
              <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            {/* New password */}
            <FormControl sx={{ mt: 1, width: '400px', minHeight: '81px' }} variant='outlined'>
              <label style={{ color: '#6B778C', fontSize: '13px' }}>New password</label>
              <Controller
                control={control}
                name='newPassword'
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    error={!!errors.newPassword}
                    autoComplete='off'
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
                )}
              />
              <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>
                {errors.newPassword?.message}
              </FormHelperText>
            </FormControl>
            <Button type='submit' variant='contained' size='small' color='info' sx={{ mt: 3, maxWidth: 'fit-content' }}>
              Save changes
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
