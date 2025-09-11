import { useBooks } from '@/services/books'
import { SkeletonCard } from '../skeleton/SkeletonCard'
import { BooksCard } from '../books/Card'
import { IBook } from '@/interfaces/Book'

interface Props {
    id: string
}
export function CompanyBooks({ id }: Props) {
    const books = useBooks(id)
    return (
        <div>
            {(books.isLoading || books.isError || books.data?.length <= 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {books.isSuccess && books.data?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
                    {books.data.map((book: IBook) => (
                        <BooksCard book={book} key={book.id} />
                    ))}
                </div>
            )}
        </div>
    )
}
