import { IUser } from './User'

export interface ICompany {
    id: string
    name: string
    description: string
    image: string
    createdAt: Date
}

export type CompanyRole = 'OWNER' | 'ADMIN' | 'MANAGER'

export interface ICompanyMember {
    id: string
    user: Partial<IUser>
    company: Partial<ICompany>
    role: CompanyRole
}
