import { PropsWithChildren, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { BookReviewForm } from '../books/BookReviewForm'

interface Props extends PropsWithChildren {
    book_id: string
}
export function BookReviewDialog({ book_id, children }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Adicionar review</DialogTitle>
                </DialogHeader>
                <BookReviewForm book_id={book_id} closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
