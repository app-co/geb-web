import styled from 'styled-components'

import Modal from 'react-modal'

export const Container = styled(Modal)`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;

  .box {
    display: flex;
    flex-direction: column;
    width: calc(350px + 5vw);
    justify-content: center;
    align-items: center;

    background-color: #4c4c4c79;
    border-radius: 10px;

    backdrop-filter: blur(6px);
    padding: 15px;

    .content {
      margin: 2rem auto;
    }

    .buttons {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
    }
  }
`
