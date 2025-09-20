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
    name: string
    email: string
    companyId: string
    role: CompanyRole
}
