import { ICompany } from '@/interfaces/Company'
import { IUser } from '@/interfaces/User'
import { LoadingPage } from '@/pages/LoadingPage'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextsTypes {
    user: IUser | null
    companies: ICompany[] | null
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
                    user: {
                        id: 'uuid',
                        name: 'Nome',
                        email: 'nome@email.com',
                        roles: ['admin']
                    },
                    companies: [
                        {
                            id: 'cf1c8997-c2f6-4d71-b5be-2ac39fe1ead5',
                            name: 'Faculdade EAD SP',
                            description: 'Descrição',
                            image: 'https://image.png',
                            createdAt: '2024-09-02T17:40:37.689+00:00'
                        },
                        {
                            id: 'bd260a9b-6448-480c-9ccf-0d2e2240c2a5',
                            name: 'Empresa Usuario',
                            description:
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                            image: 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg',
                            createdAt: '2024-09-02T17:40:37.689+00:00'
                        }
                    ]
                }
            })
        }, 500) // Tempo de atraso em milissegundos
    })
}

export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>(null)
    const [companies, setCompanies] = useState<ICompany[] | null>(null)
    const [loading, setLoading] = useState(true)

    const setUserFunction = (user: IUser | null) => {
        setUser(user)
    }

    const setCompanyFunction = (companies: ICompany[] | null) => {
        setCompanies(companies)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await mockResponse()
                setUser(response.data.user)
                setCompanies(response.data.companies)
            } catch (error) {
                setUser(null)
                setCompanies(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    if (loading) {
        return <LoadingPage />
    }

    return <AuthContext.Provider value={{ user, companies, setUserFunction }}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
