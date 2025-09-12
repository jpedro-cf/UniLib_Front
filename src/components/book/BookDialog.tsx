import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IBook } from '@/interfaces/Book'
import { PropsWithChildren } from 'react'
import { BookForm } from './BookForm'

interface Props extends PropsWithChildren {
    book?: IBook
}
export function BookDialog({ book, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>{`${book ? 'Editar Livro' : 'Adicionar Livro'}`}</DialogTitle>
                </DialogHeader>
                <BookForm book={book} />
            </DialogContent>
        </Dialog>
    )
}
