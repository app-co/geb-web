/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
import { HandCoins, PiggyBank, Wallet } from '@phosphor-icons/react'
import { UsersThree } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { BalanceCard } from '../../components/BalanceCard'
import { Layout } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { ChartMetricConsumo } from '../../components/charts/MetricConsumo'
import { convertNumberToMoney } from '../../utils/unitts'
import * as S from './styles'
import { make } from '../../hooks'

const { querys } = make()

export function Home() {



  const metricas = React.useMemo(() => {
    return {
      userUp: 0,
      media_pedding: '0',
      media_valid: '0',
      month: '0',
      year: '0',
      accumulated: '0',
    }
  }, [])

  if (false) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <S.Container>
      <Layout>
        <S.main>
          <S.gridCardBalanc>
            <BalanceCard valu={''} title="MEMBROS ATIVOS">
              <UsersThree weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas?.month} title="ACUMULADO NO MÊS">
              <HandCoins weight="duotone" />
            </BalanceCard>

            <BalanceCard
              valu={''}
              title="ACUMULADO NO ANO"
            >
              <PiggyBank weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas?.media_valid} title="MEDIA DE NEGÓCIOS">
              <Wallet weight="duotone" />
            </BalanceCard>
          </S.gridCardBalanc>

          <S.boxChart>
            <ChartMetricConsumo />
          </S.boxChart>
        </S.main>
      </Layout>
    </S.Container>
  )
}
