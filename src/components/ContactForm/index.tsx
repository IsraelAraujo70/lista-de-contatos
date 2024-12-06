'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { addContact, updateContact } from '@/store/features/contactsSlice'
import { Contact } from '@/types/contact'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4d79ff;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#4d79ff' : '#e0e0e0'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#333')};

  &:hover {
    opacity: 0.9;
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
        <Button type="submit" $variant="primary">
          {contact ? 'Atualizar' : 'Adicionar'}
        </Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
      </ButtonGroup>
    </Form>
  )
}
