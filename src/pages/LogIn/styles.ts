import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  display: flex;
  width: 100vw;

`

export const content = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const boxLogo = styled.div`
  /* background-color: ${cor.blue[3]}; */
`

export const boxForm = styled.div`
  background-color: ${cor.dark[1]};

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
`
export const buton = styled.button`
  background-color: ${cor.blue[2]};
  width: 100%;
  padding: 5px 0;
  height: 3rem;
  color: #fff;
`
