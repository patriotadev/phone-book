import styled from '@emotion/styled';
import { SearchType } from '../pages/ContactList';


const SearchBar = ({search, setSearch} : SearchType) => {
  return (
    <Input type='text' placeholder='Search Contact' value={search} onChange={(e) => setSearch(e.target.value)}  /> 
  )
}

const Input = styled.input`
    width: 70%;
    padding: 1rem;
    transition: 0.3s ease;
    border-radius: 5px;
    border: 1px solid lightgrey;

    &:focus {
        outline: none;
    }
`;

export default SearchBar