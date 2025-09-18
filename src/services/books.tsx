import { BookFormSchema } from '@/components/book/BookForm'
import { toast } from '@/components/ui/use-toast'
import { IBook, IBookReview, IBorrowedBook, IReadBookResponse } from '@/interfaces/Book'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginationResponse } from '@/interfaces'
import { api } from '@/config/axios'
import { BookReviewSchema } from '@/components/books/BookReviewForm'

export const useBooks = (company_id?: string) => {
    const submit = async (): Promise<PaginationResponse<IBook>> => {
        const res = await api.get(`/books`, {
            params: {
                size: 999,
                companyId: company_id
            }
        })
        return res.data
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
        const res = await api.get(`/books/borrows`)
        return res.data
    }

    return useQuery({
        queryKey: ['my_borrows'],
        queryFn: submit,
        enabled,
        refetchOnWindowFocus: false
    })
}

export const useBook = (id: IBook['id']) => {
    const submit = async (): Promise<IBook> => {
        const res = await api.get(`/books/${id}`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['book'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return result
}

export const useReader = (id: string) => {
    const submit = async (): Promise<IReadBookResponse> => {
        const res = await api.get(`/books/${id}/read`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['read_book'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return result
}

export const useBookMutation = () => {
    const queryClient = useQueryClient()

    const create = async (data: BookFormSchema): Promise<IBook> => {
        if (!data.company_id) {
            throw new Error('Id da empresa é obrigatório.')
        }

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
            data.categories.forEach((c) => {
                formdata.append('categories', c.value)
            })
        }

        const res = await api.post('/books', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

    const update = async (data: BookFormSchema): Promise<IBook> => {
        if (!data.id) {
            throw new Error('Id é obrigatório.')
        }

        const formdata = new FormData()
        formdata.append('title', data.title)
        formdata.append('description', data.description)

        if (data.image) {
            formdata.append('image', data.image, data.image.name)
        }
        if (data.pdf) {
            formdata.append('pdf', data.pdf, data.pdf.name)
        }
        if (data.categories) {
            data.categories.forEach((c) => {
                formdata.append('categories', c.value)
            })
        }

        const res = await api.put(`/books/${data.id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }
    const submit = async (data: BookFormSchema): Promise<IBook> => {
        return data.id ? await update(data) : await create(data)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Livro publicado com sucesso.</div>
            })
            queryClient.setQueryData(['books'], (oldData: PaginationResponse<IBook>) => {
                if (variables.id) {
                    return {
                        ...oldData,
                        content: oldData.content.map((b) => (b.id == data.id ? data : b))
                    }
                }
                return {
                    ...oldData,
                    content: [data, ...oldData.content]
                }
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

export const useBookDeletion = () => {
    const queryClient = useQueryClient()

    const submit = async (id: string) => {
        await api.delete(`/books/${id}`)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Livro deletado com sucesso.</div>
            })
            queryClient.setQueryData(['books'], (oldData: PaginationResponse<IBook>) => {
                return {
                    ...oldData,
                    content: oldData.content.filter((b) => b.id != variables)
                }
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao deletar o livro.</div>
            })
        }
    })
}

interface BorrowBookData {
    book_id: string
    release: Date
    expiration: Date
}

export const useBorrowBook = () => {
    const submit = async (data: BorrowBookData) => {
        await api.post(`/books/${data.book_id}/borrow`, {
            release: data.release ?? new Date(),
            expiration: data.expiration ?? new Date()
        })
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Livro solicitado com sucesso, aguarde a confirmação.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao solicitar o livro.</div>
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
    const queryClient = useQueryClient()

    const approve = async (data: BorrowedBookRequest): Promise<void> => {
        await api.put(`/books/borrows/${data.borrow_id}`)
    }

    const deny = async (data: BorrowedBookRequest): Promise<void> => {
        await api.delete(`/books/borrows/${data.borrow_id}`)
    }

    const submit = async (data: BorrowedBookRequest) => {
        return data.action == BorrowAction.APPROVE ? approve(data) : deny(data)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Ação realizada com sucesso.</div>
            })
            queryClient.setQueryData(['company_borrows'], (oldData: PaginationResponse<IBorrowedBook>) => {
                if (variables.action == BorrowAction.APPROVE) {
                    return {
                        ...oldData,
                        content: oldData.content.map((b) =>
                            b.id == variables.borrow_id ? { ...b, status: 'IN_PROGRESS' } : b
                        )
                    }
                }
                return {
                    ...oldData,
                    content: oldData.content.filter((b) => b.id != variables.borrow_id)
                }
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

export const useReviewMutation = () => {
    const submit = async (data: BookReviewSchema): Promise<IBookReview> => {
        const res = await api.post(`/reviews`, {
            bookId: data.book_id,
            rating: data.rating,
            comment: data.comment
        })
        return res.data
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Review adicionada com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao adicionar a review.</div>
            })
        }
    })
}

export const useReviewDeletion = () => {
    const queryClient = useQueryClient()

    const submit = async (id: string): Promise<void> => {
        await api.delete(`/reviews/${id}`)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Review deletada com sucesso.</div>
            })
            queryClient.setQueryData(['reviews'], (oldData: IBookReview[]) => {
                return oldData.filter((r) => r.id != variables)
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao deletar a review.</div>
            })
        }
    })
}

export const useReviews = () => {
    const submit = async (): Promise<IBookReview[]> => {
        const res = await api.get('/reviews')
        return res.data
    }

    return useQuery({
        queryKey: ['reviews'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })
}
