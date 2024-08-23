import { ICategory } from '@/interfaces/Category'
import { ChartBarStackedIcon } from 'lucide-react'

interface Props {
    category: ICategory
}

export const CategoriesCard = ({ category }: Props) => {
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
        </div>
    )
}
