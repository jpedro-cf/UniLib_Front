import { ReviewsTable } from '@/components/books/ReviewsTable'
import { useAuth } from '@/context/auth-context'
import { useReviews } from '@/services/books'
import { useNavigate } from 'react-router-dom'

export function ReviewsPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: reviews, isLoading } = useReviews()
    if (!user) {
        navigate('/', { replace: true })
    }
    return (
        <>
            <h1 className="text-xl font-semibold mb-9 cursor-default">Minhas Reviews</h1>
            {isLoading ? 'Carregando...' : <ReviewsTable items={reviews ?? []} />}
        </>
    )
}
