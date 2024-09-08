import { EditCompanyFormSchema } from '@/components/forms/companies/EditCompanyForm'
import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useCompanies = () => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/companies`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['companies'],
        queryFn: submit
    })

    return results
}

export const useCompany = (id: string) => {
    const submit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/companies/${id}`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['company'],
        queryFn: submit,
        retry: false
    })

    return result
}

export const editCompany = async (data: z.infer<typeof EditCompanyFormSchema>) => {
    // Função que faz a chamada para atualizar os dados

    const values = {
        name: data.name,
        description: data.description,
        image: data.image
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulação de atraso, remova se não for necessário
    const res = await axios.put(`${env.base_url}/companies/${data.id}`, values)
    return res.data
}
