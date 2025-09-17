import { ICategory } from './Category'
import { ICompany } from './Company'

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
    categories: ICategory[]
    reviews: IBookReview[]
    description: string
    image: string
    pdf: string
    company: ICompany
    createdAt: Date
    updatedAt: Date
}

export interface IReadBookResponse {
    url: string
    book: IBook
}

export type BorrowStatus = 'COMPLETED' | 'IN_PROGRESS' | 'WAITING'

export interface IBorrowedBook {
    id: string
    book: Partial<IBook>
    username: string
    email: string
    status: BorrowStatus
    expires_at: Date
    release_at: Date
}
