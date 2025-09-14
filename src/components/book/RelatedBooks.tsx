import { IBook } from '@/interfaces/Book'
import { BooksCard } from '../books/Card'
import { Link } from 'react-router-dom'

interface Props {
    books: IBook[]
    tituloSecao: string
}

export const RelatedBooks = ({ books, tituloSecao }: Props) => {
    if (!books) {
        return <></>
    }
    return (
        <div className="bg-white p-8 rounded-lg shadow-md mt-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-medium">{tituloSecao}</h2>
                <Link className="text-destructive hover:underline" to="/">
                    Ver Tudo {'>'}
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
                {books.map((book: IBook, index: number) => (
                    <BooksCard book={book} key={index} />
                ))}
            </div>
        </div>
    )
}
