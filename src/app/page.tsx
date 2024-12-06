'use client'

import styled from 'styled-components'
import ContactList from '@/components/ContactList'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.header`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
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
