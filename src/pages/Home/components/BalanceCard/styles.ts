import styled from 'styled-components'
import { cor } from '../../../../styles/color'

export const Container = styled.div`
  background-color: #ffcd00;
  max-width: 21.5rem;
  height: 11.5rem;
  border-radius: 1.3rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  svg {
    font-size: 2rem;
    color: ${cor.bg.dark};
  }
`

export const metric = styled.h2`
  font-weight: 800;

  /* @media (min-width: 1920px) {
    font-size: calc(1rem + 1vw);
  } */

  @media (min-width: 350px) {
    font-size: calc(1.5rem + 2vw);
  }

  @media (min-width: 720px) {
    font-size: calc(1rem + 2.2vw);
  }

  @media (min-width: 1030px) {
    font-size: calc(1rem + 1.6vw);
  }

  @media (min-width: 1300px) {
    font-size: calc(1rem + 1.2vw);
  }
`
