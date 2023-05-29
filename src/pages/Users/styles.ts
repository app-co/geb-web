import styled from 'styled-components'
import Modal from 'react-modal'
import { cor } from '../../styles/color'

export type colors = 'delete' | 'edit' | 'salve'

interface Props {
  cor: colors
}

const variant = {
  delete: cor.alert[1],
  edit: cor.orange[1],
  salve: cor.sucess[1],
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  height: 100vh;
`

export const content = styled.div`
  display: flex;
  flex-direction: column;
`

export const box = styled.div`
  width: 100%;
  padding: 4vw;
  height: 70vw;

  overflow: scroll;
`

export const modal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  background-color: ${cor.blue[3]};
  border-radius: 10px;
  padding: 1rem 3rem;
`

export const contentMOdal = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
  color: #fff;
`
export const button = styled.button<Props>`
  background-color: ${(h) => variant[h.cor]};
  padding: 5px 30px;
`

export const boxButton = styled.div`
  display: flex;
  width: 100%;

  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
`
export const boxCreateUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`
