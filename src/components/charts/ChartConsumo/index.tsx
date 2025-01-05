/* eslint-disable camelcase */
import { format, getMonth } from 'date-fns'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef } from 'react'
import { cor } from '../../../styles/color'
import { Loading } from '../../Loading'
import { months } from '../utils/months'

interface I {
  id: string
}

interface IResult {
  mes: number
  qnt: number
}

export function ChartConsumo({ id }: I) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  const chart = React.useMemo(() => {
    const relations_valid = []
    const relations_pedding = []

    const currentDate = format(new Date(), 'MM/yy')

    const releationByDate = relations_valid.filter((h) => {
      const date = format(new Date(h.updated_at), 'MM/yy')
      if (date === currentDate) {
        return h
      }
      return null
    })

    const releationByDatePedding = relations_pedding.filter((h) => {
      const date = format(new Date(h.updated_at), 'MM/yy')
      if (date === currentDate) {
        return h
      }
      return null
    })
    console.log({
      peding: releationByDatePedding.length,
      valid: releationByDate.length,
    })

    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const result_valid: IResult[] = []
    const result_pedding: IResult[] = []

    month.forEach((m) => {
      let dataV = {
        mes: m,
        qnt: 0,
      }

      let dataP = {
        mes: m,
        qnt: 0,
      }

      releationByDate.forEach((h) => {
        const mes = getMonth(new Date(h.updated_at)) + 1
        if (m === mes) {
          dataV = {
            mes: m,
            qnt: dataV.qnt + 1,
          }
        }
      })

      releationByDatePedding.forEach((h) => {
        const mes = getMonth(new Date(h.updated_at)) + 1
        if (m === mes) {
          dataP = {
            mes: m,
            qnt: dataP.qnt + 1,
          }
        }
      })
      result_pedding.push(dataP)
      result_valid.push(dataV)
    })

    return { result_pedding, result_valid }
  }, [])

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
      style: {
        color: cor.focus.a,
      },
    },

    title: {
      text: 'Negócios',
      style: {
        color: cor.bg.light,
      },
    },

    yAxis: {
      labels: {
        style: {
          color: '#fff',
        },
      },
      title: {
        text: '',
        style: {
          color: '#fff',
        },
      },
    },

    xAxis: {
      labels: {
        style: {
          color: cor.focus.a,
        },
      },

      categories: months,

      crosshair: true,
    },

    series: [
      {
        type: 'column',
        name: 'Negócios validados no mes',
        data: chart.result_valid.map((h) => h.qnt),
        color: cor.focus.a,
      },

      {
        type: 'column',
        name: 'Negócios pendente no mes',
        data: chart.result_pedding.map((h) => h.qnt),
        color: '#4f1a1a',
      },
    ],
  }

  if (false) {
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
