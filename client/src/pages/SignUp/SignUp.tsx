import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
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
  TextField,
  CircularProgress,
  Typography
} from '@mui/material'
import { signUpSchemaRefined, SignUpSchemaType } from 'src/utils/schema'
import authAPI from 'src/apis/auth.api'
import { UserType } from 'src/types/user.type'
import { publicRoutes } from 'src/routes'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })
  const navigate = useNavigate()
  const signUpMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (data: UserType) => {
      reset()
      navigate(`/u/${data._id}/boards`, {
        state: data
      })
    },
    onError: (error) => {
      setError('email', {
        type: 'custom',
        message: error.message
      })
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
    signUpMutation.mutate({ email: data.email, password: data.password })
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
          width: '460px'
        }}
      >
        {/* Title */}
        <Typography variant='h4' textAlign='center' marginBottom={2}>
          Create an account
        </Typography>
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
                  autoComplete='off'
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
        {/* Sign Up Button */}
        <Button
          type='submit'
          variant='contained'
          color='success'
          size='medium'
          disabled={signUpMutation.isPending}
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          {signUpMutation.isPending && <CircularProgress color='inherit' size={16} />}
          Sign Up
        </Button>
        {/* Link to Login */}
        <Box>
          <Typography fontWeight='500' textAlign='center' color='primary.main'>
            Already have an account?
            <Link to={publicRoutes.login} style={{ color: 'inherit', marginLeft: '5px' }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  )
}
