'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import styled from 'styled-components'
import { ThemeType } from '../../styles/theme'

type Props = {
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Button = styled.button<{ theme: ThemeType }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`

const ButtonThemeSelect = ({ isDarkMode, setIsDarkMode }: Props) => {
  return (
    <Button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  )
}

export default ButtonThemeSelect
