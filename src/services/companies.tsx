import { CompanyFormSchema } from '@/components/forms/companies/CompanyForm'
import { env } from '@/config/env'
import { ICompany, ICompanyMember } from '@/interfaces/Company'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

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
        return []
    }

    const result = useQuery({
        queryKey: ['company'],
        queryFn: submit,
        retry: false,
        refetchOnWindowFocus: false
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
