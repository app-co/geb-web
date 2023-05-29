import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { cor } from '../../styles/color'
import * as S from './styles'

interface Props {
  value?: number
}

export function Star({ value = 3 }: Props) {
  return (
    <S.Container>
      {value < 1 ? <AiOutlineStar /> : <AiFillStar />}
      {value < 2 ? <AiOutlineStar /> : <AiFillStar />}
      {value < 3 ? <AiOutlineStar /> : <AiFillStar />}
      {value < 4 ? <AiOutlineStar /> : <AiFillStar />}
      {value < 5 ? <AiOutlineStar /> : <AiFillStar />}
    </S.Container>
  )
}
