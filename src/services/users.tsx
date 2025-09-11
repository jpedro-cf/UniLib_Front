import { env } from '@/config/env'
import { ICurrentUserData, IUser } from '@/interfaces/User'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
