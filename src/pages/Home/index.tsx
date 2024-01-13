/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
import { HandCoins, PiggyBank, Wallet } from '@phosphor-icons/react'
import { UsersThree } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { BalanceCard } from '../../components/BalanceCard'
import { Layout } from '../../components/Layout'
import { ChartMetricConsumo } from '../../components/charts/MetricConsumo'
import { useRelation } from '../../hooks/querys'
import { convertNumberToMoney } from '../../utils/unitts'
import * as S from './styles'

export function Home() {
  const { getMetric } = useRelation()

  const metricas = React.useMemo(() => {
    return {
      userUp: String(getMetric?.usersUp),
      media_pedding: convertNumberToMoney(
        getMetric?.padding_media_transaction / 100 ?? 0,
      ),
      media_valid: convertNumberToMoney(
        getMetric?.valid_media_transaction / 100 ?? 0,
      ),
      month: convertNumberToMoney(getMetric?.metricValidByMonth / 100 ?? 0),
      year: convertNumberToMoney(getMetric?.metricValidByYear / 100 ?? 0),
    }
  }, [getMetric])

  return (
    <S.Container>
      <Layout>
        <S.main>
          <S.gridCardBalanc>
            <BalanceCard valu={metricas.userUp} title="MEMBROS ATIVOS">
              <UsersThree weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas.month} title="ACUMULADO NO MÊS">
              <HandCoins weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas.year} title="ACUMULADO NO ANO">
              <PiggyBank weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas.media_valid} title="MEDIA DE NEGÓCIOS">
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
