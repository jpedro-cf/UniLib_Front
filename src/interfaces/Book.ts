import { ICategory } from './Category'

export interface IBook {
    id: string
    title: string
    available: boolean
    rating: number
    categories: ICategory[]
    description: string
    image: string
    pdf: string
    company_id: string
    has_ebook: boolean
    created_at: Date
    updated_at: Date
}
