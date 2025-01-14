import axios from 'axios'

const production = 'https://geb-server.appcom.dev'
const local = 'http://localhost:3333'

export const api = axios.create({
  baseURL: local,
})
