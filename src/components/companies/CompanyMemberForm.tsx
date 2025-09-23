import { ICompanyMember } from '@/interfaces/Company'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useUsers } from '@/services/users'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useCompanyMemberMutation } from '@/services/companies'

export const CompanyMemberFormSchema = z.object({
    company_id: z.string(),
    member_id: z.string(),
    role: z.enum(['OWNER', 'ADMIN', 'MANAGER'])
})

interface Props {
    company_id: string
    member?: ICompanyMember
    closeDialog?: () => void
}
export function CompanyMemberForm({ company_id, member, closeDialog }: Props) {
    const form = useForm<z.infer<typeof CompanyMemberFormSchema>>({
        resolver: zodResolver(CompanyMemberFormSchema),
        defaultValues: {
            company_id: company_id,
            member_id: member?.id,
            role: member?.role
        }
    })
    const { mutate, isPending } = useCompanyMemberMutation()

    function onSubmit(values: z.infer<typeof CompanyMemberFormSchema>) {
        mutate(values, {
            onSuccess: () => closeDialog?.()
        })
    }

    const { data } = useUsers()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="member_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Escolha um usuário" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data && data.map((user) => <SelectItem value={user.id}>{user.email}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel>Cargo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Escolha um cargo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="OWNER">DONO</SelectItem>
                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    <SelectItem value="MANAGER">GERENTE</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-3" disabled={isPending}>
                    Salvar
                </Button>
            </form>
        </Form>
    )
}
