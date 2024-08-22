import { IUser } from '@/interfaces/User'
import { LoadingPage } from '@/pages/LoadingPage'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextsTypes {
    user: IUser | null
    setUserFunction: (user: IUser | null) => void
}

const AuthContext = createContext<AuthContextsTypes | undefined>(undefined)

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const mockResponse = (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: 'string',
                    name: 'string',
                    email: 'string',
                    roles: ['user']
                }
            })
        }, 500) // Tempo de atraso em milissegundos
    })
}

export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    const setUserFunction = (user: IUser | null) => {
        setUser(user)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await mockResponse()
                setUser(response.data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    if (loading) {
        return <LoadingPage />
    }

    return <AuthContext.Provider value={{ user, setUserFunction }}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
