import { Email } from '@mui/icons-material'
import { Box, TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form'

type EmailFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: keyof T
  errors: FieldErrors
}

export default function EmailField<T extends FieldValues>({ register, name, errors }: EmailFieldProps<T>) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Email fontSize='medium' sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        {...register(name as Path<T>)}
        error={!!errors.email}
        helperText={errors.email?.message as string}
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
  )
}
