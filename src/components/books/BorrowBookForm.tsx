import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { DatePicker } from '../ui/date-picker'
import { IBook } from '@/interfaces'
import { useBorrowBook } from '@/services/books'

export const borrowBookFormSchema = z
    .object({
        bookId: z.string(),
        release: z
            .date()
            .optional()
            .refine(
                (date) => {
                    if (!date) return true // se for opcional, ignora
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date >= today
                },
                {
                    message: 'A data de liberação não pode ser antes de hoje.'
                }
            ),
        expiration: z.date().refine(
            (date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                const minDate = new Date(today)
                minDate.setDate(minDate.getDate() + 1) // amanhã

                return date >= minDate
            },
            {
                message: 'A data de expiração deve ser pelo menos 1 dia após hoje.'
            }
        )
    })
    .superRefine((data, ctx) => {
        if (data.release && data.expiration < data.release) {
            ctx.addIssue({
                code: 'custom',
                path: ['expiration'],
                message: 'A expiração não pode ser antes da liberação.'
            })
        }
    })

export type BorrowBookFormSchema = z.infer<typeof borrowBookFormSchema>

interface Props {
    book: IBook
}
export function BorrowBookForm({ book }: Props) {
    const form = useForm<BorrowBookFormSchema>({
        resolver: zodResolver(borrowBookFormSchema),
        defaultValues: { bookId: book.id }
    })

    const { mutate, isPending } = useBorrowBook()

    function handleSubmit(data: BorrowBookFormSchema) {
        mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-3 sm:items-end">
                <FormField
                    control={form.control}
                    name="expiration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <div>Quando você quer retornar o livro?</div>
                            </FormLabel>
                            <DatePicker selected={field.value} onSelect={field.onChange}>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        type="button"
                                        className={cn(
                                            'w-full sm:w-[240px] pl-3 text-left font-normal',
                                            !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        {field.value ? format(field.value, 'PPP') : <span>Selecionar uma data</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </DatePicker>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={'blue'} disabled={isPending}>
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
