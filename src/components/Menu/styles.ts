import styled from 'styled-components'
import { cor } from '../../styles/color'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: rgba(7, 21, 102, 1);
  height: 3.4rem;

  display: flex;
  padding: 10px 2rem;

  align-items: center;
  justify-content: space-between;

  .links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
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
