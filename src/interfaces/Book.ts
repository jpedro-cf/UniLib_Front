import { ICategory } from './Category'

export interface IBookReview {
    id: string
    name: number
    rating: number
    comment: string
    date: Date
}

export interface IBook {
    id: string
    title: string
    available: boolean
    rating: number
    categories: ICategory[]
    reviews: IBookReview[]
    description: string
    image: string
    pdf: string
    company_id: string
    has_ebook: boolean
    created_at: Date
    updated_at: Date
}
