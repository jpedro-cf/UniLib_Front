import { ICategory } from '@/interfaces/Category'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useCategoryMutation } from '@/services/categories'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'

const categoryFormSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string()
})

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>

interface Props {
    category?: ICategory
    closeDialog?: () => void
}
export function CategoryForm({ category, closeDialog }: Props) {
    const form = useForm<CategoryFormSchema>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            id: category?.id,
            title: category?.title,
            description: category?.description
        }
    })

    const { mutate, isPending } = useCategoryMutation()

    function handleSubmit(data: CategoryFormSchema) {
        mutate(data, {
            onSuccess: () => closeDialog?.()
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título:</FormLabel>
                            <Input placeholder="Título" {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição:</FormLabel>
                            <Textarea placeholder="Descrição" rows={4} {...field} />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={'blue'} disabled={isPending}>
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
