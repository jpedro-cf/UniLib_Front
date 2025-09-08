import { env } from '@/config/env'
import { IBook, IReadBookResponse } from '@/interfaces/Book'
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
export const useBook = (id: IBook['id']) => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/books/${id}`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['book'],
        queryFn: submit,
        retry: false
    })

    return result
}

export const useReader = (id: string) => {
    const submit = async (): Promise<IReadBookResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/books/${id}/read`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['read_book'],
        queryFn: submit,
        retry: false
    })

    return result
}
