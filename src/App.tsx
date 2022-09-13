import styled from '@emotion/styled';
import ContactList from './pages/ContactList';
// import { useQuery, gql } from "@apollo/client";
import { Routes, Route } from 'react-router-dom';
import ContactDetail from './pages/ContactDetail';
import FormContact from './pages/FormContact';

function App() {
  return (
    <Wrapper className="App">
      <Routes>
        <Route path='/' element={<ContactList/>} />
        <Route path={'/:id'} element={<ContactDetail/>}/>
        <Route path={'/add'} element={<FormContact/>}/>
      </Routes>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: #e0e0e0;
  background-image: linear-gradient(to right, #003973, #e5e5be);
  overflow: hidden;
`;


export default App;
