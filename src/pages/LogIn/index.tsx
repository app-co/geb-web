import React, { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { useAuth } from '../../context/authcontext'
import { useToast } from '../../context/ToastContext'
import * as S from './styles'
import * as Yup from 'yup'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'

export function LogIn() {
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const nv = useNavigate()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = React.useCallback(
    async (data: any) => {
      formRef.current?.setErrors({})

      try {
        const schema = Yup.object().shape({
          membro: Yup.string().required(),
          senha: Yup.string().required(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          membro: data.membro,
          senha: data.senha,
        })

        nv('/home')
      } catch (err: any) {
        const msn = err.response?.data
          ? err.response.data.message
          : 'Ocorreu um erro ao realizar seu cadastro, verifique suas credenciais ou sua conexão com a rede'
        addToast({
          type: 'error',
          title: 'Erro ao realizar o cadastro',
          description: msn,
        })

        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [addToast, nv, signIn],
  )
  return (
    <S.Container>
      <S.content>
        <S.boxForm>
          <h1>GEB NETWORKING</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="membro" mask="text" label="Membro" />
            <Input name="senha" label="Senha" />

            <S.buton type="submit">
              <p>Entrar</p>
            </S.buton>
          </Form>
        </S.boxForm>

        <S.boxLogo>
          <h1>logo</h1>
        </S.boxLogo>
      </S.content>

      <Outlet />
    </S.Container>
  )
}
