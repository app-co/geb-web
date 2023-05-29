import styled from 'styled-components'
import { cor } from '../../styles/color'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  z-index: 1;

  background-color: ${cor.blue[3]};

  width: calc(10rem + 10vw);
  height: 100vh;

  color: #c3c3c3;

  display: flex;
  flex-direction: column;

  padding: 20px;
`

export const content = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

export const link = styled(Link)`
  margin-top: 1rem;
  font-size: calc(10px + 0.8vw);
  text-decoration: none;
  color: #c3c3c3;

  &:hover {
    color: #fff;
    font-weight: 600;
    text-decoration: underline;
  }
`
