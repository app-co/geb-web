import { Form } from '@unform/web'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { FaUserAltSlash } from 'react-icons/fa'
import { BalanceCard } from '../../components/BalanceCard'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { Table } from '../../components/Table'
import { ChartConsumo } from '../../components/charts/ChartConsumo'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/authcontext'
import { IUserDtos } from '../../dtos'
import { useUser } from '../../hooks/querys'
import { api } from '../../services'
import * as S from './styles'

type TOption = 'metric' | 'config'

export function Membros() {
  const { user } = useAuth()
  const { getAllUser } = useUser(user.hub)
  const { addToast } = useToast()

  const [setUser, setUserSl] = React.useState<IUserDtos>()
  const [goback, setGoback] = React.useState<boolean>(true)
  const [option, setOption] = React.useState<TOption>('metric')

  const metrics = React.useMemo(() => {
    const totalPresenca =
      String(
        setUser?.RelationShip.filter((h) => h.type === 'PRESENCA').length,
      ) ?? '0'
    return {
      totalBusines: String(setUser?.RelationShip.length),
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
      })
      .catch((h) => {
        console.log(h)
      })
  }, [setUser?.membro])

  const handleInativateMembro = React.useCallback(async () => {
    await api.put('/situation/update-situation', {
      fk_id_user: setUser?.id,
      inativo: !setUser?.situation.inativo,
    })

    addToast({
      title: 'SUCESSO',
      type: 'success',
      description: 'As alterações foi realizado com sucesso!',
    })
  }, [addToast, setUser?.id, setUser?.situation.inativo])

  return (
    <div>
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
                  <ChartConsumo id={setUser.id} />
                </S.main>
              )}
              {option === 'config' && (
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
                    <Input label="Membro" placeholder="Membro" name="membro" />
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
                    <h3 style={{}}>Banir usuário?</h3>
                  </div>
                  <Button bg="delet" title="BANIR" />

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

                  <Button bg="delet" title="DELETAR" />
                </S.form>
              )}
            </S.Container>
          ) : (
            <div>
              <Table
                getAllUsers={getAllUser!}
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
