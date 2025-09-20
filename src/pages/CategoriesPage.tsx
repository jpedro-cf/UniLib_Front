import { CategoriesCard } from '@/components/categories/Card'
import { CategoryDialog } from '@/components/dialogs/CategoryDialog'
import { SkeletonCard } from '@/components/skeleton/SkeletonCard'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import { ICategory } from '@/interfaces/Category'
import { useCategories } from '@/services/categories'

export const CategoriesPage = () => {
    const { data, isLoading, isError, isSuccess } = useCategories()
    const { user } = useAuth()

    const canCreateCategory = user?.memberships.some((m) => m.role == 'ADMIN' || m.role == 'OWNER')

    return (
        <div>
            <h1 className="text-xl font-semibold mb-9">Categorias</h1>
            {canCreateCategory && (
                <CategoryDialog>
                    <Button variant={'blue'} className="mb-5">
                        Criar categoria
                    </Button>
                </CategoryDialog>
            )}

            {(isLoading || isError) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {isSuccess && data?.content.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
                    {data.content.map((category: ICategory) => (
                        <CategoriesCard category={category} key={category.id} />
                    ))}
                </div>
            )}
        </div>
    )
}
