import styled from 'styled-components'

interface I {
  selected: boolean
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: rgba(4, 4, 11, 1);
  height: 100vh;
`

export const colum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(352px + 5vw);
  height: 824px;
  border-radius: 12px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(27, 14, 106, 0.2) 100%
  );

  top: 50%;
  position: fixed;
  transform: translate(10%, -50%);
  padding: 10px 2rem;

  @media (max-width: 370px) {
  }

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const boxUser = styled.button<I>`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem auto;
  width: 100%;
  background-color: ${(h) =>
    h.selected ? 'rgba(114, 121, 161, 0.494)' : 'rgba(173, 173, 173, 0.494)'};
  padding: 10px 5px;

  &:hover {
    background-color: rgba(114, 121, 161, 0.494);
  }

  .box {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 999px;
    background-color: #fff;
  }

  .content {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
  }

  .line {
    flex: 1;
    border-bottom: 2px solid #fff;
    margin-top: 1rem;
  }
`

export const content = styled.div`
  flex: 1;
  border-radius: 0.5rem;
  margin-left: 30rem;

  padding: 2rem;

  /* overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  } */

  .buttons {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .scroll {
    flex: 1;
    overflow: scroll;
    height: 78vh;
    margin-top: 0.5rem;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    grid-gap: 1rem;

    border-radius: 0.5rem;
  }
`
