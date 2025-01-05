import { api } from "../../services"

export class DelteFetchs {

  public async delteUser(id: string) {
    const { data } = await api.post(`/user/${id}`)

    return data
  }

  public async deleteOnStorage(key: string) {
    await localStorage.removeItem(key)

    return true
  }

  public async deleteRelation(id: number) {
    const { data } = await api.delete(`/relationShip/${id}`)

    return data
  }
}