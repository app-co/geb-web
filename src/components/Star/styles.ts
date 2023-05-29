import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  & + svg {
    margin-left: 10px;
  }
`
export const filStar = styled(AiFillStar)`
  color: ${cor.orange[1]};
`

export const outFillStar = styled(AiOutlineStar)`
  color: ${cor.orange[1]};
`
