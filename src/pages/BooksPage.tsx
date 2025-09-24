import { BooksCard } from '@/components/books/Card'
import { SkeletonCard } from '@/components/skeleton/SkeletonCard'
import { IBook } from '@/interfaces/Book'
import { useBooks } from '@/services/books'

export const BooksPage = () => {
    const { data, isLoading, isError, isSuccess } = useBooks({})

    return (
        <>
            <h1 className="text-xl font-semibold mb-9 cursor-default">Livros</h1>

            {(isLoading || isError) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {isSuccess && data.content.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
                    {data.content.map((book: IBook) => (
                        <BooksCard book={book} key={book.id} />
                    ))}
                </div>
            )}
        </>
    )
}
