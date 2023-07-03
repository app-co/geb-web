import React, { useRef } from 'react'
import * as S from './styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { api } from '../../../services'
import { useQuery } from 'react-query'
import { consumoRoutes } from '../../../services/routes'
import { ITransaction } from '../../../dtos'
import { getMonth } from 'date-fns'
import { Loading } from '../../Loading'

interface I {
  id: string
}

interface IResult {
  mes: number
  qnt: number
}

export function ChartConsumo({ id }: I) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const { data, isLoading } = useQuery('all-consumo', async () => {
    const rs = await api.get(consumoRoutes.get['all-consumo'])
    return rs.data
  })

  const chart = React.useMemo(() => {
    const b2b = (data as ITransaction[]) || ([] as ITransaction[])

    const fil = b2b.filter((h) => h.prestador_id === id)

    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const result: IResult[] = []

    month.forEach((m) => {
      let data = {
        mes: m,
        qnt: 0,
      }

      fil.forEach((h) => {
        const mes = getMonth(new Date(h.created_at)) + 1
        if (m === mes) {
          data = {
            mes: m,
            qnt: data.qnt + 1,
          }
        }
      })
      result.push(data)
    })

    return result
  }, [data, id])

  const options: Highcharts.Options = {
    title: {
      text: 'CONSUMO (vendas)',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      crosshair: true,
    },
    series: [
      {
        type: 'column',
        name: 'Qunatidade de b2b realizado durante o mês',
        data: chart.map((h) => h.qnt),
      },
    ],
  }

  if (isLoading) {
    return (
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
        }}
      >
        <h2>CARREGANDO...</h2>
        <Loading />
      </div>
    )
  }
  return (
    <S.Container>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </S.Container>
  )
}
