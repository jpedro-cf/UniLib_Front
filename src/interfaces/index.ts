export * from './Book'
export * from './Category'
export * from './Company'
export * from './User'

export interface PaginationResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    last: boolean
}
