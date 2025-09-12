import { ICompany } from '@/interfaces/Company'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { deleteCompany, editCompany } from '@/services/companies'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview
} from '@/components/forms/drag-drop'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

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

interface Props {
    company?: ICompany
}

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

    const deleteMutation = useMutation({
        mutationFn: () => deleteCompany(company!.id!),
        onSuccess: () => {
            toast({
                title: 'Deletado!',
                variant: 'default',
                description: <div>Empresa deletada com sucesso.</div>
            })
            window.location.reload()
        },
        onError: () => {
            toast({
                title: 'Erro!',
                variant: 'destructive',
                description: <div>Ocorreu um erro ao deletar a empresa.</div>
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

    const pending = editMutation.isPending || createMutation.isPending || deleteMutation.isPending
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 w-full bg-[#fff] p-8 rounded-md border">
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
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <Button disabled={pending} type="submit">
                            Salvar
                        </Button>
                        {company && (
                            <Button
                                disabled={pending}
                                type="button"
                                variant={'destructive'}
                                onClick={() => deleteMutation.mutate()}
                            >
                                Deletar
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}
