import { api } from '.'
import { IMetric, IRelation, IStars, IUserDtos } from '../dtos'

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

export async function requestGetAllRelation() {
  const { data } = await api.get('/relation')

  return data as IRelation[]
}

export async function requestGetMetrics() {
  const { data } = await api.get('/relation/metric')

  return data as IMetric
}