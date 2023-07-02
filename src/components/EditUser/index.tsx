import { Input } from '../Input'
import * as S from './styles'

export function EditUser() {
  return (
    <S.Container>
      <Input label="Nome" name="nome" />
      <Input label="Membro" name="membro" />
      <Input label="Senha" name="senha" />
    </S.Container>
  )
}
