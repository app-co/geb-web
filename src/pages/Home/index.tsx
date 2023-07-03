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

export function Home() {
  const user = useQuery('list-all-user', async () => {
    const rs = await api.get(userRoutes.get['list-all'])
    return rs.data as IUserDtos[]
  })

  const users = React.useMemo(() => {
    const us = (user.data as IUserDtos[]) || []

    return us
  }, [user.data])

  const totalMembro = users.length

  return (
    <div>
      <Menu />
      <S.Container>
        <h1>GEB NET WORKING</h1>

        <h3>Total de membros: {totalMembro}</h3>
      </S.Container>
    </div>
  )
}
