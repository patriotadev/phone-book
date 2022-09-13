import styled from '@emotion/styled';
import { FaRegStar } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'

function Contact(contact: any) {
  return (
    <Card>
        <ContactName className='contact-info'>
            <h5>{contact.first_name} {contact.last_name}</h5>
        </ContactName>
        <Action>
            <Favourite>
              <FaRegStar/>
            </Favourite>
            <DotAction>
              <BsThreeDotsVertical/>
            </DotAction>
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

const DotAction = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    // background-color: lightblue;
`;


export default Contact;