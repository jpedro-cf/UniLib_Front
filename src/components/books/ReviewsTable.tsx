import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IBookReview } from '@/interfaces'
import { Ratings } from '../ui/rating'
import { Button } from '../ui/button'
interface Props {
    items: IBookReview[]
}
export function ReviewsTable({ items }: Props) {
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
                            <Ratings rating={item.rating} />
                        </TableCell>
                        <TableCell>{item.comment}</TableCell>
                        <TableCell>{new Date(item.createdAt).toString()}</TableCell>
                        <TableCell>
                            <Button variant={'destructive'}>Deletar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
