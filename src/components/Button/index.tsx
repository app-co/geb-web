import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'
import { Loading } from '../Loading'

export type TV = 'submit' | 'delet' | 'global'

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  bg?: TV
  load?: boolean
}

export function Button({ title, load = false, bg = 'global', ...rest }: props) {
  return (
    <S.Container bg={bg} {...rest}>
      {load ? <Loading /> : <p>{title}</p>}
    </S.Container>
  )
}
