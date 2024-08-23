import { IBook } from '@/interfaces/Book'
import { ICategory } from '@/interfaces/Category'
import { Badge } from '../ui/badge'
import { Ratings } from '../ui/rating'
import { Button } from '../ui/button'
import { HeartIcon, PlusCircle } from 'lucide-react'
import { toast } from '../ui/use-toast'

interface Props {
    book: IBook
}

export const BooksCard = ({ book }: Props) => {
    return (
        <div className="overflow-hidden rounded-md border border-blue-100">
            <div className="overflow-hidden h-[200px]">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 bg-[#fff]">
                <div className="flex gap-2 flex-wrap mb-3">
                    {book.categories.map((category: ICategory) => (
                        <Badge variant={'secondary'}>{category.title}</Badge>
                    ))}
                </div>
                <Ratings rating={book.rating} size={16} variant="yellow" className="mb-1" />
                <h3 className="font-semibold mb-2">{book.title}</h3>
                <div className="text-sm text-slate-500 font-normal max-h-[60px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,255,255,0.95)] to-transparent pointer-events-none"></div>
                    {book.description}
                </div>
                <div className="flex mt-5 gap-3">
                    <Button variant={'blue'} size={'sm'}>
                        Ver mais <PlusCircle size={16} className="ms-2" />{' '}
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="text-destructive  hover:text-slate-100 hover:border-destructive hover:bg-destructive"
                        onClick={() =>
                            toast({
                                variant: 'default',
                                title: 'Favoritado!',
                                description: 'Livro favoritado com sucesso.'
                            })
                        }
                    >
                        <HeartIcon size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
