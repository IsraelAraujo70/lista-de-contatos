'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../styles/globalStyles'
import StyledComponentsRegistry from '../lib/registry'
import { lightTheme, darkTheme, ThemeType } from '../styles/theme'
import { useEffect, useState } from 'react'
import ButtonThemeSelect from '../components/ButtonTheme'

export default function StyleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      return saved ? saved === 'dark' : prefersDark
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
      requestAnimationFrame(() => {
        document.documentElement.style.transition =
          'background-color 0.2s ease-in-out'
        document.body.style.transition = 'background-color 0.2s ease-in-out'

        document.documentElement.style.backgroundColor = isDarkMode
          ? darkTheme.colors.background
          : lightTheme.colors.background
        document.body.style.backgroundColor = isDarkMode
          ? darkTheme.colors.background
          : lightTheme.colors.background
      })
    }
  }, [isDarkMode])

  const currentTheme: ThemeType = isDarkMode ? darkTheme : lightTheme

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles theme={currentTheme} />
        <ButtonThemeSelect
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
