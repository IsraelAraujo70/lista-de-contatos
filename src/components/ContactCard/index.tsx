'use client'

import { Contact } from '@/types/contact'
import { useAppDispatch } from '@/store/hooks'
import { deleteContact } from '@/store/features/contactsSlice'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
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
  color: #333;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button<{ $variant?: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  background-color: ${({ $variant }) =>
    $variant === 'delete'
      ? '#ff4d4d'
      : $variant === 'edit'
        ? '#4d79ff'
        : '#e0e0e0'};
  color: ${({ $variant }) => ($variant ? '#fff' : '#333')};

  &:hover {
    opacity: 0.9;
  }
`

const Info = styled.p`
  color: #666;
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
        <ButtonGroup>
          <Button $variant="edit" onClick={() => onEdit(contact)}>
            Editar
          </Button>
          <Button $variant="delete" onClick={handleDelete}>
            Excluir
          </Button>
        </ButtonGroup>
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
    </Card>
  )
}
