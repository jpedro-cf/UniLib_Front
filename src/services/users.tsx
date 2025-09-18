import { toast } from '@/components/ui/use-toast'
import { api } from '@/config/axios'
import { useAuth } from '@/context/auth-context'
import { ICurrentUserData, IUser } from '@/interfaces/User'
import { LoginFormSchema } from '@/pages/LoginPage'
import { RegisterFormSchema } from '@/pages/RegisterPage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useUsers = () => {
    const submit = async (): Promise<IUser[]> => {
        const res = await api.get('/users')
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
        const res = await api.get('/auth/me')
        return res.data
    }

    const results = useQuery({
        queryKey: ['me'],
        queryFn: submit,
        enabled: shouldFetch,
        retry: 2,
        refetchOnWindowFocus: false
    })

    return results
}

export const useLoginMutation = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const submit = async (data: LoginFormSchema): Promise<ICurrentUserData> => {
        const res = await api.post('/auth/login', data)
        return res.data.user
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

export const useLogoutMutation = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const submit = async (): Promise<void> => {
        await api.post('/auth/logout')
    }

    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            setUser(null)
            navigate('/', { replace: true })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao realizar o logout.</div>
            })
        }
    })
}

export const useRegisterMutation = () => {
    const navigate = useNavigate()

    const submit = async (data: RegisterFormSchema): Promise<IUser> => {
        const res = await api.post('/users', data)
        return res.data
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
