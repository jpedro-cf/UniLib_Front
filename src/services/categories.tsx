import { CategoryFormSchema } from '@/components/categories/CategoryForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { PaginationResponse } from '@/interfaces'
import { ICategory } from '@/interfaces/Category'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const mockCategory = () => ({
    id: '785bd9f7-eb00-4703-b84b-a8b38814bdd8',
    title: 'Ação',
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
})

export const useCategories = () => {
    const submit = async (): Promise<PaginationResponse<ICategory>> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
            content: [mockCategory()],
            last: true,
            totalElements: 1,
            totalPages: 1
        }
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
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return mockCategory()
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
