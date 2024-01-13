import styled, { css } from 'styled-components'
import { cor } from '../../styles/color'

interface I {
  selected: boolean
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const heder = styled.header`
  display: flex;
  background-color: #303030;
  padding: 15px;
  gap: 2rem;
  border-radius: 10px;

  align-items: center;
  justify-content: space-between;

  width: 100%;
`

export const textMenu = styled.h4<I>`
  font-weight: 500;
  color: ${cor.bg.light};

  ${(h) =>
    h.selected &&
    css`
      text-decoration: 2px underline;
      font-weight: 900;
      text-decoration-color: ${cor.focus.a};
    `}

  :hover {
    cursor: pointer;
    font-weight: 900;
  }
`

export const main = styled.div`
  background-color: #303030;
  padding: 15px;
  border-radius: 10px;
`

export const form = styled.div`
  background-color: ${cor.bg.light};
  padding: 10px;
  border-radius: 10px;

  h3 {
    margin-bottom: 2rem;
  }
`

export const gridCardBalanc = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr));
  gap: 1rem;
`
