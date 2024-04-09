import { api } from '.'
import { IExtratoUser, IMetric, IRelation, IStars, IUserDtos } from '../dtos'

interface IGlobalMetric {
  consumoTotal: string
  getUsers: {
    id: string
    nome: string
    membro: string
    created: string
    presenca: string
    workname: string
    relations: IRelation[]
  }[]
}

export async function requestGetAllUsers(hub: string) {
  const { data } = await api.get(`/user/list-all-user/${hub}`)

  const list = data as IUserDtos[]

  const users = list
    .filter((h) => h.situation.inativo !== true)
    .map((h) => {
      const total = h.Stars.length === 0 ? 5 : h.Stars.length
      let star = 0

      h.Stars.forEach((h: IStars) => {
        star += h.star
      })
      const md = star / total
      const value = Number(md.toFixed(0)) === 0 ? 5 : Number(md.toFixed(0))

      const data = {
        ...h,
        media: value,
      }

      return data
    })

  return list
}

export async function requestExtratoUser(id: string) {
  const { data } = await api.get(`/relation/extrato-valid/${id}`)

  return data as IExtratoUser
}

export async function requestExtratoPeddingUser(id: string) {
  const { data } = await api.get(`/relation/extrato-pedding/${id}`)

  return data as IExtratoUser
}

export async function requestGetAllRelation() {
  const { data } = await api.get('/relation')

  return data as IRelation[]
}

export async function requestGetMetrics() {
  const { data } = await api.get('/relation/metric')

  return data as IMetric
}

export async function fetchGlobalMetric() {
  const { data } = await api.get('/metric')

  return data as IGlobalMetric
}
