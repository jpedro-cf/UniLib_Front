import { IUser } from '@/interfaces'
import { useUserMutation } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export const userFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    passwordChange: z
        .object({
            oldPassword: z.string(),
            newPassword: z.string()
        })
        .partial()
        .refine((data) => (!data.oldPassword && !data.newPassword) || (data.oldPassword && data.newPassword), {
            message: 'Preencha os dois campos de senha',
            path: ['newPassword', 'oldPassword']
        })
        .optional()
})

export type UserFormSchema = z.infer<typeof userFormSchema>

interface Props {
    user: IUser
}
export function UserForm({ user }: Props) {
    const form = useForm<UserFormSchema>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email
        }
    })
    const { mutate, isPending } = useUserMutation()

    function handleSubmit(data: UserFormSchema) {
        mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <Input placeholder="Nome:" {...field} className="w-full" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <Input type="email" placeholder="Email:" {...field} className="w-full" />
                        </FormItem>
                    )}
                />
                <div className="sm:col-span-2 font-bold text-lg mt-2">Mudar senha</div>
                <FormField
                    control={form.control}
                    name="passwordChange.oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha antiga (Opcional):</FormLabel>
                            <Input type="password" placeholder="*****" {...field} className="w-full" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordChange.newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha nova (Opcional):</FormLabel>
                            <Input type="password" placeholder="*****" {...field} className="w-full" />
                        </FormItem>
                    )}
                />
                <div>
                    <Button className="sm:col-span-2 w-full" type="submit" disabled={isPending} variant={'blue'}>
                        Enviar
                    </Button>
                </div>
            </form>
        </Form>
    )
}
