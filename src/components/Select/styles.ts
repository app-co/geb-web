import styled from 'styled-components'
import { cor } from '../../styles/color'

interface I {
  selected: boolean
}
export const Container = styled.div<I>`
  display: flex;
  align-items: center;
  width: 7rem;
  justify-content: space-between;
  color: ${cor.orange[1]};

  & + div {
    margin-top: 0.8rem;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  .circle {
    background-color: #fff;
    display: flex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;

    .dot {
      background-color: ${(h) => (h.selected ? cor.dark[3] : '#fff')};
      display: flex;
      width: 1rem;
      height: 1rem;

      border-radius: 2rem;
    }
  }
`
