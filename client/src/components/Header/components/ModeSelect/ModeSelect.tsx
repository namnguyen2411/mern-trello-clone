import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material'
import { useColorScheme, SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'

const defaultBoxProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 1
}

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChangeMode = (e: SelectChangeEvent<'light' | 'dark' | 'system'>) => {
    setMode(e.target.value as 'light' | 'dark' | 'system')
  }

  return (
    <FormControl sx={{ minWidth: '128px' }}>
      <InputLabel id='select-label-mode'>Mode</InputLabel>
      <Select
        labelId='select-label-mode'
        id='select-mode'
        value={mode}
        label='Mode'
        onChange={handleChangeMode}
        size='small'
        sx={{
          '& .MuiSvgIcon-root': {
            color: 'primary.main'
          }
        }}
      >
        <MenuItem value={'light'}>
          <Box sx={defaultBoxProps}>
            <LightMode fontSize='small' />
            Light
          </Box>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={defaultBoxProps}>
            <DarkMode fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={defaultBoxProps}>
            <SettingsBrightness fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
