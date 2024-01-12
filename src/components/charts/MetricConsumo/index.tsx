import { getMonth } from 'date-fns'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import { useRelation } from '../../../hooks/querys'
import { api } from '../../../services'
import { consumoRoutes } from '../../../services/routes'
import { cor } from '../../../styles/color'
import { Loading } from '../../Loading'

interface I {
  id: string
}

interface IResult {
  mes: number
  qnt: number
}

export function ChartMetricConsumo({ id }: I) {
  const { getAllRelation } = useRelation()
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const { data, isLoading } = useQuery('all-consumo', async () => {
    const rs = await api.get(consumoRoutes.get['all-consumo'])
    return rs.data
  })

  const chart = React.useMemo(() => {
    const relation = getAllRelation || []

    const fil = relation.filter((h) => {
      if (h.type === 'CONSUMO_OUT' && h.situation) {
        return h
      }
      return null
    })

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
  }, [getAllRelation])

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: cor.bg.dark,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: cor.bg.dark,
      plotBackgroundColor: cor.bg.dark,
      // plotShadow: true,
      plotBorderWidth: 1,
      plotBorderColor: '#5e5e5e',
    },
    title: {
      style: {
        color: '#cccccc',
      },
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
        color: cor.focus.a,
        name: 'Qunatidade de consumo realizado no mês',
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
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}
