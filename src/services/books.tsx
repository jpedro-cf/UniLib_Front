import { env } from '@/config/env'
import { IBook, IReadBookResponse } from '@/interfaces/Book'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const mockBook = (): IBook => {
    return {
        id: '5579dd2e-ed72-417b-9f64-077fe86dda27',
        title: 'Diário de um banana',
        available: true,
        rating: 4.2,
        categories: [
            {
                id: '785bd9f7-eb00-4703-b84b-a8b38814bdd8',
                title: 'Ação',
                description:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            }
        ],
        reviews: [
            {
                id: '1',
                name: 'João Silva',
                rating: 4,
                comment: 'Ótimo livro! Muito informativo e bem escrito.',
                date: new Date()
            }
        ],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        image: 'https://encadernacaocapadura.com/wp-content/uploads/2022/05/livro-capa-dura.jpg',
        pdf: 'https://eppg.fgv.br/sites/default/files/teste.pdf',
        company_id: 'de41f0b8-d27a-4722-bcbd-16d2583ed4c4',
        has_ebook: true,
        created_at: new Date(),
        updated_at: new Date()
    }
}

export const useBooks = (id?: string) => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/books`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['books'],
        queryFn: submit,
        refetchOnWindowFocus: false
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
        retry: false,
        refetchOnWindowFocus: false
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
        retry: false,
        refetchOnWindowFocus: false
    })

    return result
}
