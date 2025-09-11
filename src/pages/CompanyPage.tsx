import { CompanyBooks } from '@/components/companies/CompanyBooks'
import { CompanyForm } from '@/components/forms/companies/CompanyForm'
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

    if (!auth.user || !auth.user.memberships || !id) {
        navigate('/', { replace: true })
    }

    if (!auth.user?.memberships?.some((m) => m.company.id == id)) {
        navigate('/', { replace: true })
    }

    const { data: company, isLoading, isRefetching, isError, refetch } = useCompany(id!)
    const users = useUsers()

    useEffect(() => {
        refetch()
    }, [id])

    if (isLoading || isRefetching) {
        return <div>Loading...</div>
    }

    if (isError || !company) {
        return <div>Ocorreu um erro inesperado.</div>
    }

    return (
        <div className="m-5">
            <h2 className="text-xl font-semibold mb-3">{company.name}</h2>
            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="books">Livros</TabsTrigger>
                    <TabsTrigger value="groups">Turmas</TabsTrigger>
                    <TabsTrigger value="borrowed">Livros Emprestados</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <CompanyForm company={company} />
                    {!users.isLoading && !users.isError && (
                        <div className="mt-5">
                            <h2 className="text-lg font-semibold mb-3">Equipe</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {users.data?.map((user: IUser) => (
                                    <UserCard user={user} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="books">
                    <CompanyBooks id={company.id} />
                </TabsContent>
                <TabsContent value="groups">Turmas</TabsContent>
                <TabsContent value="borrowed">Livros Emprestados</TabsContent>
            </Tabs>
        </div>
    )
}
