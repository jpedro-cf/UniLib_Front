import { CompanyBooks } from '@/components/companies/CompanyBooks'
import { CompanyMembers } from '@/components/companies/CompanyMembers'
import { CompanyForm } from '@/components/companies/CompanyForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/auth-context'
import { useCompany } from '@/services/companies'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BorrowedBooks } from '@/components/books/BorrowedBooks'

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
                    <CompanyMembers company_id={company.id} />
                </TabsContent>
                <TabsContent value="books">
                    <CompanyBooks id={company.id} />
                </TabsContent>
                <TabsContent value="groups">Turmas</TabsContent>
                <TabsContent value="borrowed">
                    <BorrowedBooks company_id={company.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
