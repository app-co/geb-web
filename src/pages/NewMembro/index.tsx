import { Form } from '@unform/web'
import { Menu } from '../../components/Menu'
import * as S from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import React, { useRef } from 'react'
import { Select } from '../../components/Select'
import { api } from '../../services'
import { userRoutes } from '../../services/routes'
import { FormHandles } from '@unform/core'

export function NewMembro() {
  const ref = useRef<FormHandles>(null)
  const [selectType, setSelectType] = React.useState('membro')
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
    [selectType],
  )

  return (
    <>
      <Menu />
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
    </>
  )
}
