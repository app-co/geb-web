import styled from 'styled-components'

interface I {
  selected: boolean
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(4, 4, 11, 1);
  height: 100vh;

  align-items: center;
  justify-content: center;

  color: #fff;
`
