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
import { DragDropComponent, DragDropContent, DragDropFileInfo, DragDropImagePreview } from '../drag-drop'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

interface Props {
    company?: ICompany
}

export const CompanyFormSchema = z
    .object({
        id: z.string().optional(),
        name: z.string(),
        description: z.string(),
        image: z
            .instanceof(File, { message: 'Input precisa ser um arquivo.' })
            .refine((file) => {
                return !file || ACCEPTED_IMAGE_TYPES.includes(file.type)
            }, 'Apenas .jpeg, .png, and .webp são suportados.')
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
    })

export const CompanyForm = ({ company }: Props) => {
    const form = useForm<z.infer<typeof CompanyFormSchema>>({
        resolver: zodResolver(CompanyFormSchema),
        defaultValues: {
            id: company?.id,
            name: company?.name,
            description: company?.description
        }
    })

    const editMutation = useMutation({
        mutationFn: editCompany,
        onSuccess: () => {
            toast({
                title: 'Editado!',
                variant: 'default',
                description: <div>Empresa edita com sucesso.</div>
            })
            window.location.reload()
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao editar a empresa.</div>
            })
        }
    })

    const createMutation = useMutation({
        mutationFn: editCompany,
        onSuccess: () => {
            toast({
                title: 'Sucesso!',
                variant: 'default',
                description: <div>Empresa criada com sucesso.</div>
            })
            window.location.reload()
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao criar a empresa.</div>
            })
        }
    })

    function onSubmit(values: z.infer<typeof CompanyFormSchema>) {
        if (values.id) {
            editMutation.mutate(values)
        }
    }

    function handleFileSelect(file: File | null) {
        if (!file) {
            return
        }
        form.setValue('image', file, { shouldValidate: true })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 w-full bg-[#fff] p-8 rounded-md border">
                {/* Fazer a imagem como um input type file */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ fieldState }) => (
                        <DragDropComponent
                            initialPreview={company?.image}
                            onFileSelect={handleFileSelect}
                            className={`w-full lg:w-[250px] h-[250px] ${
                                fieldState.error && 'bg-red-50 border-red-400'
                            }`}
                        >
                            <DragDropContent />
                            <DragDropImagePreview />
                            <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-[90%] m-5 bottom-0"></DragDropFileInfo>
                        </DragDropComponent>
                    )}
                />
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
                                <Textarea rows={6} placeholder="Descrição" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={editMutation.isPending || createMutation.isPending} type="submit">
                        Salvar
                    </Button>
                </div>
            </form>
        </Form>
    )
}
