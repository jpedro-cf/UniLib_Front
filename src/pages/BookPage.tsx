import { useNavigate, useParams } from 'react-router-dom'
import { IBook } from '@/interfaces/Book'
import { useBook, useBooks } from '@/services/books'
import { ICategory } from '@/interfaces/Category'
import { SkeletonBook } from '@/components/skeleton/SkeletonBook'
import { Reviews } from '@/components/book/Reviews'
import { RelatedBooks } from '@/components/book/RelatedBooks'
import { CompanyInfo } from '@/components/book/CompanyInfo'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DoorOpen, FileWarningIcon, Heart, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export const BookPage = () => {
    const { id } = useParams<{ id: IBook['id'] }>()
    const navigate = useNavigate()

    if (!id) {
        navigate('/', { replace: true })
    }

    const book = useBook(id!)
    const books = useBooks()

    useEffect(() => {
        book.refetch()
        books.refetch()
    }, [id])

    if (book.isLoading || book.isRefetching) {
        return <SkeletonBook />
    }

    if (book.isError) {
        return (
            <Alert>
                <FileWarningIcon size={20} />
                <AlertTitle className="text-lg">Livro não encontrado!</AlertTitle>
                <AlertDescription>
                    <p className="mb-2">O livro solicitado não foi encontrado no sistema.</p>
                    <Button variant={'blue'} onClick={() => navigate(-1)}>
                        Voltar <DoorOpen size={14} className="ms-3" />{' '}
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <>
            {book.isSuccess && book.data && (
                <>
                    <div className="mx-auto bg-white rounded-lg shadow-md p-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div>
                            <img
                                src={book.data.image}
                                alt={book.data.title}
                                className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-semibold mt-4">{book.data.title}</h1>
                            <p className="text-sm mt-2">
                                {book.data.available ? (
                                    <span className="text-green-600">Disponível</span>
                                ) : (
                                    <span className="text-red-600">Indisponível</span>
                                )}
                            </p>
                            <div className="flex items-center mt-2">
                                <p className="text-yellow-500 font-semibold">{book.data.rating} / 5</p>
                                <div className="ml-2 flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < book.data.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.386 4.26a1 1 0 00.95.69h4.488c.97 0 1.371 1.24.588 1.81l-3.63 2.57a1 1 0 00-.363 1.118l1.386 4.26c.3.921-.755 1.688-1.539 1.118l-3.63-2.57a1 1 0 00-1.175 0l-3.63 2.57c-.783.57-1.838-.197-1.539-1.118l1.386-4.26a1 1 0 00-.363-1.118l-3.63-2.57c-.783-.57-.382-1.81.588-1.81h4.488a1 1 0 00.95-.69l1.386-4.26z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">{book.data.description}</p>
                            <div className="flex flex-wrap mt-4">
                                {book.data.categories.map((category: ICategory, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                            <div className="flex my-8 gap-5">
                                <Button
                                    variant={'blue'}
                                    size={'lg'}
                                    className="w-auto"
                                    onClick={() =>
                                        toast({
                                            variant: 'default',
                                            title: 'Solicitado!',
                                            description: 'Livro solicitado para empréstimo, aguarde a confirmação.'
                                        })
                                    }
                                >
                                    Obter livro <ShoppingBag size={16} className="ms-3" />
                                </Button>
                            </div>
                            <CompanyInfo />
                        </div>
                    </div>
                    <Reviews reviews={book.data.reviews} />
                    {/* Mudar isso depois, colocar um isLoading... */}
                    <RelatedBooks tituloSecao="Livros da mesma empresa" books={books.data?.content ?? []} />
                </>
            )}
        </>
    )
}
