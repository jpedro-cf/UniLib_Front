import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ICategory } from '@/interfaces/Category'
import { PropsWithChildren } from 'react'
import { CategoryForm } from '../categories/CategoryForm'

interface Props extends PropsWithChildren {
    category?: ICategory
}
export function CategoryDialog({ category, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Publicar Categoria</DialogTitle>
                </DialogHeader>
                <CategoryForm category={category} />
            </DialogContent>
        </Dialog>
    )
}
