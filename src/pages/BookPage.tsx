import { useNavigate, useParams } from 'react-router-dom'
import { IBook } from '@/interfaces/Book'
import { useBook, useBooks } from '@/services/books'
import { ICategory } from '@/interfaces/Category'
import { SkeletonBook } from '@/components/skeleton/SkeletonBook'
import { Reviews } from '@/components/book/Reviews'
import { RelatedBooks } from '@/components/book/RelatedBooks'
import { CompanyInfo } from '@/components/book/CompanyInfo'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DoorOpen, FileWarningIcon, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { env } from '@/config/env'
import { calculateMean } from '@/lib/utils'
import { Ratings } from '@/components/ui/rating'
import { BorrowBookDialog } from '@/components/books/BorrowBookDialog'
import { useAuth } from '@/context/auth-context'
import { ToolTipComponent } from '@/components/ui/tooltip'

export const BookPage = () => {
    const { id } = useParams<{ id: IBook['id'] }>()
    const { user } = useAuth()
    const navigate = useNavigate()

    const { data: book, isLoading, isRefetching, isSuccess, isError, refetch } = useBook(id!)
    const { data: companyBooks, refetch: refetchCompanyBooks } = useBooks({ company_id: book?.company.id, size: 999 })

    useEffect(() => {
        if (!id) {
            navigate('/', { replace: true })
        }
        refetch()
        refetchCompanyBooks()
    }, [id])

    if (isLoading || isRefetching) {
        return <SkeletonBook />
    }

    if (isError) {
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
            {isSuccess && book && (
                <>
                    <div className="mx-auto bg-white rounded-lg shadow-md p-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div>
                            <img
                                src={`${env.storage_url}/${book.image}`}
                                alt={book.title}
                                className="w-full h-[250px] lg:h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-semibold mt-4">{book.title}</h1>
                            <p className="text-sm mt-2">
                                {book ? (
                                    <span className="text-green-600">Disponível</span>
                                ) : (
                                    <span className="text-red-600">Indisponível</span>
                                )}
                            </p>
                            <div className="flex items-center mt-2">
                                <p className="text-yellow-500 font-semibold">
                                    {calculateMean(book.reviews.map((r) => r.rating))} / 5
                                </p>
                                <div className="ml-2 flex">
                                    <Ratings
                                        rating={calculateMean(book.reviews.map((r) => r.rating))}
                                        variant="yellow"
                                    />
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">{book.description}</p>
                            <div className="flex flex-wrap mt-4">
                                {book.categories.map((category: ICategory, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                            <div className="flex my-8 gap-5">
                                <BorrowBookDialog book={book}>
                                    <ToolTipComponent
                                        content={user ? 'Pedir livro emprestado.' : 'Você precisa estar autenticado.'}
                                    >
                                        <Button variant={'blue'} size={'lg'} className="w-auto" disabled={!user}>
                                            Obter livro <ShoppingBag size={16} className="ms-3" />
                                        </Button>
                                    </ToolTipComponent>
                                </BorrowBookDialog>
                            </div>
                            <CompanyInfo company={book.company} />
                        </div>
                    </div>
                    {book.reviews.length > 0 && <Reviews reviews={book.reviews} />}
                    {(companyBooks?.content.length ?? 0) > 0 && (
                        <RelatedBooks tituloSecao="Livros da mesma empresa" books={companyBooks?.content ?? []} />
                    )}
                </>
            )}
        </>
    )
}
