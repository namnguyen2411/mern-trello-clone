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
    headerHeight: 58,
    boardBarHeight: 50,
    columnWidth: 300,
    columnHeaderHeight: 46,
    addNewColumnWidth: 250
  },

  colorSchemes: {
    light: {
      palette: {
        boardContentBg: '#1976d2',
        cardBg: '#dadada'
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
    }
  }
})
