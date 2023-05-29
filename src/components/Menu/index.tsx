import * as S from './styles'

export function Menu() {
  return (
    <S.Container>
      <h1>Geb</h1>

      <S.content>
        <S.link to="/home">Início</S.link>
        <S.link to="/users">Lista de Membros</S.link>
        <S.link to="/create">Cadastrar membro</S.link>
        <S.link>Confirmar presença</S.link>
        <S.link>Lista de presença</S.link>
        <S.link style={{ marginTop: 40 }}>Ordem de B2B</S.link>
        <S.link>Ordem de compra</S.link>
        <S.link>Ordem de venda</S.link>
        <S.link>Ranking</S.link>
      </S.content>
    </S.Container>
  )
}
