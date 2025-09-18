import { BorrowedBooksTable } from '@/components/books/BorrowedBooksTable'
import { useAuth } from '@/context/auth-context'
import { useBorrowedBooks } from '@/services/books'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function MyBooksPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data, isLoading } = useBorrowedBooks(user != null)

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true })
        }
    }, [user])

    if (isLoading) {
        return <>Carregando...</>
    }

    console.log(user)

    return <BorrowedBooksTable items={data?.content ?? []} admin={false} />
}
