import React, { useRef } from 'react'
import * as S from './styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useQuery } from 'react-query'
import { api } from '../../../services'
import { convidadosRoutes } from '../../../services/routes'
import { IGuest } from '../../../dtos'
import { getMonth } from 'date-fns'

interface I {
  id: string
}

interface IResult {
  mes: number
  qnt: number
}

export function ChartInvit({ id }: I) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const { data, isLoading } = useQuery('all-guest', async () => {
    const rs = await api.get(convidadosRoutes.get['list-all'])
    return rs.data
  })

  const chart = React.useMemo(() => {
    const b2b = (data as IGuest[]) || ([] as IGuest[])

    const fil = b2b.filter((h) => h.fk_user_id === id)

    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const result: IResult[] = []

    month.forEach((m) => {
      let data = {
        mes: m,
        qnt: 0,
      }

      fil.forEach((h) => {
        const mes = getMonth(new Date(h.updated_at)) + 1

        console.log(m === mes)
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
      text: 'CONVIDADOS',
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
        name: 'Qunatidade de convidados realizado durante o mês',
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
          color: '#fff',
        }}
      >
        <h2>CARREGANDO...</h2>
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
