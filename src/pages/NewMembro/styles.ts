import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 90vh;

  .content {
    display: flex;
    flex-direction: column;

    background-color: #0d156a58;
    padding: 3rem;
    border-radius: 8px;
    box-shadow: 5px 5px 10px #ffffff73;

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
