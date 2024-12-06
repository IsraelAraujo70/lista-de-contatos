'use client'

import { useState, useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Contact } from '@/types/contact'
import ContactCard from '../ContactCard'
import ContactForm from '../ContactForm'
import SearchBar from '../SearchBar'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const AddButton = styled.button`
  background-color: #4d79ff;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`

export default function ContactList() {
  const { contacts, searchTerm } = useAppSelector(state => state.contacts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  )

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      Object.values(contact).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [contacts, searchTerm])

  const handleAddContact = () => {
    setSelectedContact(undefined)
    setIsModalOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedContact(undefined)
  }

  return (
    <Container>
      <Header>
        <SearchBar />
        <AddButton onClick={handleAddContact}>Adicionar Contato</AddButton>
      </Header>

      {filteredContacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={handleEditContact}
        />
      ))}

      {isModalOpen && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ContactForm contact={selectedContact} onClose={handleCloseModal} />
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}
