import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IBookReview } from '@/interfaces'
import { Ratings } from '../ui/rating'
import { Button } from '../ui/button'
import { useReviewDeletion } from '@/services/books'
import { format } from 'date-fns'
interface Props {
    items: IBookReview[]
}
export function ReviewsTable({ items }: Props) {
    const { mutate, isPending } = useReviewDeletion()
    return (
        <Table>
            <TableCaption>Essas são todas as reviews.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nota</TableHead>
                    <TableHead>Comentário</TableHead>
                    <TableHead>Adicionado em</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow>
                        <TableCell>
                            <Ratings rating={item.rating} variant="yellow" size={16} />
                        </TableCell>
                        <TableCell>
                            <div className="w-[400px] overflow-hidden overflow-ellipsis break-words">
                                {item.comment.length > 100 ? item.comment.slice(0, 100).concat('...') : item.comment}
                            </div>
                        </TableCell>
                        <TableCell>{format(new Date(item.createdAt), 'PPP')}</TableCell>
                        <TableCell>
                            <Button variant={'destructive'} disabled={isPending} onClick={() => mutate(item.id)}>
                                Deletar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
