import { ICompany } from '@/interfaces/Company'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { editCompany } from '@/services/companies'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'

interface Props {
    company: ICompany
}

export const EditCompanyFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string()
})

export const EditCompanyForm = ({ company }: Props) => {
    const form = useForm<z.infer<typeof EditCompanyFormSchema>>({
        resolver: zodResolver(EditCompanyFormSchema),
        defaultValues: {
            id: company.id,
            name: company.name,
            description: company.description,
            image: company.image
        }
    })

    const mutation = useMutation({
        mutationFn: editCompany,
        onSuccess: () => {
            toast({
                title: 'Editado!',
                variant: 'default',
                description: <div>Empresa edita com sucesso.</div>
            })
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao editar a empresa.</div>
            })
            window.location.reload()
        }
    })
    function onSubmit(values: z.infer<typeof EditCompanyFormSchema>) {
        mutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 w-full bg-[#fff] p-8 rounded-md border">
                <div className="h-[250px] w-[250px] rounded-full overflow-hidden border">
                    <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome:</FormLabel>
                                <Input placeholder="Nome" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea placeholder="Descrição" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={mutation.isPending} type="submit">
                        Salvar
                    </Button>
                </div>
            </form>
        </Form>
    )
}
