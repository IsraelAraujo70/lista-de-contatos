import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contact, ContactState } from '@/types/contact'

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
  searchTerm: '',
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Adicionar contato
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    // Editar contato
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      )
      if (index !== -1) {
        state.contacts[index] = action.payload
      }
    },
    // Remover contato
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      )
    },
    // Atualizar termo de busca
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    // Definir estado de carregamento
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    // Definir erro
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  addContact,
  updateContact,
  deleteContact,
  setSearchTerm,
  setLoading,
  setError,
} = contactsSlice.actions

export default contactsSlice.reducer
