import { Outlet } from 'react-router-dom'
import { Menu } from '../../components/Menu'
import * as S from './styles'

export function Home() {
  return (
    <S.Container>
      <Menu />

      <Outlet />
    </S.Container>
  )
}
