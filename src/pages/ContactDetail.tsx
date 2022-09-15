import {useQuery, useMutation} from '@apollo/client';
import { useParams } from "react-router-dom";
import { GET_CONTACT_DETAIL, DELETE_CONTACT_BY_ID, GET_CONTACT, EDIT_CONTACT, EDIT_PHONE_NUMBER, ADD_NUMBER} from '../hooks/useContact';
import styled from '@emotion/styled';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaUser, FaRegStar, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

  const ContactDetail = () => {
 
  const navigate = useNavigate();
  const { id } = useParams();
  const {error, loading, data} = useQuery(GET_CONTACT_DETAIL, {
      variables: {id},
  })
  const [favourite, setFavourite] = useState(() => {
    const storage = localStorage.getItem('favourites');
    return storage ? JSON.parse(storage) : []
  })
  console.log(favourite);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
    if(favourites) {
    setFavourite(favourites);
    }
  }, [])
  
  useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourite));
  },[favourite])

  
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [newNumber, setNewNumber] = useState('');
  const [numberValue] = useState(null);


  const [delete_contact_by_pk] = useMutation(DELETE_CONTACT_BY_ID, {
    refetchQueries: [{query: GET_CONTACT}]
  });
  
  const [insert_phone] = useMutation(ADD_NUMBER);
  const [update_contact_by_pk] = useMutation(EDIT_CONTACT);
  const [update_phone_by_pk] = useMutation(EDIT_PHONE_NUMBER);

  const contacts = useQuery(GET_CONTACT);

    const updateContactHandler = () => {
        let unique = false;
        // eslint-disable-next-line array-callback-return
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
                 insert_phone({variables: {
                    "contact_id": id,
                    "phone_number": newNumber
                }, refetchQueries: [{query: GET_CONTACT}]
                })
                 update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "first_name": firstName,
                        "last_name": lastName,
                      }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            } else if (data.contact_by_pk["first_name"] !== firstName && lastName === null) {
                 insert_phone({variables: {
                    "contact_id": id,
                    "phone_number": newNumber
                }, refetchQueries: [{query: GET_CONTACT}]
                })
                 update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "first_name": firstName
                    }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            } else if (firstName === null && data.contact_by_pk["first_name"] !== lastName) {
                 insert_phone({variables: {
                    "contact_id": id,
                    "phone_number": newNumber
                }, refetchQueries: [{query: GET_CONTACT}]
                })
                 update_contact_by_pk({variables: {
                    "id": id,
                    "_set": {
                        "last_name": lastName
                    }
                }, refetchQueries: [{query: GET_CONTACT}]
            })
            } else if (firstName === null && lastName === null) {
                 insert_phone({variables: {
                    "contact_id": id,
                    "phone_number": newNumber
                }, refetchQueries: [{query: GET_CONTACT}]
                })
            }
            alert('Success! contact has been updated.')
            navigate('/');
        }

    }

  if(error) return <ErrorAlert/>
  if(loading) return <Loading/>

  return (
    <Wrapper>
        <Nav>
            <Link to={'/'} style={{textDecoration: 'none', color: '#0865c2'}}>
                <BackBtn>&#8249; Back</BackBtn>
            </Link>
            <Action>
            <Favourite onClick={() => {
                let isFavourite = favourite.includes(data.contact_by_pk.id);
                if(isFavourite) {
                    setFavourite(favourite.filter((fav: any) => fav !== data.contact_by_pk.id));
                } else {
                    alert("Success! Contact has been added to favourite.")
                    setFavourite([...favourite, data.contact_by_pk.id]);
                }
            } }>
                {
                    favourite.includes(data.contact_by_pk.id) ? <FaStar size={20} color='#404040' /> :  <FaRegStar size={20} color='#404040'/>
                }
                <FavouriteText>Favourite</FavouriteText>
            </Favourite>
            <Remove onClick={() => {
                delete_contact_by_pk({variables: {id: data.contact_by_pk.id}})
                alert('Success! contact has been deleted.');
                navigate('/');
            }
            }>
                <AiOutlineMinusCircle size={20} color='red'/>
                <RemoveText style={{color: 'red', cursor: 'pointer', marginLeft: '0.5rem'}}>Delete</RemoveText>
            </Remove>
            </Action>
        </Nav>
        <Header>
             <Profile>
                <FaUserCircle color='#404040' size={150}/>
            </Profile>
        </Header>
            <NameInputField>
                <InputGroup>
                    <FaUser color='#404040' style={{marginTop: '12px'}} size={20}/>
                    <NameInput name='first_name' value={firstName === null ? data.contact_by_pk["first_name"] : firstName} onChange={(e: { target: { value: any; }; }) => setFirstName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='First Name' type='text' />
                    <NameInput name='last_name' value={lastName === null ? data.contact_by_pk["last_name"] : lastName} onChange={(e: { target: { value: any; }; }) => setLastName(e.target.value.replace(/[^a-zA-Z0-9' ']/ig, ''))} placeholder='Last Name' type='text' />
                </InputGroup>
            </NameInputField>
            <NumberInputField>
                {data.contact_by_pk.phones.map((phone:any) => <NumberField>
                    <BsFillTelephoneForwardFill color='#404040' style={{marginTop: '12px'}} size={20}/>
                    <NumberInput placeholder='+628XXXXXXXXXX' type='text' value={numberValue === null ?  phone.number : numberValue} onChange={(e: { target: { value: any; }; }) => {
                        update_phone_by_pk({variables:{
                            pk_columns: {
                                number: phone.number,
                                contact_id: id
                            },
                            new_phone_number: e.target.value
                        }})
                    } }/>
                    </NumberField>)}
                    <NumberField>
                    <BsFillTelephoneForwardFill color='#404040' style={{marginTop: '12px'}} size={20}/>
                    <NumberInput placeholder='+ Add new number' type='text' value={newNumber} onChange={(e: { target: { value: any; }; }) => setNewNumber(e.target.value)}/>
                    </NumberField>
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

const FavouriteText = styled.h4`
    color: #404040;
    cursor: pointer;
    margin-left: 0.5rem;

    @media(max-width: 1350px) {
        display: none;
    }
`;
const RemoveText = styled.h4`
    color: #404040;
    cursor: pointer;
    margin-left: 0.5rem;

    @media(max-width: 1350px) {
        display: none;
    }
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
    width: 30%;
    align-items: center;

    @media(max-width: 1350px) {
        width: 6rem;
    }
`;

const Favourite = styled.div`
    display: flex;
    align-items: center;
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }
`;

const Remove = styled.div`
    display: flex;
    align-items: center;
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }
`;

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
    background-color: #404040;
    color: white;
`

export default ContactDetail