import axios from 'axios'
import { env } from './env'

export const api = axios.create({
    baseURL: env.base_url,
    withCredentials: true
})
