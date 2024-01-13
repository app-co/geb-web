import { Form } from '@unform/web'
import React from 'react'
import { BalanceCard } from '../../components/BalanceCard'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { Table } from '../../components/Table'
import { ChartConsumo } from '../../components/charts/ChartConsumo'
import { useAuth } from '../../context/authcontext'
import { IUserDtos } from '../../dtos'
import { useUser } from '../../hooks/querys'
import * as S from './styles'

type TOption = 'metric' | 'config'

export function Membros() {
  const { user } = useAuth()
  const { getAllUser } = useUser(user.hub)

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

  console.log({ option })

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
                  <h3>Alterar Cadastro</h3>
                  <Form
                    initialData={{
                      nome: setUser.nome,
                      membro: setUser.membro,
                    }}
                  >
                    <Input label="Nome" placeholder="Nome" name="nome" />
                    <Input label="Membro" placeholder="Membro" name="membro" />
                    <Input label="Senha" placeholder="Senha" name="senha" />
                  </Form>
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
