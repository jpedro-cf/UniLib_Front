import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { CompanyForm } from '../companies/CompanyForm'

export function CreateCompanyDialog({ children }: React.PropsWithChildren) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Criar Empresa</DialogTitle>
                </DialogHeader>
                <CompanyForm />
            </DialogContent>
        </Dialog>
    )
}
