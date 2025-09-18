import { CompanyRole, ICompany } from './Company'

export interface IUser {
    id: string
    name: string
    email: string
}
export interface ICurrentUserData extends IUser {
    memberships: IMembership[]
}
export interface IMembership {
    company: ICompany
    role: CompanyRole
}
