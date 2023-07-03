import styled, { keyframes } from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div``

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${cor.orange[1]};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;

  transition: 0.5s;

  transform: {
    border-left-color: ${cor.blue[3]};
  }
`
