import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

export type TV = 'submit' | 'delet' | 'global'

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  bg?: TV
}

export function Button({ title, bg = 'global', ...rest }: props) {
  return (
    <S.Container bg={bg} {...rest}>
      <p>{title}</p>
    </S.Container>
  )
}
