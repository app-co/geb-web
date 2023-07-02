import * as S from './styles'
import { Button } from '../../components/Button'
import { ChartPresenca } from '../../components/charts/ChartPresenca'
import { ChartB2b } from '../../components/charts/ChartB2b'
import { ChartConsumo } from '../../components/charts/ChartConsumo'
import { ChartPadrinho } from '../../components/charts/ChartPadrinho'
import { ChartIndicacao } from '../../components/charts/ChartIndicacao'
import { ChartDonate } from '../../components/charts/ChartDonate'
import { ChartInvit } from '../../components/charts/ChartInvit'
import { useQuery } from 'react-query'
import { api } from '../../services'
import { userRoutes } from '../../services/routes'
import { IUserDtos } from '../../dtos'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import React from 'react'
import { Modal } from '../../components/Modal'
import { EditUser } from '../../components/EditUser'

export function Home() {
  const [search, setSearch] = React.useState('')
  const [selectId, setSelectId] = React.useState('')
  const [openModa, setOpenModal] = React.useState(false)
  const user = useQuery('list-all-user', async () => {
    const rs = await api.get(userRoutes.get['list-all'])
    return rs.data as IUserDtos[]
  })

  const users = React.useMemo(() => {
    const us = (user.data as IUserDtos[]) || []

    const list =
      search !== ''
        ? us.filter((h) => {
            const nome = h.nome.toLocaleUpperCase()
            if (nome.includes(search.toLocaleUpperCase())) {
              return h
            }
            return null
          })
        : us

    return list
  }, [search, user.data])

  const userById = React.useMemo(() => {
    const us = user.data || []

    return us.find((h) => h.id === selectId)
  }, [selectId, user.data])

  if (user.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>CARREGANDO...</h1>
      </div>
    )
  }

  const handleEdit = React.useCallback(async () => {}, [])

  return (
    <S.Container>
      <Modal
        cancel={() => setOpenModal(false)}
        isOpen={openModa}
        title="EDITAR MEMBRO"
      >
        <Form
          initialData={{
            nome: userById?.nome,
            membro: userById?.membro,
          }}
        >
          <EditUser />
        </Form>
      </Modal>

      <S.colum>
        <Form onSubmit={() => {}} style={{ position: 'relative' }}>
          <Input
            onChange={(h) => setSearch(h.currentTarget.value)}
            name="search"
            placeholder="pesquisar por nome"
          />
        </Form>
        {users.map((h) => (
          <S.boxUser
            selected={h.id === selectId}
            onClick={() => setSelectId(h.id)}
            key={h.id}
          >
            <div className="box">
              <img className="avatar" alt="avata" src={h.profile.avatar} />

              <div className="content">
                <h3>{h.nome}</h3>
                <p>{h.profile.workName}</p>
              </div>
            </div>
          </S.boxUser>
        ))}
      </S.colum>

      <S.content>
        <div className="buttons">
          <Button
            onClick={() => setOpenModal(true)}
            title="EDITAR MEMBRO"
            bg="global"
          />
          <Button title="INATIVAR MEMBRO" bg="submit" />
          <Button title="DELETAR MEMBRO" bg="delet" />
        </div>

        <h4 style={{ color: '#fff', marginTop: '2rem' }}>
          Membro: {userById?.nome}
        </h4>
        <div className="scroll">
          <div className="grid">
            <ChartPresenca id={selectId} />
            <ChartB2b id={selectId} />
            <ChartConsumo id={selectId} />
            <ChartPadrinho id={selectId} />
            <ChartIndicacao id={selectId} />
            <ChartDonate id={selectId} />
            <ChartInvit id={selectId} />
          </div>
        </div>
      </S.content>
    </S.Container>
  )
}
