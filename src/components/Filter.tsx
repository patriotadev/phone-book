import styled from '@emotion/styled';
import { FilterType } from '../pages/ContactList';
// import { FaFilter } from 'react-icons/fa';

function Filter({filter, setFilter} : FilterType) {
  
  return (
    <Select onChange={(e) => setFilter(e.target.value)}>
        <option value='All'>All</option>
        <option value='Favourite'>Favourite</option>
        <option value='Regular'>Regular</option>
    </Select>
  )
}

const Select = styled.select`
    width: 25%;
    padding: 0.95rem;
    border-radius: 5px;
    border: 1px solid lightgrey;

    &:focus {
        outline: none;
    }
`;

export default Filter