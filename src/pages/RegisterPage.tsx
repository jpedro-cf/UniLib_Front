import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRegisterMutation } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export type RegisterFormSchema = z.infer<typeof registerFormSchema>

export function RegisterPage() {
    const { mutate, isPending } = useRegisterMutation()
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    })

    function handleSubmit(data: RegisterFormSchema) {
        mutate(data)
    }

    return (
        <div className="flex items-center justify-center bg-slate-100 min-h-screen w-full">
            <div className="p-5 rounded-md bg-white shadow-sm w-[95vw] md:w-1/3">
                <h1 className="font-bold text-xl mb-5">Crie uma conta</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome:</FormLabel>
                                    <Input placeholder="Nome" {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha:</FormLabel>
                                    <Input type="password" placeholder="*****" {...field} />
                                </FormItem>
                            )}
                        />
                        <Button variant={'blue'} type="submit" disabled={isPending}>
                            Enviar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
