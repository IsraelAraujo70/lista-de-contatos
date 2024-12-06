export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export interface ContactState {
  contacts: Contact[]
  loading: boolean
  error: string | null
  searchTerm: string
}
