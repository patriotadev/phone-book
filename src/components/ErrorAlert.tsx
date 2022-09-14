import styled from '@emotion/styled';
import {BiErrorCircle} from 'react-icons/bi'

function ErrorAlert() {
  return (
    <Error>
        <BiErrorCircle color='#d44652' size={160} />
        <ErrorText>Oops.. Something Wrong!</ErrorText>
    </Error>
  )
}

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorText = styled.h2`
  margin-top: 1rem;
  font-family: sans-serif;
  color: #404040;
`

export default ErrorAlert;