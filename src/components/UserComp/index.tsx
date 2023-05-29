import { IUserDtos } from '../../dtos'
import * as S from './styles'
import { Star } from '../Star'

interface Props {
  situation: boolean
  edit: () => void
  delet: () => void
  create: () => void
  inativar: () => void
  user: IUserDtos
}

export function UserComp({
  edit,
  situation,
  inativar,
  delet,
  create,
  user,
}: Props) {
  return (
    <S.Container inativo={situation}>
      <S.grid>
        <S.avatarBox>
          <S.avatar src={user?.profile?.avatar} />
          <p>
            Nome: <span>{user?.nome}</span>{' '}
          </p>

          <p>
            Membro: <span>{user?.membro}</span>{' '}
          </p>
        </S.avatarBox>

        <S.elements>
          <Star value={user.media} />
        </S.elements>
      </S.grid>

      <S.box>
        <S.button onClick={delet} cor="delete">
          <S.textButton>Deletar</S.textButton>
        </S.button>

        <S.button onClick={inativar} cor={situation ? 'salve' : 'delete'}>
          <S.textButton>{situation ? 'ATIVAR' : 'INATIVAR'}</S.textButton>
        </S.button>

        <S.button onClick={create} cor="edit">
          <S.textButton>ADICIONAR CONVIDADO </S.textButton>
        </S.button>

        <S.button onClick={edit} cor="edit">
          <S.textButton>Editar</S.textButton>
        </S.button>

        {/* <S.button cor="salve">
          <S.textButton>salvar</S.textButton>
        </S.button> */}
      </S.box>
    </S.Container>
  )
}
