import { Form } from '@unform/web'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { FaUserAltSlash } from 'react-icons/fa'
import { BalanceCard } from '../../components/BalanceCard'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { Modal } from '../../components/Modal'
import { Table } from '../../components/Table'
import { ChartConsumo } from '../../components/charts/ChartConsumo'
import { useToast } from '../../context/ToastContext'
import { IRelation, IUserDtos } from '../../dtos'
import { useGlobalMetric } from '../../hooks/querys'
import { api } from '../../services'
import { fetchGlobalMetric } from '../../services/requests'
import * as S from './styles'

type TOption = 'metric' | 'config'

interface IUserSlected {
  id: string
  nome: string
  membro: string
  created: string
  presenca: string
  workname: string
  relations: IRelation[]
  situation: {
    apadrinhado: boolean
    firstLogin: boolean
    inativo: boolean
    logado: boolean
  }
}

export function Membros() {
  const { getGlobalMetrinc, refetch } = useGlobalMetric()
  const { addToast } = useToast()

  const [setUser, setUserSl] = React.useState<IUserSlected>()
  const [goback, setGoback] = React.useState<boolean>(true)
  const [option, setOption] = React.useState<TOption>('metric')
  const [modalDelete, setModalDelete] = React.useState<boolean>(false)
  const [loadPres, setLoadPres] = React.useState<boolean>(false)

  const metrics = React.useMemo(() => {
    const totalPresenca =
      String(setUser?.relations.filter((h) => h.type === 'PRESENCA').length) ??
      '0'
    return {
      totalBusines: String(setUser?.relations.length),
      totalPresenca,
    }
  }, [setUser])

  const handleUpateMembro = React.useCallback(
    async (data: IUserDtos) => {
      const { nome, membro, senha } = data

      try {
        const dados = {
          nome,
          membro,
          senha: senha ?? null,
          id: setUser?.id,
        }

        await api.patch('/user/update-membro', dados)

        addToast({
          title: 'SUCESSO',
          type: 'success',
          description: 'As alterações foi realizado com sucesso!',
        })
      } catch (err) {
        addToast({
          title: 'Erro',
          type: 'error',
          description: 'Ocorreu um erro ao realizar sua configurção',
        })
        console.log('erro', err)
      }
    },
    [addToast, setUser?.id],
  )

  const handleDeleteUser = React.useCallback(async () => {
    await api
      .delete(`/user/delete/${setUser?.membro}`)
      .then(() => {
        alert('Membro deletado')
        setGoback(!goback)
        setModalDelete(false)
      })
      .catch((h) => {
        console.log(h.response.data)
      })
  }, [goback, setUser?.membro])

  const handleAddPress = React.useCallback(async () => {
    setLoadPres(true)
    await api.post('/pres', {
      userId: setUser?.id,
    })

    const getUser = await fetchGlobalMetric()
    const user = getUser.getUsers.find((h) => h.id === setUser!.id)

    await refetch()
    setUserSl(user)
    setLoadPres(false)
  }, [refetch, setUser])

  const handleInativateMembro = React.useCallback(async () => {
    const { inativo } = setUser!.situation
    setLoadPres(true)
    await api.put('/situation/update-situation', {
      fk_id_user: setUser?.id,
      inativo: !inativo,
    })

    await refetch()

    addToast({
      title: 'SUCESSO',
      type: 'success',
      description: 'As alterações foi realizado com sucesso!',
    })
    setGoback(!goback)
    setLoadPres(false)
  }, [addToast, goback, refetch, setUser])

  return (
    <div>
      <Modal
        submit={handleDeleteUser}
        cancel={() => setModalDelete(false)}
        isOpen={modalDelete}
        title="Você tem certeza que deseja deletar este usuário?"
      />

      <Layout>
        <div>
          {setUser && goback ? (
            <S.Container>
              <S.heder>
                <S.textMenu
                  selected={option === 'metric'}
                  onClick={() => setOption('metric')}
                >
                  Métricas
                </S.textMenu>

                <S.textMenu
                  selected={option === 'config'}
                  onClick={() => setOption('config')}
                >
                  Configurações
                </S.textMenu>

                <Button title="VOLTAR" onClick={() => setGoback(!goback)} />
              </S.heder>

              {option === 'metric' && (
                <S.main>
                  <S.gridCardBalanc>
                    <BalanceCard
                      title="TOTAL DE NEGÓCIOS"
                      valu={metrics?.totalBusines}
                    >
                      <span>ico</span>
                    </BalanceCard>
                    <BalanceCard
                      title="TOTAL DE PRESENÇA"
                      valu={metrics?.totalPresenca}
                    >
                      <span>ico</span>
                    </BalanceCard>
                  </S.gridCardBalanc>
                  <div style={{ marginTop: '4rem' }}>
                    <ChartConsumo id={setUser.id} />
                  </div>
                </S.main>
              )}
              {option === 'config' && (
                <S.grid>
                  <S.form>
                    <h3 style={{ marginBottom: '2rem' }}>Alterar Cadastro</h3>
                    <Form
                      onSubmit={handleUpateMembro}
                      initialData={{
                        nome: setUser.nome,
                        membro: setUser.membro,
                      }}
                    >
                      <Input label="Nome" placeholder="Nome" name="nome" />
                      <Input
                        label="Membro"
                        placeholder="Membro"
                        name="membro"
                      />
                      <Input label="Senha" placeholder="Senha" name="senha" />

                      <Button type="submit" title="SALVAR" />
                    </Form>

                    <div
                      style={{
                        alignItems: 'center',
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '15px',
                        marginBottom: '10px;',
                      }}
                    >
                      <FaUserAltSlash />
                      <h3 style={{}}>
                        {setUser.situation.inativo
                          ? 'Restaurar Usuário'
                          : 'Banir usuário?'}
                      </h3>
                    </div>
                    <Button
                      onClick={handleInativateMembro}
                      bg="delet"
                      title={setUser.situation.inativo ? 'RESTAURAR' : 'BANIR'}
                      load={loadPres}
                    />

                    <div
                      style={{
                        alignItems: 'center',
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '15px',
                        marginBottom: '10px;',
                      }}
                    >
                      <BsTrash />
                      <h3>Deletar usuário?</h3>
                    </div>

                    <Button
                      onClick={() => setModalDelete(true)}
                      bg="delet"
                      title="DELETAR"
                    />
                  </S.form>

                  <div className="add">
                    <h3>Adicione presença </h3>
                    <h4 style={{ color: '#fff', fontWeight: 300 }}>
                      {setUser.presenca}
                    </h4>

                    <div onClick={handleAddPress} className="button-add">
                      {loadPres ? <p>carregando...</p> : <p>adionar</p>}
                    </div>
                  </div>
                </S.grid>
              )}
            </S.Container>
          ) : (
            <div>
              <Table
                getAllUsers={getGlobalMetrinc!.getUsers!}
                userSelectd={(h) => {
                  setUserSl(h)
                  setGoback(!goback)
                }}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}
