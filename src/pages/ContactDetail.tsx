import {useQuery, useMutation} from '@apollo/client';
import { useParams } from "react-router-dom";
import { GET_CONTACT_DETAIL, DELETE_CONTACT_BY_ID, GET_CONTACT, EDIT_CONTACT, EDIT_PHONE_NUMBER} from '../hooks/useContact';
import styled from '@emotion/styled';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  function ContactDetail() {

  const navigate = useNavigate();
  const { id } = useParams();
  const {error, loading, data} = useQuery(GET_CONTACT_DETAIL, {
      variables: {id},
  })

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
//   const [numbers, setNumbers] = useState([] as any);

  const [delete_contact_by_pk] = useMutation(DELETE_CONTACT_BY_ID, {
    refetchQueries: [{query: GET_CONTACT}]
  });
  
  const [update_contact_by_pk] = useMutation(EDIT_CONTACT);
  const [update_phone_by_pk] = useMutation(EDIT_PHONE_NUMBER);

  const contacts = useQuery(GET_CONTACT);

  console.log(contacts.data);

    const updateContactHandler =  () => {
        let unique = false;
        contacts.data.contact.filter((contact:any) => {
            if(firstName !== null && lastName !== null) {
                if (contact.first_name === firstName && contact.last_name === lastName) {
                    unique = true;
                    alert("Contact name already exists, please enter another name.");
                }
            } else if (firstName !== null && lastName === null) {
                if (contact.first_name === firstName) {
                    unique = true;
                    alert("Contact name already exists, please enter another name.");
                }
            } else if (firstName === null && lastName !== null) {
                if (contact.last_name === lastName) {
                    unique = true;
                    alert("Contact name already exists, please enter another name.");
                }
            }
        })

        if(unique) {
            navigate(`/${id}`)
        } else {
            if (firstName !== null && lastName !== null) {
                update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "first_name": firstName,
                        "last_name": lastName,
                      }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            } else if (data.contact_by_pk["first_name"] !== firstName && lastName === null) {
                update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "first_name": firstName
                    }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            } else if (firstName === null && data.contact_by_pk["first_name"] !== lastName) {
                update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "last_name": lastName
                    }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            }
            alert('Success! contact has been updated.')
            navigate('/');
        }

    }

  if(error) return <div>Something Error</div>
  if(loading) return <div>Loading...</div>

  return (
    <Wrapper>
        <Nav>
            <Link to={'/'} style={{textDecoration: 'none', color: '#0865c2'}}>
                <h4>&#8249; Back</h4>
            </Link>
            <Action onClick={() => {
                delete_contact_by_pk({variables: {id: data.contact_by_pk.id}})
                alert('Success! contact has been deleted.');
                navigate('/');
            }
            }>
                <AiOutlineMinusCircle size={20} color='red'/>
                <h4 style={{color: 'red', cursor: 'pointer'}}>Delete</h4>
            </Action>
        </Nav>
        <Header>
             <Profile>
                <FaUserCircle size={150}/>
                {/* <h1>{data.contact_by_pk["first_name"]} {data.contact_by_pk["last_name"]}</h1> */}
            </Profile>
        </Header>
            <NameInputField>
                <InputGroup>
                    <FaUser style={{marginTop: '12px'}} size={20}/>
                    <NameInput name='first_name' value={firstName === null ? data.contact_by_pk["first_name"] : firstName} onChange={(e: { target: { value: any; }; }) => setFirstName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='First Name' type='text' />
                    <NameInput name='last_name' value={lastName === null ? data.contact_by_pk["last_name"] : lastName} onChange={(e: { target: { value: any; }; }) => setLastName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='Last Name' type='text' />
                </InputGroup>
            </NameInputField>
            <NumberInputField>
                {data.contact_by_pk.phones.map((phone:any) => <NumberField>
                    <BsFillTelephoneForwardFill style={{marginTop: '12px'}} size={20}/>
                    <NumberInput placeholder='+628XXXXXXXXXX' type='text' value={phone.number} />
                    </NumberField>)}
            </NumberInputField>
            <Save>
                <SaveBtn onClick={updateContactHandler}>Save</SaveBtn>
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

const NameInputField = styled.div`
    width: 100%;
    // height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    // overflow-y: scroll;
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

const NumberField = styled.div`
    width: 80%;
    // background-color: salmon;
    display: flex;
    justify-content: center;
    align-items: center
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
`

export default ContactDetail