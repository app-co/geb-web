import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${cor.bg.dark};

  align-items: center;
  justify-content: center;
  height: 90vh;

  .content {
    display: flex;
    flex-direction: column;

    background-color: ${cor.bg.light};
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 4px 3px 3px #ebe8859b;

    .chek {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #fff;
      width: 7rem;
      justify-content: space-between;
      input {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .button {
    margin-top: 2rem;
  }
`

export const main = styled.div`
  select {
    padding: 5px;
    margin-top: 2rem;
  }
`
