import styled from 'styled-components'
import { cor } from '../../styles/color'

export type colors = 'delete' | 'edit' | 'salve'

interface Props {
  cor: colors
}

interface PropsSituation {
  inativo: boolean
}

const variant = {
  delete: cor.alert[1],
  edit: cor.orange[1],
  salve: cor.sucess[1],
}

export const Container = styled.div<PropsSituation>`
  width: 40vw;

  display: flex;
  flex-direction: column;
  background-color: ${(h) => (h.inativo ? cor.alert[3] : cor.dark[1])};
  padding: 20px;
  border-radius: 10px;
  color: ${(h) => (h.inativo ? '#fff' : '#030c18')};

  margin-bottom: 10px;

  span {
    font-weight: 600;
  }
`

export const grid = styled.div`
  display: flex;
  flex-direction: column;
`

export const title = styled.h3``

export const subTitle = styled.p``

export const box = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-top: 10px;
`

export const button = styled.button<Props>`
  padding: 4px 15px;
  width: 10rem;
  height: 3rem;
  background-color: ${(h) => variant[h.cor]};

  &:hover {
    opacity: 0.8;
  }
`

export const textButton = styled.p`
  color: #fff;
  font-size: calc(0.5rem + 0.5vw);
`

export const avatarBox = styled.div`
  width: 100%;
`

export const avatar = styled.img`
  border-radius: 5px;
  width: calc(40px + 5vw);
  height: calc(40px + 5vw);
  background-color: #c4c4c4;
`

export const elements = styled.div``
