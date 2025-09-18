import { ICategory } from './Category'
import { ICompany } from './Company'
import { IUser } from './User'

export interface IBookReview {
    id: string
    user: IUser
    rating: number
    comment: string
    createdAt: Date
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
    book: IBook
    username: string
    email: string
    status: BorrowStatus
    expires_at: Date
    release_at: Date
}
