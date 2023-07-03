import * as S from './styles'
import Logo from '../../../public/images/logo.svg'

export function Menu() {
  return (
    <S.Container>
      <img alt="logo" src={Logo} />

      <div className="links">
        <S.link to="/home">HOME</S.link>
        <S.link to="/membros">MEMBROS</S.link>
        <S.link to="/new-membro">+ NOVO MEMBRO</S.link>
        <S.link to="/rank">RANK</S.link>
        <S.link to="/presenca">LISTA DE PRESENÇA</S.link>
      </div>
    </S.Container>
  )
}
