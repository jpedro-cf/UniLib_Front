import { PropsWithChildren } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BookReviewForm } from './BookReviewForm'

interface Props extends PropsWithChildren {
    book_id: string
}
export function BookReviewDialog({ book_id, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Adicionar review</DialogTitle>
                </DialogHeader>
                <BookReviewForm book_id={book_id} />
            </DialogContent>
        </Dialog>
    )
}
