import { BookFormSchema } from '@/components/book/BookForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { IBook, IBorrowedBook, IReadBookResponse } from '@/interfaces/Book'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { mockUser } from './users'
import { PaginationResponse } from '@/interfaces'

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
    const submit = async (): Promise<PaginationResponse<IBook>> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return {
            content: [mockBook()],
            last: true,
            totalElements: 1,
            totalPages: 1
        }
    }

    const results = useQuery({
        queryKey: ['books'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return results
}

export const useBorrowedBooks = (enabled: boolean) => {
    const submit = async (): Promise<PaginationResponse<IBorrowedBook>> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
            content: [
                {
                    book: mockBook(),
                    user: mockUser(),
                    status: 'IN_PROGRESS',
                    id: '123',
                    expires_at: new Date(),
                    release_at: new Date()
                }
            ],
            last: true,
            totalElements: 1,
            totalPages: 1
        }
    }

    return useQuery({
        queryKey: ['borrows'],
        queryFn: submit,
        enabled,
        refetchOnWindowFocus: false
    })
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

export const useBookMutation = () => {
    const submit = async (data: BookFormSchema): Promise<IBook> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const formdata = new FormData()

        formdata.append('companyId', data.company_id)
        formdata.append('title', data.title)
        formdata.append('description', data.description)

        if (data.image) {
            formdata.append('image', data.image, data.image.name)
        }
        if (data.pdf) {
            formdata.append('pdf', data.pdf, data.pdf.name)
        }
        if (data.categories) {
            data.categories.map((category) => {
                formdata.append('categories[]', category.value)
            })
        }

        return mockBook()
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Livro publicado com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao publicar o livro.</div>
            })
        }
    })
}

export enum BorrowAction {
    APPROVE,
    DENY
}

interface BorrowedBookRequest {
    borrow_id: string
    action: BorrowAction
}

export const useBorrowedBookMutation = () => {
    const approve = async (data: BorrowedBookRequest): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return
    }

    const deny = async (data: BorrowedBookRequest): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return
    }

    const submit = async (data: BorrowedBookRequest) => {
        return data.action == BorrowAction.APPROVE ? approve(data) : deny(data)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Ação realizada com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao realizar essa ação.</div>
            })
        }
    })
}
