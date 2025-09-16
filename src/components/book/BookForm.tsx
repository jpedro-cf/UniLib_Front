import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { IBook } from '@/interfaces/Book'
import { DragDropComponent, DragDropContent, DragDropFileInfo, DragDropImagePreview } from '../forms/drag-drop'
import { useParams } from 'react-router-dom'
import { useBookMutation } from '@/services/books'
import MultipleSelector from '@/components/ui/multiple-selector'
import { useCategories } from '@/services/categories'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_PDF_TYPES = ['application/pdf']

export const bookFormSchema = z
    .object({
        id: z.string().optional(),
        title: z.string(),
        company_id: z.string(),
        description: z.string(),
        image: z
            .instanceof(File, { message: 'Input precisa ser um arquivo.' })
            .refine((file) => {
                return !file || ACCEPTED_IMAGE_TYPES.includes(file.type)
            }, 'Apenas .jpeg, .png, and .webp são suportados.')
            .optional(),
        pdf: z
            .instanceof(File, { message: 'Input precisa ser um arquivo.' })
            .refine((file) => {
                return !file || ACCEPTED_PDF_TYPES.includes(file.type)
            }, 'Apenas .pdf é suportado.')
            .optional(),
        categories: z
            .array(
                z.object({
                    value: z.string(),
                    label: z.string()
                })
            )
            .optional()
    })
    .superRefine((data, ctx) => {
        const isEdit = Boolean(data.id)

        if (!isEdit && !data.image) {
            ctx.addIssue({
                path: ['image'],
                code: 'custom',
                message: 'Imagem é obrigatória na criação.'
            })
        }

        if (!isEdit && !data.pdf) {
            ctx.addIssue({
                path: ['pdf'],
                code: 'custom',
                message: 'PDF é obrigatório na criação.'
            })
        }
    })

export type BookFormSchema = z.infer<typeof bookFormSchema>

interface Props {
    book?: IBook
}
export function BookForm({ book }: Props) {
    const { id: companyId } = useParams()
    const { data: categories } = useCategories()

    const form = useForm<BookFormSchema>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            id: book?.id,
            company_id: companyId,
            categories: book?.categories.map((c) => ({ value: c.id, label: c.title }))
        }
    })

    const { mutate, isPending } = useBookMutation()

    if (!companyId) {
        return <>Id inválido.</>
    }

    function handleImageSelect(file: File | null) {
        if (!file) {
            return
        }
        form.setValue('image', file, { shouldValidate: true })
    }

    function handlePdfSelect(file: File | null) {
        if (!file) {
            return
        }
        form.setValue('pdf', file, { shouldValidate: true })
    }

    function handleSubmit(data: BookFormSchema) {
        mutate(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Título:</FormLabel>
                            <Input placeholder="Título" {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ fieldState }) => (
                        <FormItem>
                            <FormLabel>Imagem:</FormLabel>
                            <DragDropComponent
                                initialPreview={book?.image}
                                onFileSelect={handleImageSelect}
                                className={`w-full h-[150px] ${fieldState.error && 'bg-red-50 border-red-400'}`}
                            >
                                <DragDropContent />
                                <DragDropImagePreview />
                                <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-[90%] m-5 bottom-0"></DragDropFileInfo>
                            </DragDropComponent>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pdf"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>PDF: {field.value?.name}</FormLabel>
                            <DragDropComponent
                                onFileSelect={handlePdfSelect}
                                className={`w-full h-[150px] ${fieldState.error && 'bg-red-50 border-red-400'}`}
                            >
                                <DragDropContent />
                                <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-[90%] m-5 bottom-0"></DragDropFileInfo>
                            </DragDropComponent>
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
                <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorias:</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={
                                        categories?.content?.map((category) => ({
                                            value: category.id,
                                            label: category.title
                                        })) ?? []
                                    }
                                    placeholder="Escolher categorias..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={'blue'} className="col-span-2" disabled={isPending}>
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
