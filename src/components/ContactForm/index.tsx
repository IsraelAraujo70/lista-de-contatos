'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { addContact, updateContact } from '@/store/features/contactsSlice'
import { Contact } from '@/types/contact'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const Form = styled.form``

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`

const Input = styled.input`
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  box-shadow: 2.5px 3px 0 ${({ theme }) => theme.colors.text};
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &:focus {
    box-shadow: 5px 6px 0 ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  position: relative;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  box-shadow: 2.5px 3px 0 ${({ theme }) => theme.colors.text};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ $variant, theme }) =>
    $variant === 'secondary' ? 'white' : theme.colors.text};
  background-color: ${({ $variant, theme }) =>
    $variant === 'secondary' ? 'red' : theme.colors.background};
  transition:
    box-shadow 0.25s ease,
    transform 0.2s ease;
  &:hover {
    box-shadow: 5px 6px 0 ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`

interface ContactFormProps {
  contact?: Contact
  onClose: () => void
}

export default function ContactForm({ contact, onClose }: ContactFormProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      })
    }
  }, [contact])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, preencha todos os campos obrigatórios!')
      return
    }

    const contactData = {
      ...formData,
      id: contact?.id || Date.now().toString(),
    }

    if (contact) {
      dispatch(updateContact(contactData))
      toast.success('Contato atualizado com sucesso!')
    } else {
      dispatch(addContact(contactData))
      toast.success('Contato adicionado com sucesso!')
    }

    onClose()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nome *</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Telefone *</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="address">Endereço</Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </FormGroup>

      <ButtonGroup>
        <Button
          type="submit"
          $variant="primary"
          disabled={!formData.name || !formData.email || !formData.phone}
        >
          {contact ? 'Atualizar' : 'Adicionar'}
        </Button>
        <Button type="button" onClick={onClose} $variant="secondary">
          Cancelar
        </Button>
      </ButtonGroup>
    </Form>
  )
}
