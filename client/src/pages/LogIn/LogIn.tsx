import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from '@mui/material'
import { Email, Lock } from '@mui/icons-material'
import { logInSchema, LogInSchemaType } from 'src/utils/schema'
import authAPI from 'src/apis/auth.api'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const logInMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      console.log(data)
      reset()
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset
  } = useForm<LogInSchemaType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(logInSchema)
  })

  const onSubmit = (data: LogInSchemaType) => {
    console.log(data)
    logInMutation.mutate(data)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 10px',
          padding: '24px 32px',
          width: '400px'
        }}
      >
        {/* Email */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Email fontSize='medium' sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            label='Email'
            variant='standard'
            color='info'
            autoComplete='off'
            fullWidth
            autoFocus
            sx={{
              minHeight: '71px',
              '& .MuiFormHelperText-root': {
                fontWeight: '500'
              }
            }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Lock fontSize='medium' sx={{ color: 'action.active', mr: 1 }} />
          <FormControl
            variant='standard'
            sx={{
              minHeight: '71px'
            }}
            fullWidth
          >
            <InputLabel htmlFor='adornment-password' color='info' error={!!errors.password}>
              Password
            </InputLabel>
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.password}
                  autoComplete='off'
                  id='adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>{errors.password?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Button
          type='submit'
          variant='contained'
          color='success'
          size='medium'
          sx={{ fontWeight: 'bold', fontSize: '1rem', mt: 1 }}
        >
          Log In
        </Button>
      </Box>
    </form>
  )
}
