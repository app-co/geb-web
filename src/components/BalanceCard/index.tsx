import * as S from './styles'

type T = {
  children: any
  valu?: string
  title?: string
}

export function BalanceCard({ valu, title, children }: T) {
  return (
    <S.Container>
      {children}

      <div>
        <S.metric>{valu}</S.metric>
        <h4>{title}</h4>
      </div>
    </S.Container>
  )
}
