import { CategoryFormSchema } from '@/components/categories/CategoryForm'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/config/axios'
import { PaginationResponse } from '@/interfaces'
import { ICategory } from '@/interfaces/Category'
import { useMutation, useQuery } from '@tanstack/react-query'

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
    const submit = async (data: CategoryFormSchema): Promise<ICategory> => {
        const res = await api.post('/categories', {
            title: data.title,
            description: data.description
        })

        return res.data
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Categoria publicada com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao publicar a categoria.</div>
            })
        }
    })
}
