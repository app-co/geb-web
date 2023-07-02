import styled from 'styled-components'
import { TV } from '.'
import { cor } from '../../styles/color'

interface IProps {
  bg: TV
}

const variant = {
  submit: cor.sucess[1],
  delet: cor.alert[1],
  global: cor.blue[2],
}
export const Container = styled.button<IProps>`
  padding: 10px 20px;
  min-width: calc(5rem + 1.5vw);

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(h) => variant[h.bg]};

  p {
    color: #fff;
    font-weight: 600;
  }
`
