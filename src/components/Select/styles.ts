import styled from 'styled-components'
import { cor } from '../../styles/color'

interface I {
  selected: boolean
}
export const Container = styled.div<I>`
  display: flex;
  align-items: center;
  max-width: 5rem;
  justify-content: space-between;
  color: ${cor.bg.dark};

  & + div {
    margin-top: 0.8rem;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  .circle {
    border: 2px solid ${cor.bg.dark};
    display: flex;
    width: 1rem;
    height: 1rem;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;

    .dot {
      background-color: ${(h) => (h.selected ? cor.bg.dark : '#ffffff00')};
      display: flex;
      width: 0.5rem;
      height: 0.5rem;

      border-radius: 2rem;
    }
  }
`
