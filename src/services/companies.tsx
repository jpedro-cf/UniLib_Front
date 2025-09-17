import { CompanyFormSchema } from '@/components/companies/CompanyForm'
import { ICompany, ICompanyMember } from '@/interfaces/Company'
import { useMutation, useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { IBorrowedBook } from '@/interfaces/Book'
import { PaginationResponse } from '@/interfaces'
import { api } from '@/config/axios'

export const useCompany = (id: string) => {
    const submit = async (): Promise<ICompany> => {
        const res = await api.get(`/companies/${id}`)

        return res.data
    }

    const result = useQuery({
        queryKey: ['company'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
    })

    return result
}

export const useCompanyMembers = (id: string) => {
    const submit = async (): Promise<ICompanyMember[]> => {
        const res = await api.get(`/companies/${id}/members`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['company_members'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
    })

    return result
}

interface RemoveCompanyData {
    company_id: string
    member_id: string
}

export const useRemoveCompanyMember = () => {
    const submit = async ({ company_id, member_id }: RemoveCompanyData): Promise<void> => {
        await api.delete(`/companies/${company_id}/members/${member_id}`)
    }

    const result = useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Removido!',
                variant: 'default',
                description: <div>Membro removido com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao remover o membro.</div>
            })
        }
    })

    return result
}

export const useCompanyBorrowedBooks = (company_id: string) => {
    const submit = async (): Promise<PaginationResponse<IBorrowedBook>> => {
        const res = await api.get(`/books/borrows?companyId=${company_id}`)
        return res.data
    }

    return useQuery({
        queryKey: ['borrows'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
    })
}

export const editCompany = async (data: z.infer<typeof CompanyFormSchema>) => {
    const formData = new FormData()

    formData.append('id', data.id!)
    formData.append('name', data.name)
    formData.append('description', data.description)

    if (data.image) {
        formData.append('image', data.image, data.image.name)
    }

    const res = await api.put(`/companies/${data.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}

export const deleteCompany = async (id: string) => {
    await api.delete(`/companies/${id}`)
    return
}

export const createCompany = async (data: z.infer<typeof CompanyFormSchema>) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('image', data.image!, data.image?.name)

    const res = await api.post(`/companies`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res.data
}
