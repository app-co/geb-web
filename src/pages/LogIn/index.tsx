import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/authcontext'
import * as S from './styles'
import logo from '../../../public/images/logo.png'

export function LogIn() {
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const nv = useNavigate()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = React.useCallback(
    async (data: any) => {
      console.log(data)

      formRef.current?.setErrors({})

      try {
        const schema = Yup.object().shape({
          apelido: Yup.string().required(),
          senha: Yup.string().required(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          apelido: data.apelido,
          senha: data.senha,
        })

        nv('/home')
      } catch (err: any) {
        console.log('err => ', err)
        // const msn = err.response?.data
        //   ? err.response.data.message
        //   : 'Ocorreu um erro ao realizar seu cadastro, verifique suas credenciais ou sua conexão com a rede'
        // addToast({
        //   type: 'error',
        //   title: 'Erro ao realizar o cadastro',
        //   description: msn,
        // })

        // const errors = getValidationErrors(err)
        // formRef.current?.setErrors(errors)
      }
    },
    [addToast, nv, signIn],
  )
  return (
    <S.Container>
      <S.content>
        <S.boxForm>
          <h1>GEB NETWORKING</h1>
          <Form placeholder={'undefined'} onPointerEnterCapture={'undefined'} onPointerLeaveCapture={'undefined'} ref={formRef} onSubmit={handleSubmit}>
            <Input name="apelido" mask="text" label="Membro" />
            <Input name="senha" label="Senha" />

            <S.buton type="submit">
              <p>Entrar</p>
            </S.buton>
          </Form>
        </S.boxForm>

        <S.boxLogo>
          <img src={logo} />
        </S.boxLogo>
      </S.content>

      <Outlet />
    </S.Container>
  )
}
