import { CategoryFormSchema } from '@/components/categories/CategoryForm'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/config/axios'
import { PaginationResponse } from '@/interfaces'
import { ICategory } from '@/interfaces/Category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useCategories = () => {
    const submit = async (): Promise<PaginationResponse<ICategory>> => {
        const res = await api.get('/categories', {
            params: {
                size: 999
            }
        })
        return res.data
    }

    const results = useQuery({
        queryKey: ['categories'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return results
}

export function useCategoryMutation() {
    const queryClient = useQueryClient()

    const submit = async (data: CategoryFormSchema): Promise<ICategory> => {
        const res = await api.post('/categories', {
            title: data.title,
            description: data.description
        })

        return res.data
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Categoria publicada com sucesso.</div>
            })
            queryClient.setQueryData(['categories'], (oldData: PaginationResponse<ICategory>) => {
                return {
                    ...oldData,
                    content: [data, ...oldData.content]
                }
            })
        },
        onError: (e: AxiosError<{ detail?: string }>) => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: e.response?.data.detail ?? 'Ocorreu um erro inesperado.'
            })
        }
    })
}

export function useCategoryDeletion() {
    const queryClient = useQueryClient()

    const submit = async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Categoria deletada com sucesso.</div>
            })
            queryClient.setQueryData(['categories'], (oldData: PaginationResponse<ICategory>) => {
                return {
                    ...oldData,
                    content: oldData.content.filter((c) => c.id != variables)
                }
            })
        },
        onError: (e: AxiosError<{ detail?: string }>) => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: e.response?.data.detail ?? 'Ocorreu um erro inesperado.'
            })
        }
    })
}
