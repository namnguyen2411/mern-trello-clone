import { useState } from 'react'
import { Box, TextField, BoxProps, Divider, Typography } from '@mui/material'
import { Check, Close } from '@mui/icons-material'

type ProfileProps = {}

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
  const INPUTS = [
    {
      label: 'Full name',
      name: 'fullName',
      value: 'John Doe'
    },
    {
      label: 'Display name',
      name: 'displayName',
      value: 'John'
    },
    {
      label: 'Job title',
      name: 'jobTitle',
      value: 'Software Engineer'
    }
  ]

  const [onFocusInput, setOnFocusInput] = useState<'fullName' | 'displayName' | 'jobTitle' | undefined>(undefined)

  return (
    <Box display='flex' justifyContent='center'>
      <Box>
        <Typography variant='h5' color='black' mt={4} fontWeight='500'>
          Profile
        </Typography>
        <Box width='450px' p={'40px 20px'} boxShadow='0 0 10px 0 rgba(0, 0, 0, 0.2)' mt={6} gap={2} {...BOX_PROPS}>
          {INPUTS.map(({ label, name, value }) => (
            <Box key={name} {...BOX_PROPS}>
              <span style={{ color: '#6B778C', fontSize: '13px' }}>{label}</span>
              <TextField
                sx={{ ...TEXT_FIELD_SX_PROPS }}
                variant='outlined'
                value={value}
                onClick={() => setOnFocusInput(name as 'fullName' | 'displayName')}
                onBlur={() => setOnFocusInput(undefined)}
              />
              {onFocusInput === name && (
                <Box maxHeight='1px' position='relative'>
                  <Box display='flex' gap={1} position='absolute' right={0} top={4}>
                    <Check fontSize='large' sx={{ ...ICON_SX_PROPS }} />
                    <Close fontSize='large' sx={{ ...ICON_SX_PROPS }} />
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
              johndoe@mail.com
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
