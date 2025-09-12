import { ICategory } from './Category'
import { IUser } from './User'

export interface IBookReview {
    id: string
    name: string
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

export interface IReadBookResponse {
    url: string
    book: IBook
}

export type BorrowStatus = 'COMPLETED' | 'IN_PROGRESS' | 'WAITING'

export interface IBorrowedBook {
    id: string
    book: Partial<IBook>
    user: Partial<IUser>
    status: BorrowStatus
    expires_at: Date
    release_at: Date
}
