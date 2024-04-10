import { VisibilityOff, Visibility, Lock } from '@mui/icons-material'
import { Box, FormControl, InputLabel, Input, InputAdornment, IconButton, FormHelperText } from '@mui/material'
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form'

type PasswordFieldProps<T extends FieldValues> = {
  label?: string
  id?: string
  control: Control<T>
  name: keyof T
  errors: FieldErrors
  showPassword: boolean
  handleClickShowPassword: (field: 'password' | 'confirmPassword') => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function PasswordField<T extends FieldValues>({
  label = 'Password',
  id = 'adornment-password',
  control,
  name,
  errors,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword
}: PasswordFieldProps<T>) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Lock fontSize='medium' sx={{ color: 'action.active', mr: 1 }} />
      <FormControl
        variant='standard'
        sx={{
          minHeight: '71px'
        }}
        fullWidth
      >
        <InputLabel htmlFor={id} color='info' error={!!errors[name as string]}>
          {label}
        </InputLabel>
        <Controller
          control={control}
          name={name as Path<T>}
          render={({ field }) => (
            <Input
              {...field}
              error={!!errors[name as string]}
              autoComplete='off'
              id={id}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => handleClickShowPassword(name as 'password' | 'confirmPassword')}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <FormHelperText sx={{ color: 'error.main', fontWeight: '500' }}>
          {errors[name as string]?.message as string}
        </FormHelperText>
      </FormControl>
    </Box>
  )
}
