import { EditCompanyForm } from '@/components/forms/companies/EditCompanyForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserCard } from '@/components/users/Card'
import { useAuth } from '@/context/auth-context'
import { IUser } from '@/interfaces/User'
import { useCompany } from '@/services/companies'
import { useUsers } from '@/services/users'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const CompanyPage = () => {
    const { id } = useParams()

    const auth = useAuth()
    const navigate = useNavigate()

    if (!auth.user || !auth.companies || !id) {
        navigate('/', { replace: true })
    }

    if (!auth.companies?.some((c) => c.id == id)) {
        navigate('/', { replace: true })
    }

    const company = useCompany(id!)
    const users = useUsers()

    useEffect(() => {
        company.refetch()
    }, [id])

    if (company.isLoading || company.isRefetching) {
        return 'Loading...'
    }

    return (
        <div className="m-5">
            <h2 className="text-xl font-semibold mb-3">{company.data.name}</h2>
            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="books">Livros</TabsTrigger>
                    <TabsTrigger value="groups">Turmas</TabsTrigger>
                    <TabsTrigger value="borrowed">Livros Emprestados</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <EditCompanyForm company={company.data} />
                    {!users.isLoading && !users.isError && (
                        <div className="mt-5">
                            <h2 className="text-lg font-semibold mb-3">Equipe</h2>
                            <div className="grid grid-cols-3 gap-5">
                                {users.data?.map((user: IUser) => (
                                    <UserCard user={user} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="books">Livros</TabsContent>
                <TabsContent value="groups">Turmas</TabsContent>
                <TabsContent value="borrowed">Livros Emprestados</TabsContent>
            </Tabs>
        </div>
    )
}
