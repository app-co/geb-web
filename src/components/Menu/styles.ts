import styled from 'styled-components'
import { cor } from '../../styles/color'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: ${cor.bg.dark};

  display: flex;
  padding: 10px 2rem;

  align-items: center;
  justify-content: space-between;

  img {
    width: 6rem;
    height: 4rem;
  }
`

export const content = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

export const link = styled(Link)`
  font-size: calc(10px + 0.8vw);
  text-decoration: none;
  color: #c3c3c3;

  &:hover {
    color: #fff;
    font-weight: 600;
    text-decoration: underline;
  }
`
