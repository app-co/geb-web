import styled from 'styled-components'
import { cor } from '../../styles/color'

interface I {
  selected: boolean
}

export const Container = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  background-color: ${cor.bg.dark};
  height: 100vh;
`

export const gridCardBalanc = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr));
  gap: 1rem;
`

export const main = styled.main`
  display: flex;
  flex-direction: column;
  /* width: 70vw; */
  padding: 5px;
`

export const boxChart = styled.div`
  margin-top: 4rem;
`
