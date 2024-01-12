import styled, { css } from 'styled-components'
import { cor } from '../../styles/color'

type PropsInput = {
  isFocus?: boolean
  isFilled?: boolean
  isErro?: boolean
  sizeW?: string
  sizeH?: string
}

export const Box = styled.div<PropsInput>`
  display: flex;
  flex-direction: column;

  .label {
    margin-bottom: -10px;
    font-size: 0.8rem;
    align-self: flex-start;

    color: ${cor.dark[1]};
    font-weight: 900;

    ${(h) =>
    h.isFilled &&
    css`
        color: ${cor.orange[1]}
        font-weight: 500;
      `};
  }
`

export const Container = styled.div<PropsInput>`
  width: 20rem;
  height: 2.3rem;
  padding: 2px 1rem;

  display: flex;
  align-items: center;
  border-radius: 7px;

  background-color: rgba(48, 48, 48, 1);
  margin: 1rem 0;

  ${(h) =>
    h.isFocus &&
    css`
      border: 2px solid ${cor.focus.a};
    `}

  ${(h) =>
    h.isFilled &&
    css`
      border: 2px solid ${cor.focus.a};
    `}

    ${(h) =>
    h.isErro &&
    css`
      border: 2px solid #c90606;
      color: #c90606;
    `}


  input {
    width: 100%;
    height: 100%;
    background: #00000000;
    color: ${cor.bg.light};
  }
`
