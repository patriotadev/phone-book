import styled from '@emotion/styled';
import { useMutation, useQuery} from '@apollo/client';
import { ADD_CONTACT, GET_CONTACT } from '../hooks/useContact';
import { FaUser } from 'react-icons/fa';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

  function FormContact() {

  const {data} = useQuery(GET_CONTACT);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numbers, setNumbers] = useState([] as any);
  const [phones, setPhones] = useState([] as any);

  const [numberRow, setNumberRow] = useState([
    <InputGroup>
        <BsFillTelephoneForwardFill color='#404040' style={{marginTop: '12px'}} size={20}/>
        <NumberInput name='phone' onChange={(e) => setNumbers([...numbers, {number: e.target.value}])} placeholder='+628XXXXXXXXXX' type='text' />
    </InputGroup>
  ] as any);

  const addNumberRow = () => {
    setNumberRow([...numberRow, <InputGroup>
        <BsFillTelephoneForwardFill color='#404040' style={{marginTop: '12px'}} size={20}/>
        <NumberInput name='phone' onChange={(e) => setNumbers([...numbers, {number: e.target.value}])} placeholder='+628XXXXXXXXXX' type='text' />
    </InputGroup>])
  }

  console.log(numbers);
  
  const submitHandler = async () => {
    let unique = false;
    // eslint-disable-next-line array-callback-return
    data.contact.filter((contact:any) => {
        if (contact.first_name.toLowerCase() === firstName.toLowerCase() && contact.last_name.toLowerCase() === lastName.toLowerCase()) {
            unique = true;
            alert("Contact name already exists, please enter another name.");
        }
    })

    if (unique) {
        navigate('/add')
    } else {
        await setPhones(numbers);
        await insert_contact();
        alert('Success! contact has been added.')
        navigate('/');
    }
  }

  const [insert_contact, {error, loading}] = useMutation(ADD_CONTACT, {
    variables: {
        "first_name": firstName,
        "last_name" : lastName,
        "phones": phones
    }, refetchQueries: [{query: GET_CONTACT}]
  })

  if(error) return <ErrorAlert/>
  if(loading) return <Loading/>

  return (
    <Wrapper>
        <Nav>
            <Link to={'/'} style={{textDecoration: 'none', color: '#0865c2'}}>
                <BackBtn>&#8249; Back</BackBtn>
            </Link>
            <Action>
            </Action>
        </Nav>
        <Header>
            <Profile>
                <AiOutlineUserAdd color='#404040' size={150}/>
            </Profile>
        </Header>
            <NameInputField>
                <InputGroup>
                    <FaUser color='#404040' style={{marginTop: '12px'}} size={20}/>
                    <NameInput name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='First Name' type='text' />
                    <NameInput name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='Last Name' type='text' />
                </InputGroup>
            </NameInputField>
            <NumberInputField>
                {numberRow}
            </NumberInputField>
            <NumberInputAction>
                { numberRow.length !== numbers.length ? '' : <AddNumberBtn onClick={addNumberRow}>+ Add More</AddNumberBtn>}
            </NumberInputAction>
            <Save>
                <SaveBtn onClick={submitHandler}>Save</SaveBtn>
            </Save>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    margin: 4% 0;
    height: 90%;
    width: 50%;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 0.5rem;
    font-family: sans-serif;

    @media (max-width: 1000px) {
        width: 70%;
    }

    @media (max-width: 567px) {
        margin: 4% 0%;
        width: 80%;
        height: 100%;
        overflow-y: auto;
    }

    @media (max-width: 400px) {
        width: 90%;
    }
`;

const BackBtn = styled.h4`
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }
`;

const AddNumberBtn = styled.h4`
    color: lightgrey;
    cursor: pointer;

    &:hover {
        color: #404040;
    }

`

const Nav = styled.div`
    color: #0865c2;
    display: flex;
    justify-content: space-between;
`;

const Action = styled.div`
    display: flex;
    justify-content: space-around;
    width: 8%;
    align-items: center;
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 40%;
    // background-color: #f0f0f0;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NameInputField = styled.div`
    width: 100%;
    // height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    // overflow-y: scroll;
`;
const NumberInputField = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    overflow-y: auto;
`;

const InputGroup = styled.div`
    width: 80%;
    // background-color: salmon;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NumberInputAction = styled.div`
    width: 83%;
    // background-color: salmon;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;


const NumberInput = styled.input`
    width: 80%;
    // border-radius: 5px;
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid black;
    // background-color: #ededed;
    transition: 0.1s ease;

    &:focus {
        outline: none;
        transform: translateX(0.5rem);
        border-bottom: 2px solid black;
    }

`;

const NameInput = styled.input`
    width: 36%;
    // border-radius: 5px;
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid black;
    // background-color: #ededed;
    transition: 0.1s ease;
    margin-right: 2%;

    &:focus {
        outline: none;
        transform: translateX(0.5rem);
        border-bottom: 2px solid black;
    }

`;

const Save = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 100%;
    justify-content: center;
`

const SaveBtn = styled.button`
    padding: 0.7rem 1rem;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    background-color: #404040;
    color: white;
    cursor: pointer;
`

export default FormContact