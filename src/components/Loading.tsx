import styled from "@emotion/styled";
import LoadingLogo from '../assets/images/phonebook.png';

function Loading() {
  return (
    <div>
        <Logo src={LoadingLogo} width={120} alt='logo'/> 
    </div>
  )
}

const Logo = styled.img`

    animation: rotation 1s infinite linear;

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;

export default Loading