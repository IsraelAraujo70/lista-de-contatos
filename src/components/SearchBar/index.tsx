'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchTerm } from '@/store/features/contactsSlice'
import styled from 'styled-components'

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4d79ff;
  }

  &::placeholder {
    color: #999;
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
