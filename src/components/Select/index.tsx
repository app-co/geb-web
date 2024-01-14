import * as S from './styles'

interface I {
  selected: boolean
  select: () => void
  title: string
}
export function Select({ select, selected = false, title }: I) {
  return (
    <S.Container onClick={select} selected={selected}>
      <p>{title}</p>

      <div className="circle">
        <div className="dot" />
      </div>
    </S.Container>
  )
}
