import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useRef } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Layout } from '../../components/Layout'
import { Select } from '../../components/Select'
import { api } from '../../services'
import { userRoutes } from '../../services/routes'
import * as S from './styles'

export function NewMembro() {
  const ref = useRef<FormHandles>(null)
  const [selectType, setSelectType] = React.useState('membro')
  const [hub, setHub] = React.useState<string>('GEB')
  const [load, setLoad] = React.useState(false)

  const submit = React.useCallback(
    async (data: any) => {
      setLoad(true)
      try {
        const dt = {
          nome: data.nome,
          membro: data.membro,
          senha: data.senha,
          adm: selectType === 'adm',
          firstLogin: true,
          inativo: false,
          apadrinhado: false,
          qntPadrinho: 0,
          hub,
        }

        await api.post(userRoutes.post.create, dt).then(() => {
          setLoad(false)
          alert('Membro cadastrado')
        })
      } catch (error: any) {
        const err = error?.response?.data?.message
        alert(err)
        setLoad(false)
      }
    },
    [hub, selectType],
  )

  return (
    <Layout>
      <S.Container>
        <Form ref={ref} onSubmit={submit}>
          <div className="content">
            <Input name="nome" label="NOME" />
            <Input name="membro" label="MEMBRO" />
            <Input name="senha" label="SENHA" />

            <Select
              select={() => setSelectType('membro')}
              selected={selectType === 'membro'}
              title="MEMBRO"
            />
            <Select
              select={() => setSelectType('adm')}
              selected={selectType === 'adm'}
              title="ADMIN"
            />

            <S.main>
              <select onChange={(e) => setHub(e.currentTarget.value)}>
                <option value="GEB">GEB</option>
                <option value="CLUB_MENTORIA">CLUB DA MENTORIA</option>
              </select>
            </S.main>
          </div>
        </Form>
        <Button
          onClick={() => ref.current?.submitForm()}
          type="submit"
          className="button"
          title="CADASTRAR"
          bg="submit"
          load={load}
        />
      </S.Container>
    </Layout>
  )
}
