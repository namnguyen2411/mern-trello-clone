import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    trello: {
      MAIN_LAYOUT_PADDING_TOP: string
      headerHeight: number
      boardBarHeight: number
      columnWidth: number
      columnHeaderHeight: number
      addNewColumnWidth: number
      starIconColor: string
    }
  }
  interface ThemeOptions {
    trello: {
      MAIN_LAYOUT_PADDING_TOP: string
      headerHeight: number
      boardBarHeight: number
      columnWidth: number
      columnHeaderHeight: number
      addNewColumnWidth: number
      starIconColor: string
    }
  }
  interface Palette {
    boardContentBg: string
    cardBg: string
  }

  interface PaletteOptions {
    boardContentBg: string
    cardBg: string
  }
}

export const theme = extendTheme({
  trello: {
    MAIN_LAYOUT_PADDING_TOP: '4px',
    headerHeight: 50,
    boardBarHeight: 50,
    columnWidth: 300,
    columnHeaderHeight: 46,
    addNewColumnWidth: 250,
    starIconColor: '#ffdb58'
  },

  colorSchemes: {
    light: {
      palette: {
        boardContentBg: '#1976d2',
        cardBg: '#dadada',
        background: {
          paper: 'rgb(245, 245, 245)'
        }
      }
    },
    dark: {
      palette: {
        boardContentBg: '#34495e',
        cardBg: '#333643'
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '3px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: '500'
        }
      }
    }
  }
})
