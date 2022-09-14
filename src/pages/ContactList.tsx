import Contact from '../components/Contact'
import {useQuery} from '@apollo/client';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
import { GET_CONTACT } from "../hooks/useContact";
import styled from '@emotion/styled';
import { useState } from 'react';
import Logo from '../assets/images/phonebook.png';

export type SearchType = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export type FilterType = {
    filter: number
    setFilter: React.Dispatch<React.SetStateAction<number>>
}


function ContactList() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(1);
  const {error, loading, data} = useQuery(GET_CONTACT);
  if(error) return <div>Oops.. Something Wrong!</div>
  if(loading) return <div>Loading..</div>

  const totalPage = Math.ceil(data.contact.length / 10);
  const firstIndex = (page * 10) - 10;
  const lastIndex = page * 10;

  const favouriteContactIdList = JSON.parse(localStorage.getItem('favourites') || '{}');
  console.log(favouriteContactIdList)

  // eslint-disable-next-line array-callback-return
  const allContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)

  const favouriteContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  }).filter((contact: any) => {
    if(favouriteContactIdList.includes(contact.id)) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)
  
  const regularContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  }).filter((contact: any) => {
    if(!favouriteContactIdList.includes(contact.id)) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)

  return (
    <Wrapper>
        <Header>
            <HeadTitle>
                <Title>
                  {/* <h1 style={{color: '#2e2d2d'}}><AiFillContacts color='#2e2d2d' size={20} style={{marginRight: '0.5rem'}} />phoneBook</h1> */}
                  <img src={Logo} alt='logo' width={60} /><h1 style={{marginLeft: '0.5rem', color: '#404040'}}>PhoneBook</h1>
                </Title>
                <Link style={{textDecoration: 'none', color: 'black'}} to={'/add'}>
                  <AddBtn style={{color: '#0865c2'}}>+ Add New</AddBtn>
                </Link>
            </HeadTitle>
            <InputField>
              <SearchBar search={search} setSearch={setSearch} />  
              <Filter filter={filter} setFilter={setFilter}/>       
            </InputField>
        </Header>
        <List>
        {
            allContact
            // favouriteContact
            // regularContact
        }
        </List>
        <Paginate>
            { page > 1 ? <PageBtn onClick={() => setPage(page <= 1 ? 1 : page - 1)}>&#8249; Prev</PageBtn> : <div style={{visibility: 'hidden'}}></div>}
            { page < totalPage ? <PageBtn onClick={() => setPage(page >= totalPage ? totalPage : page + 1)}>Next &#8250;</PageBtn> : ''}
        </Paginate>
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

const AddBtn = styled.h3`
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }
`;


const Header = styled.div`
    display: flex;
    flex-direction: column;
    // background-color: salmon;
`;

const Paginate = styled.div`
    margin-top: -12rem;
    // margin-bottom: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const PageBtn = styled.button`
    border: none;
    background-color: white;
    font-size: 1rem;
    font-weight: bold;
    color: #0865c2;
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }
`

const Title = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Anton', sans-serif;
`;


const HeadTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;

const InputField = styled.div`
    margin-top: -1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const List = styled.div`
    margin-top: -2rem;
    height: 100%;
    width: 100%;
`;

export default ContactList