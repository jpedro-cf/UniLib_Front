import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IBorrowedBook } from '@/interfaces/Book'
import { Button } from '../ui/button'
import { Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { BorrowedBookStatus } from './BorrowedBookStatus'
import { BorrowAction, useBorrowedBookMutation } from '@/services/books'

interface Props {
    admin: boolean
    items: IBorrowedBook[]
}
export function BorrowedBooksTable({ items, admin }: Props) {
    return (
        <Table>
            <TableCaption>Esses são todos os livros.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Livro</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Solicitado em:</TableHead>
                    <TableHead>Expira em:</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow>
                        <TableCell>{item.book.title}</TableCell>
                        <TableCell>
                            {item.user.name} - {item.user.email}
                        </TableCell>
                        <TableCell>
                            <BorrowedBookStatus status={item.status} />
                        </TableCell>
                        <TableCell>{item.release_at.toDateString()}</TableCell>
                        <TableCell>{item.expires_at.toDateString()}</TableCell>
                        <TableCell>
                            {admin ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button size={'sm'} variant={'outline'}>
                                            <Settings className="me-2" size={16} /> Ações
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <AdminActions item={item} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <NavLink to={`/${item.book.id}/reader`}>
                                    <Button variant={'blue'} size={'sm'} disabled={item.status != 'IN_PROGRESS'}>
                                        Ler livro
                                    </Button>
                                </NavLink>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function AdminActions({ item }: { item: IBorrowedBook }) {
    const approve = { borrow_id: item.id, action: BorrowAction.APPROVE }
    const deny = { borrow_id: item.id, action: BorrowAction.DENY }

    const { mutate, isPending } = useBorrowedBookMutation()

    return (
        <>
            <DropdownMenuItem>
                <button
                    disabled={isPending}
                    className="w-full text-start"
                    type="button"
                    onClick={() => mutate(approve)}
                >
                    Aceitar
                </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <button disabled={isPending} className="w-full text-start" type="button" onClick={() => mutate(deny)}>
                    Negar
                </button>
            </DropdownMenuItem>
        </>
    )
}
