import Logo from '../../../public/images/logo.png'
import { Button } from '../Button'
import * as S from './styles'

export function Menu() {
  return (
    <S.Container>
      <img alt="logo" src={Logo} />

      <Button>SAIR</Button>
    </S.Container>
  )
}
