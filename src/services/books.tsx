import { env } from '@/config/env'
import { IBook } from '@/interfaces/Book'
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
export const useBook = (id: IBook["id"])=>{
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/books/${id}`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['book'],
        queryFn: submit
    })

    return result;
}