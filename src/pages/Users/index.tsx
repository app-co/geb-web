import React, { useRef } from 'react'
import { Menu } from '../../components/Menu'
import { UserComp } from '../../components/UserComp'
import * as S from './styles'
import { Input } from '../../components/Input'
import { Form } from '@unform/web'
import { api } from '../../services'
import { IStars, IUserDtos } from '../../dtos'
import { useQuery } from 'react-query'
import { FormHandles } from '@unform/core'

type State = {
  user: IUserDtos
  modal: boolean
}

interface ModalInvit {
  modal: boolean
  id: string
}

interface PropsGuest {
  name_convidado: string
}

export function Users() {
  const refUpdade = useRef<FormHandles>(null)
  const refAdd = useRef<FormHandles>(null)

  const [modalDelet, setModalDelet] = React.useState({
    membro: '',
    modal: false,
  })

  const [search, setSearch] = React.useState('')
  const [showModal, setShowModal] = React.useState<State>({
    modal: false,
    user: {} as IUserDtos,
  })

  const [modalInvit, setModalInvit] = React.useState<ModalInvit>({
    modal: false,
    id: '',
  })

  const { data, isLoading, isError, refetch } = useQuery('users', async () => {
    const data = await api.get('user/list-all-user')
    return data.data
  })

  const handleUpateMembro = React.useCallback(
    async (data: IUserDtos) => {
      const { nome, membro, senha } = data
      try {
        const dados = {
          nome,
          membro,
          senha,
          id: showModal.user.id,
        }

        await api.post('/user/update-membro', dados).then((h) => {
          setShowModal({ user: {} as IUserDtos, modal: false })
        })
      } catch (err) {
        console.log('erro', err)
      }
    },
    [showModal.user.id],
  )

  const handleCreateInvit = React.useCallback(
    async (data: PropsGuest) => {
      console.log(modalInvit.id, data.name_convidado)

      await api
        .post('guest/create-guest', {
          fk_user_id: modalInvit.id,
          name_convidado: data.name_convidado,
        })
        .then((h) => {
          alert('Convidado cadastrado')
          setModalInvit({ id: '', modal: false })
        })
        .catch((h) => console.log(h.response))
    },
    [modalInvit.id],
  )

  const handleDelet = React.useCallback(
    async (user: string) => {
      await api.delete(`user/delete/${user}`).then((h) => {
        alert('Usuário deletado')
        refetch()
        setModalDelet({ membro: '', modal: false })
      })
    },
    [refetch],
  )

  const handleInativo = React.useCallback(
    async (id: string, inativo: boolean) => {
      await api
        .put('/situation/update-situation', {
          inativo: !inativo,
          fk_id_user: id,
        })
        .then(() => {
          refetch()
        })

      console.log(id, inativo)
    },
    [refetch],
  )

  const users =
    search.length > 0
      ? data?.filter((h: IUserDtos) => {
          const up = h.nome.toLocaleUpperCase()
          return up.includes(search.toLocaleUpperCase())
        })
      : data

  const list = React.useMemo(() => {
    const us: IUserDtos[] = []
    users?.forEach((user: IUserDtos) => {
      let total = 1
      if (user?.Stars) {
        total = user?.Stars?.length === 0 ? 1 : user?.Stars?.length
      } else {
        total = 1
      }
      let star = 0

      user?.Stars?.forEach((h: IStars) => {
        star += h.star
      })
      const md = star / total
      const value = Number(md.toFixed(0)) === 0 ? 5 : Number(md.toFixed(0))

      const data = {
        ...user,
        media: value,
      }

      us.push(data)
    })

    const rs = us.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1
      }
      return 1
    })

    return rs
  }, [users])

  React.useEffect(() => {
    refetch()
  }, [refetch, showModal.modal])

  return (
    <S.Container>
      <Menu />

      <S.content>
        <Form onSubmit={() => {}}>
          <Input
            name="search"
            onChange={(h) => setSearch(h.currentTarget.value)}
            placeholder="Pesquisar por nome"
          />
        </Form>

        <S.modal isOpen={showModal.modal}>
          <S.contentMOdal>
            <Form
              ref={refUpdade}
              onSubmit={handleUpateMembro}
              initialData={{
                nome: showModal.user.nome,
                membro: showModal.user.membro,
              }}
            >
              <Input placeholder="nome" label="Nome" name="nome" />
              <Input
                placeholder="digite o apelido do membro"
                label="Membro"
                name="membro"
              />
              <Input
                placeholder="digite a nova senha"
                label="Nova senha"
                name="senha"
              />

              <S.boxButton>
                <S.button
                  cor="delete"
                  onClick={() =>
                    setShowModal({ user: {} as IUserDtos, modal: false })
                  }
                >
                  <p>Fechar</p>
                </S.button>

                <S.button cor="salve" type="submit">
                  <p>Salvar</p>
                </S.button>
              </S.boxButton>
            </Form>
          </S.contentMOdal>
        </S.modal>

        <S.modal isOpen={modalInvit.modal}>
          <S.contentMOdal>
            <Form ref={refAdd} onSubmit={handleCreateInvit}>
              <Input
                placeholder="digite o nome do convidado"
                label="Convidado"
                name="name_convidado"
              />

              <S.boxButton>
                <S.button
                  cor="delete"
                  onClick={() => setModalInvit({ id: '', modal: false })}
                >
                  <p>Fechar</p>
                </S.button>

                <S.button cor="salve" type="submit">
                  <p>Salvar</p>
                </S.button>
              </S.boxButton>
            </Form>
          </S.contentMOdal>
        </S.modal>

        <S.modal isOpen={modalDelet.modal}>
          <S.contentMOdal>
            <h3>Tem certeza que deseja excluir esse mebro?</h3>
            <S.boxButton>
              <S.button
                cor="delete"
                onClick={() => handleDelet(modalDelet.membro)}
              >
                <p>DELETAR</p>
              </S.button>

              <S.button
                cor="salve"
                onClick={() => setModalDelet({ modal: false, membro: '' })}
              >
                <p>CANCELAR</p>
              </S.button>
            </S.boxButton>
          </S.contentMOdal>
        </S.modal>

        <S.box>
          {list.map((h) => (
            <div key={h.id}>
              <UserComp
                situation={h.situation.inativo}
                inativar={() => handleInativo(h.id, h.situation.inativo)}
                user={h}
                edit={() => setShowModal({ modal: true, user: h })}
                delet={() => {
                  setModalDelet({ membro: h.membro, modal: true })
                }}
                create={() => setModalInvit({ modal: true, id: h.id })}
              />
            </div>
          ))}
        </S.box>
      </S.content>
    </S.Container>
  )
}
