import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export function LoginPage() {
    const { mutate, isPending } = useLoginMutation()
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema)
    })

    function handleSubmit(data: LoginFormSchema) {
        mutate(data)
    }

    return (
        <div className="flex items-center justify-center bg-slate-100 min-h-screen w-full">
            <div className="p-5 rounded-md bg-white shadow-sm w-[95vw] md:w-1/3">
                <h1 className="font-bold text-xl mb-5">Faça login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
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
