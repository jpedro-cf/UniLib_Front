import { CompanyFormSchema } from '@/components/companies/CompanyForm'
import { env } from '@/config/env'
import { ICompany, ICompanyMember } from '@/interfaces/Company'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { mockUser } from './users'
import { toast } from '@/components/ui/use-toast'

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
                company: mockCompany(id),
                id: '123',
                role: 'OWNER',
                user: mockUser()
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

export const useRemoveCompanyMember = (member_id: string) => {
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
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
}
