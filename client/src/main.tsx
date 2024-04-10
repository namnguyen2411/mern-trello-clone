import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'
import { theme } from './theme.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './contexts/authContext.tsx'
import ErrorBoundary from './components/ErrorBoundary/'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const CONFIRM_PROVIDER_DEFAULT_OPTIONS = {
  confirmationText: 'Yes',
  cancellationText: 'No',
  allowClose: false,
  contentProps: {
    sx: {
      '& .MuiDialogContentText-root': {
        fontWeight: 'bold'
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={CONFIRM_PROVIDER_DEFAULT_OPTIONS}>
          <CssBaseline />
          <AuthProvider>
            <ErrorBoundary>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </ErrorBoundary>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfirmProvider>
      </CssVarsProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
