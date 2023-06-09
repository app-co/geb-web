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
import React, { useRef } from 'react'
import { Modal } from '../../components/Modal'
import { EditUser } from '../../components/EditUser'
import { FormHandles } from '@unform/core'
import { Loading } from '../../components/Loading'
import { Menu } from '../../components/Menu'

export function Membros() {
  const updateRef = useRef<FormHandles>(null)
  const [search, setSearch] = React.useState('')
  const [selectId, setSelectId] = React.useState('')
  const [openModa, setOpenModal] = React.useState(false)
  const [load, setLoad] = React.useState(false)
  const user = useQuery('list-all-user', async () => {
    const rs = await api.get(userRoutes.get['list-all'])
    return rs.data as IUserDtos[]
  })

  const users = React.useMemo(() => {
    const us = (user.data as IUserDtos[]) || []

    const newList = us.map((h) => {
      const [nome, sobrenome] = h.nome.split(' ').map(String)
      console.log(nome, sobrenome)

      return {
        ...h,
        nome: nome + ' ' + sobrenome,
      }
    })

    const list =
      search !== ''
        ? newList.filter((h) => {
            const nome = h.nome.toLocaleUpperCase()
            if (nome.includes(search.toLocaleUpperCase())) {
              return h
            }
            return null
          })
        : newList

    return list
  }, [search, user.data])

  const userById = React.useMemo(() => {
    const us = user.data || []

    return us.find((h) => h.id === selectId)
  }, [selectId, user.data])

  const handleUpateMembro = React.useCallback(
    async (data: IUserDtos) => {
      const { nome, membro, senha } = data
      setLoad(true)
      if (selectId === '') {
        setLoad(false)
        return alert('Selecione um membro para poder ediatar')
      }
      try {
        const dados = {
          nome,
          membro,
          senha,
          id: selectId,
        }

        await api.post('/user/update-membro', dados).then((h) => {
          setLoad(false)
          setOpenModal(false)
        })
      } catch (err) {
        setLoad(false)
        console.log('erro', err)
      }
    },
    [selectId],
  )

  const handleDeleteUser = React.useCallback(async () => {
    setLoad(true)
    await api
      .delete(`${userRoutes.delete['delete-user']}/${userById?.membro}`)
      .then(() => {
        alert('Membro deletado')
        setLoad(false)
        setSearch('')
      })
      .catch((h) => {
        console.log(h)
        setLoad(false)
      })
  }, [userById?.membro])

  const handleInativateMembro = React.useCallback(async () => {
    await api
      .put('/situation/update-situation', {
        fk_id_user: userById?.id,
        inativo: !userById?.situation.inativo,
      })
      .then(() => {
        user.refetch()
      })
  }, [userById])

  if (user.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>CARREGANDO...</h1>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <Menu />
      <S.Container>
        <Form
          ref={updateRef}
          onSubmit={handleUpateMembro}
          initialData={{
            nome: userById?.nome,
            membro: userById?.membro,
          }}
        >
          <Modal
            submit={() => updateRef.current?.submitForm()}
            cancel={() => setOpenModal(false)}
            isOpen={openModa}
            title="EDITAR MEMBRO"
            load={load}
          >
            <EditUser />
          </Modal>
        </Form>

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
              inativit={h.situation.inativo}
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
            <Button
              onClick={handleInativateMembro}
              title={
                userById?.situation.inativo
                  ? 'REATIVAR MEMBRO'
                  : 'INATIVAR MEMBRO'
              }
              bg="submit"
            />
            <Button
              load={load}
              onClick={handleDeleteUser}
              title="DELETAR MEMBRO"
              bg="delet"
            />
          </div>

          <h4 style={{ color: '#fff', marginTop: '2rem' }}>
            Performace de: {userById?.nome}
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
    </div>
  )
}
