import * as S from './styles'

type T = {
  children: React.ReactNode
  valu: string
  title: string
}

export function BalanceCard({ children, valu, title }: T) {
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
