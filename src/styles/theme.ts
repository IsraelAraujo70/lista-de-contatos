interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
  }
}

export const lightTheme: Theme = {
  colors: {
    primary: '#6200ea',
    secondary: '#03dac6',
    background: '#ffffff',
    text: '#000000',
  },
}

export const darkTheme: Theme = {
  colors: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    text: '#ffffff',
  },
}

export type ThemeType = typeof lightTheme
