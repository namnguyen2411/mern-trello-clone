import { CssVarsTheme, Theme, experimental_extendTheme as extendTheme } from '@mui/material/styles'

type ThemeType = Omit<Theme, 'palette' | 'applyStyles'> & CssVarsTheme

declare module '@mui/material/styles' {
  interface ThemeOptions {
    trello: {
      headerHeight: number
      boardBarHeight: number
      boardContentHeight: (theme: ThemeType) => string
      cardBgLight: string
      cardBgDark: string
      columnHeaderHeight: number
      columnFooterHeight: number
    }
  }
  interface Theme {
    trello: {
      headerHeight: number
      boardBarHeight: number
      boardContentHeight: (theme: ThemeType) => string
      cardBgLight: string
      cardBgDark: string
      columnHeaderHeight: number
      columnFooterHeight: number
    }
  }
}

export const theme = extendTheme({
  trello: {
    headerHeight: 58,
    boardBarHeight: 60,
    boardContentHeight: (theme: ThemeType) =>
      `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px)`,
    cardBgLight: '#dadada',
    cardBgDark: '#333643',
    columnHeaderHeight: 50,
    columnFooterHeight: 56
  },

  colorSchemes: {
    light: {
      palette: {}
    },
    dark: {
      palette: {}
    }
  }
})
