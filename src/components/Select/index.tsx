import * as S from './styles'

interface I {
  selected: boolean
  select: () => void
  title: string
}
export function Select({ select, selected = false, title }: I) {
  return (
    <S.Container onClick={select} selected={selected}>
      <h4>{title}</h4>

      <div className="circle">
        <div className="dot" />
      </div>
    </S.Container>
  )
}
