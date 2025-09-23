import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { CompanyForm } from '../companies/CompanyForm'

export function CreateCompanyDialog({ children }: React.PropsWithChildren) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Criar Empresa</DialogTitle>
                </DialogHeader>
                <CompanyForm closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}
