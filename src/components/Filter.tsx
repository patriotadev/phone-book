import styled from '@emotion/styled';
// import { FaFilter } from 'react-icons/fa';

function Filter() {
  return (
    <Select>
        <option value='1'>All</option>
        <option value='2'>Favourite</option>
        <option value='3'>Regular</option>
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