import { Form } from '@unform/web'
import React from 'react'
import { BalanceCard } from '../../components/BalanceCard'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { Table } from '../../components/Table'
import { ChartConsumo } from '../../components/charts/ChartConsumo'
import { useToast } from '../../context/ToastContext'
import { IRelation, IUserDtos } from '../../dtos'
import { api } from '../../services'
import { fetchGlobalMetric } from '../../services/requests'
import * as S from './styles'
import { make } from '../../hooks'
import { IUser } from '../../hooks/dto/interfaces'
import { TUser } from '../../hooks/dto/types'
import { InputSelect } from '../../components/MultiSelect'
import { isTemplateExpression } from 'typescript'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Butto from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BsTrash } from 'react-icons/bs'
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

const { mutations } = make()

const hubs = [
  {
    label: 'GEB Networking',
    value: '0',
  },
  {
    label: 'Club da Mentoria',
    value: '1',
  }
]

export function Membros() {
  const { addToast } = useToast()



  const [userSelected, setUserSl] = React.useState<IUser>()
  const [goback, setGoback] = React.useState<boolean>(true)
  const [option, setOption] = React.useState<TOption>('metric')
  const [modalDelete, setModalDelete] = React.useState<boolean>(false)
  const [loadPres, setLoadPres] = React.useState<boolean>(false)
  const [hub, setHub] = React.useState<{ label: string, value: string }[]>([])

  const { mutateAsync: upUser, isLoading: loadUpUser } = mutations.updateUser()
  const { mutateAsync: deleteUser, isLoading: loadDeleteUser } = mutations.deleteUser()

  const metrics = React.useMemo(() => {

    return {
      totalBusines: String(10),
      totalPresenca: 10,
    }
  }, [userSelected])

  const handleUpateMembro = React.useCallback(
    async (data: TUser) => {
      const { nome, apelido, senha } = data

      try {
        const dados: TUser = {
          nome,
          apelido,
          senha: senha ?? null,
          id: userSelected!.id,
          hub: hub.map(h => Number(h.value)),
          adm: userSelected!.adm,
          apadrinhado: userSelected!.apadrinhado
        }

        await upUser(dados)

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
    [hub, userSelected?.id],
  )

  const handleDeleteUser = React.useCallback(async () => {
    try {
      await deleteUser(userSelected!.id)
      setModalDelete(false)
      setGoback(!goback)
    } catch (error) {
      alert('Erro ao deletar usuário')
    }
  }, [goback, userSelected?.apelido])

  const handleAddPress = React.useCallback(async () => {
    setLoadPres(true)
    await api.post('/pres', {
      userId: userSelected?.id,
    })

    const getUser = await fetchGlobalMetric()
    const user = getUser.getUsers.find((h) => h.id === userSelected!.id) as any

    setUserSl(user)
    setLoadPres(false)
  }, [userSelected])

  React.useEffect(() => {
    const hb = userSelected?.hub.map(h => {
      const label = hubs.find(p => p.value === String(h))
      return {
        label: label?.label ?? 'GEB Networking',
        value: String(h) ?? '0',
      }
    }) ?? []
    setHub(hb)
  }, [])


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Modal
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja deletar este membro?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }} >
            <Button bg='delet' title="NÃO" onClick={() => setModalDelete(false)} />
            <Button title="SIM" onClick={handleDeleteUser} />
          </div>
        </Box>
      </Modal>
      <Layout>
        <div>
          {userSelected && goback ? (
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
                      valu={'10'}
                    >
                      <span>ico</span>
                    </BalanceCard>
                  </S.gridCardBalanc>
                  <div style={{ marginTop: '4rem' }}>
                    <ChartConsumo id={userSelected?.id} />
                  </div>
                </S.main>
              )}

              {option === 'config' && (
                <S.grid>
                  <S.form>
                    <h3 style={{ marginBottom: '2rem' }}>Alterar Cadastro</h3>
                    <Form
                      placeholder={'undefined'} onPointerEnterCapture={'undefined'} onPointerLeaveCapture={'undefined'}
                      onSubmit={handleUpateMembro}
                      initialData={{
                        nome: userSelected.nome,
                        apelido: userSelected.apelido,
                      }}
                    >
                      <Input label="Nome" placeholder="Nome" name="nome" />
                      <Input
                        label="Apelido"
                        placeholder="Apelido"
                        name="apelido"
                      />
                      <Input label="Senha" placeholder="Senha" name="senha" />

                      <div style={{ marginBlock: 20, gap: 8, display: 'flex', flexDirection: 'column' }} >
                        <h3>Adicione o membro ao HUB</h3>

                        <InputSelect
                          options={hubs}
                          value={hub}
                          onChange={h => setHub(h)}
                        />
                      </div>

                      <Button type="submit" title="SALVAR" />
                    </Form>

                    {/* <div
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
                        {'Banir usuário?'}
                      </h3>
                    </div>
                    <Button
                      onClick={handleInativateMembro}
                      bg="delet"
                      title={'BANIR'}
                      load={loadPres}
                    /> */}

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
                      {0}
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
