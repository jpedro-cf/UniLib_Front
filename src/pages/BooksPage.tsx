import { BooksCard } from '@/components/books/Card'
import { SkeletonCard } from '@/components/skeleton/SkeletonCard'
import { IBook } from '@/interfaces/Book'
import { useBooks } from '@/services/books'

export const BooksPage = () => {
    const books = useBooks()

    return (
        <>
            <h1 className="text-xl font-semibold mb-9">Livros</h1>

            {(books.isLoading || books.isError || books.data.length <= 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {books.isSuccess && books.data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
                    {books.data.map((book: IBook) => (
                        <BooksCard book={book} />
                    ))}
                </div>
            )}
        </>
    )
}
