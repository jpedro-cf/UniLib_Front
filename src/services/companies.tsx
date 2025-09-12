import { CompanyFormSchema } from '@/components/companies/CompanyForm'
import { env } from '@/config/env'
import { ICompany, ICompanyMember } from '@/interfaces/Company'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { mockUser } from './users'
import { toast } from '@/components/ui/use-toast'
import { IBorrowedBook } from '@/interfaces/Book'
import { mockBook } from './books'

const mockCompany = (id?: string): ICompany => {
    return {
        id: id ?? '123',
        description: 'description',
        image: '/public/images/logos/logo1.svg',
        name: 'Empresa',
        createdAt: new Date()
    }
}

export const useCompany = (id: string) => {
    const submit = async (): Promise<ICompany> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return mockCompany(id)
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
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return [
            {
                company_id: id,
                id: '123',
                role: 'OWNER',
                name: 'nome',
                email: 'email@email.com'
            }
        ]
    }

    const result = useQuery({
        queryKey: ['company_members'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
    })

    return result
}

export const useRemoveCompanyMember = () => {
    const submit = async (member_id: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return
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
    const submit = async (): Promise<IBorrowedBook[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return [
            {
                book: mockBook(),
                user: mockUser(),
                status: 'WAITING',
                id: '123',
                expires_at: new Date(),
                release_at: new Date()
            }
        ]
    }

    return useQuery({
        queryKey: ['borrows'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
    })
}

export const editCompany = async (data: z.infer<typeof CompanyFormSchema>) => {
    const values = {
        name: data.name,
        description: data.description,
        image: data.image
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await axios.put(`${env.base_url}/companies/${data.id}`, values)
    return res.data
}

export const deleteCompany = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await axios.delete(`${env.base_url}/companies/${id}`)
    return res.data
}

export const createCompany = async (data: Partial<z.infer<typeof CompanyFormSchema>>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
}
