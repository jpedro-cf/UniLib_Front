import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useAuth } from '@/context/auth-context'
import { ICurrentUserData, IUser } from '@/interfaces/User'
import { LoginFormSchema } from '@/pages/LoginPage'
import { RegisterFormSchema } from '@/pages/RegisterPage'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const mockUser = (): IUser => {
    return {
        email: 'email@email.com',
        id: '123',
        name: 'nome'
    }
}

export const useUsers = () => {
    const submit = async (): Promise<IUser[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axios.get(`${env.base_url}/users`)
        return res.data
    }

    const results = useQuery({
        queryKey: ['users'],
        queryFn: submit,
        refetchOnWindowFocus: false
    })

    return results
}

export const useCurrentUser = (shouldFetch: boolean) => {
    const submit = async (): Promise<ICurrentUserData> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return {
            id: '8d4d6176-b171-4342-8880-b2f4c3de4610',
            name: 'Joao',
            email: 'joao@email.com',
            memberships: [
                {
                    id: 'd467301d-921d-4156-a294-21cbfafc82d1',
                    company: {
                        id: 'd63cd80f-4cdd-48b6-945b-4864d868d703',
                        name: 'Company name',
                        description: 'Descrição',
                        image: 'images/company/null',
                        createdAt: new Date()
                    },
                    role: 'OWNER'
                }
            ]
        }
    }

    const results = useQuery({
        queryKey: ['me'],
        queryFn: submit,
        enabled: shouldFetch,
        refetchOnWindowFocus: false
    })

    return results
}

export const useLoginMutation = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const submit = async (data: LoginFormSchema): Promise<ICurrentUserData> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return {
            id: '8d4d6176-b171-4342-8880-b2f4c3de4610',
            name: 'Joao',
            email: 'joao@email.com',
            memberships: [
                {
                    id: 'd467301d-921d-4156-a294-21cbfafc82d1',
                    company: {
                        id: 'd63cd80f-4cdd-48b6-945b-4864d868d703',
                        name: 'Company name',
                        description: 'Descrição',
                        image: 'images/company/null',
                        createdAt: new Date()
                    },
                    role: 'OWNER'
                }
            ]
        }
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: (data) => {
            setUser(data)
            navigate('/', { replace: true })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao realizar o login.</div>
            })
        }
    })
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()

    const submit = async (data: RegisterFormSchema): Promise<IUser> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return mockUser()
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Conta criada com sucesso.</div>
            })
            navigate('/login', { replace: true })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao criar a conta.</div>
            })
        }
    })
}
