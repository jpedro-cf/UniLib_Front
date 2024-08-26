import { CategoriesCard } from '@/components/categories/Card'
import { SkeletonCard } from '@/components/skeleton/SkeletonCard'
import { ICategory } from '@/interfaces/Category'
import { useCategories } from '@/services/categories'

export const CategoriesPage = () => {
    const categories = useCategories()

    return (
        <>
            <h1 className="text-xl font-semibold mb-9">Categorias</h1>

            {(categories.isLoading || categories.isError || categories.data.length <= 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {categories.isSuccess && categories.data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
                    {categories.data.map((category: ICategory) => (
                        <CategoriesCard category={category} key={category.id}/>
                    ))}
                </div>
            )}
        </>
    )
}
