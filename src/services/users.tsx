import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useUsers = () => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/users`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['users'],
        queryFn: submit
    })

    return results
}
