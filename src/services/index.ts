import axios from 'axios'
import { env } from '../utils/env'

const production = 'https://geb-server.appcom.digital'
const local = 'http://localhost:3333'

export const api = axios.create({
  baseURL: production,
})
