import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export const useBooks = () => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/books`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['books'],
        queryFn: submit
    })

    return results
}
