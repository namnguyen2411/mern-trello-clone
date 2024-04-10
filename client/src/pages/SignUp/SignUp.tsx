import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { signUpSchemaRefined, SignUpSchemaType } from 'src/utils/schema'
import authAPI from 'src/apis/auth.api'
import { publicRoutes } from 'src/routes'
import authContext from 'src/contexts/authContext'
import EmailField from 'src/components/EmailField'
import PasswordField from 'src/components/PasswordField'

export default function SignUp() {
  const { setIsAuthenticated, setProfile } = useContext(authContext)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const signUpMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (data) => {
      reset()
      setIsAuthenticated(true)
      setProfile(data)
      navigate(`/u/${data._id}/boards`)
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
          width: '460px',
          '& .MuiSvgIcon-root': {
            color: 'gray'
          },
          '& .MuiInputLabel-root': {
            color: 'gray'
          },
          '& .MuiInputBase-root': {
            borderBottom: '1px solid lightgray',
            color: 'black',
            '&:focus-within': {
              border: 'unset'
            }
          }
        }}
      >
        {/* Title */}
        <Typography variant='h4' textAlign='center' marginBottom={2} color='black'>
          Create an account
        </Typography>
        {/* Email */}
        <EmailField register={register} name='email' errors={errors} />
        {/* Password */}
        <PasswordField
          control={control}
          name='password'
          errors={errors}
          showPassword={showPassword.password}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
        {/* Confirm Password */}
        <PasswordField
          label='Confirm Password'
          id='adornment-confirm-password'
          control={control}
          name='confirmPassword'
          errors={errors}
          showPassword={showPassword.confirmPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
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
          <Typography fontWeight='500' textAlign='center' color='primary.dark'>
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
