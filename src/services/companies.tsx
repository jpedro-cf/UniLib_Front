import { CompanyFormSchema } from '@/components/companies/CompanyForm'
import { ICompany, ICompanyMember } from '@/interfaces/Company'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { IBorrowedBook } from '@/interfaces/Book'
import { PaginationResponse } from '@/interfaces'
import { api } from '@/config/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import { CompanyMemberFormSchema } from '@/components/companies/CompanyMemberForm'

export const useCompany = (id: string) => {
    const submit = async (): Promise<ICompany> => {
        const res = await api.get(`/companies/${id}`)

        return res.data
    }

    const result = useQuery({
        queryKey: ['company'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return result
}

export function useCompanyMutation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { user, setUser } = useAuth()

    const createCompany = async (data: z.infer<typeof CompanyFormSchema>) => {
        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('description', data.description)
        if (data.image) {
            formData.append('image', data.image, data.image.name)
        }

        const res = await api.post(`/companies`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return res.data
    }

    const editCompany = async (data: z.infer<typeof CompanyFormSchema>) => {
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

    const submit = async (data: z.infer<typeof CompanyFormSchema>): Promise<ICompany> => {
        return data.id ? await editCompany(data) : await createCompany(data)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Empresa publicada com sucesso.</div>
            })
            queryClient.setQueryData(['company'], () => {
                return data
            })

            if (!variables.id && user) {
                setUser({
                    ...user,
                    id: user.id!,
                    memberships: [...user.memberships, { company: data, role: 'OWNER' }]
                })
            }
            if (variables.id && user) {
                setUser({
                    ...user,
                    id: user.id!,
                    memberships: user.memberships.map((m) =>
                        m.company.id == data.id
                            ? {
                                  role: m.role,
                                  company: data
                              }
                            : m
                    )
                })
            }
            navigate(`/admin/empresas/${data.id}`, { replace: true })
        },
        onError: (e) => {
            console.log(e)
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao publicar a empresa.</div>
            })
        }
    })
}

export const useCompanyMembers = (id: string) => {
    const submit = async (): Promise<ICompanyMember[]> => {
        const res = await api.get(`/companies/${id}/members`)
        return res.data
    }

    const result = useQuery({
        queryKey: ['company_members'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return result
}

interface RemoveCompanyData {
    company_id: string
    member_id: string
}

export const useRemoveCompanyMember = () => {
    const queryClient = useQueryClient()

    const submit = async ({ company_id, member_id }: RemoveCompanyData): Promise<void> => {
        await api.delete(`/companies/${company_id}/members/${member_id}`)
    }

    const result = useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Removido!',
                variant: 'default',
                description: <div>Membro removido com sucesso.</div>
            })

            queryClient.setQueryData(['company_members'], (oldData: ICompanyMember[]) => {
                return oldData.filter((m) => m.id != variables.member_id)
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

export function useCompanyMemberMutation() {
    const queryClient = useQueryClient()

    const submit = async (data: z.infer<typeof CompanyMemberFormSchema>): Promise<ICompanyMember> => {
        const res = await api.post(`/companies/${data.company_id}/members`, {
            memberId: data.member_id,
            role: data.role
        })
        return res.data
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data) => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Membro adicionado com sucesso.</div>
            })

            queryClient.setQueryData(['company_members'], (oldData: ICompanyMember[]) => {
                return [data, ...oldData]
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao adicionar o membro.</div>
            })
        }
    })
}

export const useCompanyBorrowedBooks = (company_id: string) => {
    const submit = async (): Promise<PaginationResponse<IBorrowedBook>> => {
        const res = await api.get(`/books/borrows?companyId=${company_id}`, {
            params: {
                size: 999
            }
        })
        return res.data
    }

    return useQuery({
        queryKey: ['company_borrows'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })
}

export function useCompanyDeletion() {
    const navigate = useNavigate()
    const { user, setUser } = useAuth()

    const submit = async (id: string) => {
        await api.delete(`/companies/${id}`)
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data, variables) => {
            toast({
                title: 'Deletado!',
                variant: 'default',
                description: <div>Empresa deletada com sucesso.</div>
            })
            if (user) {
                setUser({ ...user, memberships: user?.memberships.filter((m) => m.company.id != variables) })
            }
            navigate('/', { replace: true })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao deletar a empresa.</div>
            })
        }
    })
}
