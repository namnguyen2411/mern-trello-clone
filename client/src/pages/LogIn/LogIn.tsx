import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { logInSchema, LogInSchemaType } from 'src/utils/schema'
import authAPI from 'src/apis/auth.api'
import { publicRoutes } from 'src/routes'
import authContext from 'src/contexts/authContext'
import EmailField from 'src/components/EmailField'
import PasswordField from 'src/components/PasswordField'

export default function SignIn() {
  const { setIsAuthenticated, setProfile } = useContext(authContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const logInMutation = useMutation({
    mutationFn: authAPI.login,
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
  } = useForm<LogInSchemaType>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(logInSchema)
  })

  const onSubmit = (data: LogInSchemaType) => {
    logInMutation.mutate(data)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>Login | Trello</title>
        <meta name='description' content='Login page' />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
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
          Log In
        </Typography>
        {/* Email */}
        <EmailField register={register} name='email' errors={errors} />
        {/* Password */}
        <PasswordField
          control={control}
          name='password'
          errors={errors}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
        {/* Log In Button */}
        <Button
          type='submit'
          variant='contained'
          color='success'
          size='medium'
          disabled={logInMutation.isPending}
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&:disabled': {
              color: 'black',
              bgcolor: (theme) => theme.palette.success.main
            }
          }}
        >
          {logInMutation.isPending && <CircularProgress color='inherit' size={16} />}
          Log In
        </Button>
        {/* Link to Sign Up */}
        <Box marginTop={1}>
          <Typography fontWeight='500' textAlign='center' color='primary.dark'>
            New to Trello?
            <Link to={publicRoutes.signup} style={{ color: 'inherit', marginLeft: '5px' }}>
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  )
}
