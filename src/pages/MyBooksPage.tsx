import { BorrowedBooksTable } from '@/components/books/BorrowedBooksTable'
import { useAuth } from '@/context/auth-context'
import { useBorrowedBooks } from '@/services/books'
import { useNavigate } from 'react-router-dom'

export function MyBooksPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data, isLoading } = useBorrowedBooks(user != null)

    if (!user) {
        navigate('/', { replace: true })
    }

    if (isLoading) {
        return <>Carregando...</>
    }

    return <BorrowedBooksTable items={data?.content ?? []} admin={false} />
}
