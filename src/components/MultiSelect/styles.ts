import styled, { css } from 'styled-components';
import { cor } from '../../styles/color';

interface IShowOptions {
  show: boolean
}

export const Container = styled.div<IShowOptions>`
  border-radius: 25px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  min-width: 350px;
  max-width: 550px;
  position: fixed;
  background-color: ${cor.dark[1]};

  ${h => h.show && css`
    height: 200px;
    overflow: scroll;

    padding-bottom: 30px;
  `}


`;

export const line = styled.div<IShowOptions>`
  width: 100%;
  height: 1px;
`

export const option = styled.div<IShowOptions>`
  display: ${h => h.show ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 99;

  background-color: #fff;
  border-radius: 25px;
  width: 100%;
  align-items: center;
  padding: 5px;
  transition: .3s;
  margin-top: 5px;

  :hover {
    background-color: #efefef;
    cursor: pointer;
    opacity: 0.8;
  }
`
export const curretOption = styled.div` 
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0 10px;
  gap: 7rem;
`
