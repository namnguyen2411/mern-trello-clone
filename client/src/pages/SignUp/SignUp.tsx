import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisibilityOff, Visibility, Email, Lock } from '@mui/icons-material'
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
import { signUpSchemaRefined, SignUpSchemaType } from 'src/utils/schema'
import authAPI from 'src/apis/auth.api'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const signUpMutation = useMutation({
    mutationFn: authAPI.signup,
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
  } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(signUpSchemaRefined)
  })

  const onSubmit = (data: SignUpSchemaType) => {
    console.log(data)
    signUpMutation.mutate(data)
  }

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setShowPassword(() => {
      return {
        ...showPassword,
        [field]: !showPassword[field]
      }
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
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
                  type={showPassword.password ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => handleClickShowPassword('password')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>{errors.password?.message}</FormHelperText>
          </FormControl>
        </Box>

        {/* Confirm Password */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Lock fontSize='medium' sx={{ color: 'action.active', mr: 1 }} />
          <FormControl variant='standard' sx={{ minHeight: '71px' }} fullWidth>
            <InputLabel htmlFor='adornment-confirm-password' color='info' error={!!errors.confirmPassword}>
              Confirm Password
            </InputLabel>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.confirmPassword}
                  id='adornment-confirm-password'
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => handleClickShowPassword('confirmPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>
              {errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
        </Box>

        <Button
          type='submit'
          variant='contained'
          color='success'
          size='medium'
          sx={{ fontWeight: 'bold', fontSize: '1rem' }}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  )
}
