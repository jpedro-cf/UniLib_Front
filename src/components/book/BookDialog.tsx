import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IBook } from '@/interfaces/Book'
import { PropsWithChildren, useState } from 'react'
import { BookForm } from './BookForm'

interface Props extends PropsWithChildren {
    book?: IBook
}
export function BookDialog({ book, children }: Props) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[900px] max-h-[95vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>{`${book ? 'Editar Livro' : 'Adicionar Livro'}`}</DialogTitle>
                </DialogHeader>
                <BookForm book={book} closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
