import { CategoryFormSchema } from '@/components/categories/CategoryForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { ICategory } from '@/interfaces/Category'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
export const useCategories = () => {
    const submit = async (): Promise<ICategory[]> => {
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

export function useCategoryMutation() {
    const submit = async (data: CategoryFormSchema) => {
        return
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
