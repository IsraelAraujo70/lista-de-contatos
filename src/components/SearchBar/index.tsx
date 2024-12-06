'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchTerm } from '@/store/features/contactsSlice'
import styled from 'styled-components'

const SearchContainer = styled.div`
  margin: 16px 0;
  max-width: 400px;
  width: 100%;
`

const SearchInput = styled.input`
  border-radius: 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  box-shadow: 2.5px 3px 0 ${({ theme }) => theme.colors.text};
  width: 100%;
  padding: 0.8rem 1rem;
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.contacts.searchTerm)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar contatos..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchContainer>
  )
}
