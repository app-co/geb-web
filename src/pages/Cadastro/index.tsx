import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Menu } from '../../components/Menu'
import * as S from './styles'

export function Cadastro() {
  return (
    <S.Container>
      <Menu />

      <Form onSubmit={() => {}} style={{ width: '100%' }}>
        <S.box>
          <Input name="nome" />
          <Input name="membro" />
          <Input name="senha" />

          <S.checkBox type="checkbox" />
          <S.checkBox type="checkbox" />
        </S.box>
      </Form>
    </S.Container>
  )
}
