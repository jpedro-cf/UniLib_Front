import { useAuth } from '@/context/auth-context'
import { ICategory } from '@/interfaces/Category'
import { ChartBarStackedIcon, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useCategoryDeletion } from '@/services/categories'

interface Props {
    category: ICategory
}

export function CategoriesCard({ category }: Props) {
    const { user } = useAuth()
    const { mutate, isPending } = useCategoryDeletion()

    const canDelete = user?.memberships.some((m) => m.role == 'ADMIN' || m.role == 'OWNER')

    return (
        <div className="flex gap-3 bg-[#fff] p-5 rounded-md border border-blue-100">
            <div>
                <span className="bg-blue-500 block p-2 rounded-[50%]">
                    <ChartBarStackedIcon size={20} color="#fff" />
                </span>
            </div>
            <div>
                <span className="font-semibold block mb-1">{category.title}</span>
                <div className="font-normal text-slate-500 text-sm">{category.description}</div>
            </div>
            {canDelete && (
                <Button
                    size={'sm'}
                    variant={'destructive'}
                    className="ms-auto"
                    onClick={() => mutate(category.id)}
                    disabled={isPending}
                >
                    <Trash size={16} />
                </Button>
            )}
        </div>
    )
}
