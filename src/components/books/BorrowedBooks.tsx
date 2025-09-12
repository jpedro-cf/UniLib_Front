import { useCompanyBorrowedBooks } from '@/services/companies'
import { BorrowedBooksTable } from './BorrowedBooksTable'

interface Props {
    company_id: string
}

export function BorrowedBooks({ company_id }: Props) {
    const { data: items, isLoading } = useCompanyBorrowedBooks(company_id)
    if (isLoading) {
        return <>Carregando...</>
    }
    return <BorrowedBooksTable admin={true} items={items ?? []} />
}
