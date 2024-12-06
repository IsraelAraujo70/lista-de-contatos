'use client'

import { createGlobalStyle } from 'styled-components'
import { ThemeType } from './theme'

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  body {
    font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  #__next {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  input, textarea {
    font-family: inherit;
  }
`
