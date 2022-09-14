import styled from '@emotion/styled';
import { FaRegStar, FaAngleRight, FaStar } from 'react-icons/fa'

function Contact(contact: any) {

  const favouriteContactIdList = JSON.parse(localStorage.getItem('favourites') || '{}');

  return (
    <Card>
        <ContactName className='contact-info'>
            <h5>{contact.first_name} {contact.last_name}</h5>
        </ContactName>
        <Action>
            <Favourite>
              { favouriteContactIdList.includes(contact.id) ? <FaStar color='#404040'/>  : <FaRegStar/>}
            </Favourite>
            <Detail>
              <FaAngleRight color='#404040' />
            </Detail>
        </Action>
    </Card>
  )
}

const Card = styled.div`
    width: 100%;
    height: 5%;
    // background-color: #ededed;
    border-bottom: 1px solid #ededed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0px 0px 0px 1rem;
    font-family: sans-serif;
    border-radius: 5px;
    margin-bottom: 1rem;
    color: black;

    &:hover {
        background-color: #cfd0d1;
    }
`;

const ContactName = styled.div`
    margin-left: 1rem;
    color: #404040;
`


const Action = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100p%;
    height: 100%;
`;

const Favourite = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    // background-color: salmon;
`;

const Detail = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    // background-color: lightblue;
`;


export default Contact;