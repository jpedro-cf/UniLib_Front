import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ICategory } from '@/interfaces/Category'
import { PropsWithChildren, useState } from 'react'
import { CategoryForm } from '../categories/CategoryForm'

interface Props extends PropsWithChildren {
    category?: ICategory
}
export function CategoryDialog({ category, children }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[425px] max-h-[95vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Publicar Categoria</DialogTitle>
                </DialogHeader>
                <CategoryForm category={category} closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
