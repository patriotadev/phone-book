import styled from '@emotion/styled';
import { useMutation, useQuery} from '@apollo/client';
import { ADD_CONTACT, GET_CONTACT } from '../hooks/useContact';
import { FaUser } from 'react-icons/fa';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function FormContact() {


  const {data} = useQuery(GET_CONTACT);
  const numberRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numbers, setNumbers] = useState([] as any);
  const [phones, setPhones] = useState([] as any);

  const [numberRow, setNumberRow] = useState([
    <InputGroup>
        <BsFillTelephoneForwardFill style={{marginTop: '12px'}} size={20}/>
        <NumberInput ref={numberRef} name='phone' onChange={(e) => setNumbers([...numbers, {number: e.target.value}])} placeholder='+628XXXXXXXXXX' type='text' />
    </InputGroup>
  ] as any);

  const addNumberRow = () => {
    setNumberRow([...numberRow, <InputGroup>
        <BsFillTelephoneForwardFill style={{marginTop: '12px'}} size={20}/>
        <NumberInput name='phone' onChange={(e) => setNumbers([...numbers, {number: e.target.value}])} placeholder='+628XXXXXXXXXX' type='text' />
    </InputGroup>])
  }

  const removeNumberRow = () => {
    const temp = [...numberRow];
    const dataNumber = temp.splice(numberRow.length - 1, 1);
    setNumberRow(dataNumber);
    setNumbers([]);
  }

  const submitHandler = () => {
    let unique = false;
    data.contact.filter((contact:any) => {
        if (contact.first_name.toLowerCase() === firstName.toLowerCase() && contact.last_name.toLowerCase() === lastName.toLowerCase()) {
            unique = true;
            alert("Contact name already exists, please enter another name.");
        }
    })

    if (unique) {
        navigate('/add')
    } else {
        setPhones(numbers);
        insert_contact();
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

  if(error) return <div>Error...</div>
  if(loading) return <div>Loading...</div>
  console.log(phones);

  return (
    <Wrapper>
        <Nav>
            <Link to={'/'} style={{textDecoration: 'none', color: '#0865c2'}}>
                <h4>&#8249; Back</h4>
            </Link>
            <Action>
                {/* <AiOutlineMinusCircle size={20} color='red'/>
                <h4 style={{color: 'red', cursor: 'pointer'}}>Delete</h4> */}
            </Action>
        </Nav>
        <Header>
            <Profile>
                <AiOutlineUserAdd size={150}/>
                {/* <NameInput style={{textAlign: 'center'}} type='text' placeholder='Contact Name' /> */}
            </Profile>
        </Header>
            <NameInputField>
                <InputGroup>
                    <FaUser style={{marginTop: '12px'}} size={20}/>
                    <NameInput name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='First Name' type='text' />
                    <NameInput name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='Last Name' type='text' />
                </InputGroup>
            </NameInputField>
            <NumberInputField>
                {numberRow}
            </NumberInputField>
            <NumberInputAction>
                <MdOutlineAddCircleOutline onClick={addNumberRow} color='green' style={{marginRight: '1.5%', cursor: 'pointer'}}/>
                <AiOutlineMinusCircle onClick={removeNumberRow} color='red' style={{cursor: 'pointer'}}/>
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
`;

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
    background-color: black;
    color: white;
    cursor: pointer;
`

export default FormContact