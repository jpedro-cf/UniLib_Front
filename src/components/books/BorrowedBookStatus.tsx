import { BorrowStatus } from '@/interfaces/Book'
import { Badge } from '../ui/badge'

export function BorrowedBookStatus({ status }: { status: BorrowStatus }) {
    const variants: Record<BorrowStatus, JSX.Element> = {
        COMPLETED: (
            <Badge className="bg-green-300 text-gray-950 hover:bg-green-300 hover:text-gray-950">Finalizado</Badge>
        ),
        IN_PROGRESS: <Badge className="bg-blue-500 hover:bg-blue-500">Em progresso</Badge>,
        WAITING: (
            <Badge className="bg-yellow-300 text-gray-950 hover:bg-yellow-300 hover:text-gray-950">Esperando</Badge>
        )
    }

    return variants[status] ?? <Badge>Status inesperado.</Badge>
}
