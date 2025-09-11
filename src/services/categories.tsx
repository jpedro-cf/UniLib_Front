import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export const useCategories = () => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/categories`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['categories'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return results
}
