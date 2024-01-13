import { format, getMonth } from 'date-fns'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef } from 'react'
import { useExtratoUser } from '../../../hooks/querys'
import { cor } from '../../../styles/color'
import { Loading } from '../../Loading'

interface I {
  id: string
}

interface IResult {
  mes: number
  qnt: number
}

export function ChartConsumo({ id }: I) {
  const { getEtrato, isLoading } = useExtratoUser(id)
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  const chart = React.useMemo(() => {
    const relations = getEtrato?.allRelation ?? []
    const currentDate = format(new Date(), 'MM/yy')

    const releationByDate = relations.filter((h) => {
      const date = format(new Date(h.updated_at), 'MM/yy')
      if (date === currentDate) {
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

      releationByDate.forEach((h) => {
        const mes = getMonth(new Date(h.updated_at)) + 1
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
  }, [getEtrato])

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: cor.bg.dark,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: cor.bg.dark,
      plotBackgroundColor: cor.bg.dark,
      plotShadow: true,
      plotBorderWidth: 1,
      plotBorderColor: '#5e5e5e',
    },

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
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  )
}
