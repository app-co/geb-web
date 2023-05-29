import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

export const box = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${cor.dark[1]};
`

export const checkBox = styled.input`
  font-size: 30px;
  width: 30px;
  height: 30px;
`

export const boxH = styled.div`
  display: flex;
  width: 10vw;
`
