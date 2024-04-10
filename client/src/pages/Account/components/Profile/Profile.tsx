import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Box, TextField, BoxProps, Divider, Typography } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { Helmet } from 'react-helmet-async'
import AuthContext from 'src/contexts/authContext'
import userAPI from 'src/apis/user.api'
import { UserType } from 'src/types/user.type'
import { setProfileToLocalStorage } from 'src/utils/auth'

type ProfileProps = {}

type ProfileFields = 'fullName' | 'username' | 'jobTitle'

type CustomBoxProps = { name?: string } & BoxProps
const BOX_PROPS: CustomBoxProps = {
  display: 'flex',
  flexDirection: 'column'
}

const TEXT_FIELD_SX_PROPS = {
  '& .MuiInputBase-input': {
    color: 'black',
    py: 1
  },
  mt: 1,
  '&:hover': {
    bgcolor: 'whitesmoke'
  }
}

const ICON_SX_PROPS = {
  p: 1,
  bgcolor: 'whitesmoke',
  color: 'gray',
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  '&:hover': {
    bgcolor: 'lightgray'
  }
}

export default function Profile({}: ProfileProps) {
  const { profile, setProfile } = useContext(AuthContext)
  const [profileState, setProfileState] = useState({
    fullName: profile?.fullName || '',
    username: profile?.username || '',
    jobTitle: profile?.jobTitle || ''
  })
  const [onFocusInput, setOnFocusInput] = useState<ProfileFields | undefined>(undefined)

  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userAPI.getProfile((profile as UserType)._id as string)
  })

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data, { fullName, username }) => {
      console.log(data)
      const message =
        fullName !== undefined
          ? "You've updated your full name"
          : username !== undefined
            ? "You've updated your username"
            : "You've updated your job title"
      toast.success(message)
      queryClient.setQueryData(['profile'], data)
      setProfile(data)
      setProfileToLocalStorage(data)
    },
    onError: (_error, { fullName, username, jobTitle }) => {
      setProfileState((prev) => {
        if (fullName) return { ...prev, fullName: (data as UserType).fullName as string }
        if (username) return { ...prev, username: (data as UserType).username as string }
        if (jobTitle) return { ...prev, jobTitle: (data as UserType).jobTitle as string }

        return prev
      })
    }
  })

  useEffect(() => {
    setProfileState({
      fullName: data?.fullName as string,
      username: data?.username as string,
      jobTitle: data?.jobTitle as string
    })
  }, [data])

  const INPUTS = [
    {
      label: 'Full name',
      name: 'fullName',
      value: profileState.fullName
    },
    {
      label: 'Username',
      name: 'username',
      value: profileState.username
    },
    {
      label: 'Job title',
      name: 'jobTitle',
      value: profileState.jobTitle
    }
  ]

  const handleCancelUpdate = (name: ProfileFields) => {
    setOnFocusInput(undefined)
    setProfileState({ ...profileState, [name]: (data as UserType)[name] || '' })
  }

  const handleUpdate = (name: ProfileFields) => {
    setOnFocusInput(undefined)
    if (profileState[name] === (data as UserType)[name]) return
    else {
      updateProfileMutation.mutate({
        _id: (data as UserType)._id,
        [name]: profileState[name]
      })
    }
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Helmet>
        <title>Profile | Trello</title>
        <meta name='description' content='Profile page' />
      </Helmet>
      <Box>
        <Typography variant='h5' color='black' mt={4} fontWeight='500'>
          Profile
        </Typography>
        <Box width='450px' p={'40px 20px'} boxShadow='0 0 10px 0 rgba(0, 0, 0, 0.2)' mt={6} gap={2} {...BOX_PROPS}>
          {INPUTS.map(({ label, name, value }) => (
            <Box key={name} {...BOX_PROPS}>
              <span style={{ color: '#6B778C', fontSize: '13px' }}>{label}</span>
              <TextField
                sx={{
                  ...TEXT_FIELD_SX_PROPS
                }}
                variant='outlined'
                value={value}
                placeholder={label}
                onChange={(e) => setProfileState({ ...profileState, [name]: e.target.value })}
                onClick={() => setOnFocusInput(name as ProfileFields)}
                onBlur={() => handleCancelUpdate(name as ProfileFields)}
              />
              {onFocusInput === name && (
                <Box maxHeight='1px' position='relative'>
                  <Box display='flex' gap={1} position='absolute' right={0} top={4}>
                    <Check fontSize='large' sx={{ ...ICON_SX_PROPS }} onMouseDown={() => handleUpdate(name)} />
                    <Close fontSize='large' sx={{ ...ICON_SX_PROPS }} onMouseDown={() => handleCancelUpdate(name)} />
                  </Box>
                </Box>
              )}
            </Box>
          ))}
          <Divider
            sx={{
              bgcolor: 'lightgray',
              mt: 2
            }}
          />
          {/* Email */}
          <Box {...BOX_PROPS}>
            <span style={{ color: '#6B778C', fontSize: '13px' }}>Email address</span>
            <span
              style={{
                height: '36px',
                fontSize: '14px',
                padding: '8px 14px',
                marginTop: '8px',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                cursor: 'not-allowed'
              }}
            >
              {data?.email}
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
