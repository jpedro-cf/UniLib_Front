import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useReviewMutation } from '@/services/books'

const bookReviewFormSchema = z.object({
    book_id: z.string(),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string()
})

export type BookReviewSchema = z.infer<typeof bookReviewFormSchema>

interface Props {
    book_id: string
    closeDialog?: () => void
}
export function BookReviewForm({ book_id, closeDialog }: Props) {
    const form = useForm<BookReviewSchema>({
        resolver: zodResolver(bookReviewFormSchema),
        defaultValues: { book_id: book_id }
    })
    const { mutate, isPending } = useReviewMutation()

    function handleSubmit(data: BookReviewSchema) {
        mutate(data, {
            onSuccess: () => closeDialog?.()
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avaliação:</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Escolha a avaliação" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={'1'}>1 Estrela</SelectItem>
                                    <SelectItem value={'2'}>2 Estrelas</SelectItem>
                                    <SelectItem value={'3'}>3 Estrelas</SelectItem>
                                    <SelectItem value={'4'}>4 Estrelas</SelectItem>
                                    <SelectItem value={'5'}>5 Estrelas</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comentário:</FormLabel>
                            <Textarea rows={4} placeholder="Adicione um comentário" {...field} />
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
