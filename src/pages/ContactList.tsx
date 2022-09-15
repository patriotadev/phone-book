import Contact from '../components/Contact'
import {useQuery} from '@apollo/client';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
import { GET_CONTACT } from "../hooks/useContact";
import styled from '@emotion/styled';
import { useState } from 'react';
import Logo from '../assets/images/phonebook.png';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

export type SearchType = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export type FilterType = {
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

function ContactList() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const {error, loading, data} = useQuery(GET_CONTACT);
  if(error) return <ErrorAlert/>
  if(loading) return <Loading/>

  const totalPage = Math.ceil(data.contact.length / 10);
  const firstIndex = (page * 10) - 10;
  const lastIndex = page * 10;

  const favouriteContactIdList = JSON.parse(localStorage.getItem('favourites') || '{}');

  // eslint-disable-next-line array-callback-return
  const allContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)

  // eslint-disable-next-line array-callback-return
  const favouriteContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  // eslint-disable-next-line array-callback-return
  }).filter((contact: any) => {
    if(favouriteContactIdList.includes(contact.id)) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)
  
  // eslint-disable-next-line array-callback-return
  const regularContact = data.contact.filter((contact: any) => {
    if(search === "") return contact
    if(contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())) return contact
  // eslint-disable-next-line array-callback-return
  }).filter((contact: any) => {
    if(!favouriteContactIdList.includes(contact.id)) return contact
  }).slice(firstIndex, lastIndex).map((contact: any) => <Link style={{textDecoration: 'none'}} to={`/${contact.id}`}><Contact {...contact} /></Link>)

  return (
    <Wrapper>
        <Header>
            <HeadTitle>
                <Title>
                  <img src={Logo} alt='logo' width={60} /><h1 style={{marginLeft: '0.5rem', color: '#404040'}}>PhoneBook</h1>
                </Title>
                <Link style={{textDecoration: 'none', color: 'black'}} to={'/add'}>
                  <AddBtn>+ Add New</AddBtn>
                </Link>
            </HeadTitle>
            <InputField>
              <SearchBar search={search} setSearch={setSearch} />  
              <Filter filter={filter} setFilter={setFilter}/>       
            </InputField>
        </Header>
        <List>
        {
            filter === "All" ? allContact : filter === "Favourite" ? favouriteContact : regularContact
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

    @media (max-width: 1350px) {
        width: 70%;
        overflow-y: auto;
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

const AddBtn = styled.h3`
    transition: 0.3s ease;
    color: #0865c2;

    &:hover {
        cursor: pointer;
        transform: translateY(-4px);
    }

    @media(max-width: 400px) {
        font-size: 1rem;
    }

    @media(max-width: 350px) {
        margin-top: 1rem;
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


    @media (max-width: 1350px) {
        margin-top: 0px;
    }
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

    @media(max-width: 350px) {
        flex-wrap: wrap;
    }
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