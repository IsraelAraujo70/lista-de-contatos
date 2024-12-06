'use client'

import { Contact } from '@/types/contact'
import { useAppDispatch } from '@/store/hooks'
import { deleteContact } from '@/store/features/contactsSlice'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  margin: 1rem auto;
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  box-shadow: 2.5px 3px 0 ${({ theme }) => theme.colors.text};
  transition:
    box-shadow 0.25s ease,
    transform 0.2s ease;
  width: 95%;

  &:hover {
    box-shadow: 5px 6px 0 ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`

const Name = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button<{ $variant?: 'edit' | 'delete' }>`
  position: relative;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  box-shadow: 2.5px 3px 0 ${({ theme }) => theme.colors.text};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ $variant, theme }) =>
    $variant === 'delete' ? 'white' : theme.colors.text};
  background-color: ${({ $variant, theme }) =>
    $variant === 'delete' ? 'red' : theme.colors.background};
  transition:
    box-shadow 0.25s ease,
    transform 0.2s ease;
  &:hover {
    box-shadow: 5px 6px 0 ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`

const Info = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0.25rem 0;
  font-size: 0.9rem;
`

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
}

export default function ContactCard({ contact, onEdit }: ContactCardProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      dispatch(deleteContact(contact.id))
      toast.success('Contato excluído com sucesso!')
    }
  }

  return (
    <Card>
      <CardHeader>
        <Name>{contact.name}</Name>
      </CardHeader>
      <Info>
        <strong>Email:</strong> {contact.email}
      </Info>
      <Info>
        <strong>Telefone:</strong> {contact.phone}
      </Info>
      <Info>
        <strong>Endereço:</strong> {contact.address}
      </Info>
      <ButtonGroup>
        <Button $variant="edit" onClick={() => onEdit(contact)}>
          Editar
        </Button>
        <Button $variant="delete" onClick={handleDelete}>
          Excluir
        </Button>
      </ButtonGroup>
    </Card>
  )
}
