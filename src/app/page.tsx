'use client'

import styled from 'styled-components'
import ContactList from '../components/ContactList'
import { ThemeType } from '../styles/theme'

const Container = styled.div<{ theme: ThemeType }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Header = styled.header`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h1<{ theme: ThemeType }>`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

export default function Home() {
  return (
    <Container>
      <Header>
        <Title>Lista de Contatos</Title>
      </Header>
      <ContactList />
    </Container>
  )
}
