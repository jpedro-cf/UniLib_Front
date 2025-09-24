import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { CompanyMemberForm } from '../companies/CompanyMemberForm'

interface Props extends React.PropsWithChildren {
    company_id: string
}
export function CompanyMemberDialog({ children, company_id }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[425px] max-h-[95vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Membro da Empresa</DialogTitle>
                </DialogHeader>
                <CompanyMemberForm company_id={company_id} closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
