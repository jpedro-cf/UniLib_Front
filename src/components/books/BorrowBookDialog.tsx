import { IBook } from '@/interfaces'
import { PropsWithChildren } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BorrowBookForm } from './BorrowBookForm'

interface Props extends PropsWithChildren {
    book: IBook
}
export function BorrowBookDialog({ book, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{book.title}</DialogTitle>
                </DialogHeader>
                <BorrowBookForm book={book} />
            </DialogContent>
        </Dialog>
    )
}
