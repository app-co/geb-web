/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
import { HandCoins, PiggyBank, Wallet } from '@phosphor-icons/react'
import { UsersThree } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { BalanceCard } from '../../components/BalanceCard'
import { Layout } from '../../components/Layout'
import { Loading } from '../../components/Loading'
import { ChartMetricConsumo } from '../../components/charts/MetricConsumo'
import { useRelation } from '../../hooks/querys'
import { convertNumberToMoney } from '../../utils/unitts'
import * as S from './styles'

export function Home() {
  const { getMetric, loadingMetric } = useRelation()

  const metricas = React.useMemo(() => {
    const pedding = getMetric?.padding_media_transaction || 0
    const month = getMetric?.metricValidByMonth || 0
    const valid = getMetric?.valid_media_transaction || 0
    const year = getMetric?.metricValidByYear || 0
    return {
      userUp: String(getMetric?.usersUp),
      media_pedding: convertNumberToMoney(pedding / 100),
      media_valid: convertNumberToMoney(valid / 100 ?? 0),
      month: convertNumberToMoney(month / 100 || 0),
      year: convertNumberToMoney(year / 100 ?? 0),
      accumulated: getMetric?.amount_accumulated ?? 0,
    }
  }, [getMetric])

  if (loadingMetric) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <S.Container>
      <Layout>
        <div style={{ padding: 10, color: '#fff' }}>
          <h2>Acumulado: {convertNumberToMoney(metricas.accumulated / 100)}</h2>
        </div>
        <S.main>
          <S.gridCardBalanc>
            <BalanceCard valu={metricas?.userUp} title="MEMBROS ATIVOS">
              <UsersThree weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas?.month} title="ACUMULADO NO MÊS">
              <HandCoins weight="duotone" />
            </BalanceCard>

            <BalanceCard valu={metricas?.year} title="ACUMULADO NO ANO">
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
