import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global'
import { theme } from './styles/theme'

import { AuthContextProvider } from './contexts/auth.context'

import { Routes } from './routes'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
