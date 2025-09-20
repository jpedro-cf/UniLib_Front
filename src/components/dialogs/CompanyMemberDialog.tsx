import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { CompanyMemberForm } from '../companies/CompanyMemberForm'

interface Props extends React.PropsWithChildren {
    company_id: string
}
export function CompanyMemberDialog({ children, company_id }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Membro da Empresa</DialogTitle>
                </DialogHeader>
                <CompanyMemberForm company_id={company_id} />
            </DialogContent>
        </Dialog>
    )
}
