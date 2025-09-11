import { Card, CardContent } from '@/components/ui/card'
import { cva } from 'class-variance-authority'
import { cn, formatFileSize } from '@/lib/utils'
import { DragDropContext, useDragDrop, useDragDropContext } from './model'
import { Button } from '@/components/ui/button'
import { CloudUpload, Image, Trash } from 'lucide-react'

export const dragDropVariants = cva(
    'p-3 h-full border-2 border-blue-600/40 border-dashed transition-all hover:bg-blue-50 cursor-pointer',
    {
        variants: {
            variant: {
                default: '',
                over: 'bg-blue-50 border-blue-800'
            }
        }
    }
)

interface IDragDropProps extends React.ComponentProps<'div'> {
    onFileSelect: (file: File | null) => void
    initialPreview?: string
}

export function DragDropComponent({ onFileSelect, children, initialPreview, ...props }: IDragDropProps) {
    const data = useDragDrop({ onFileSelect, initialPreview })
    const {
        currentFile,
        currentVariant,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileInputChange,
        inputRef
    } = data

    return (
        <DragDropContext.Provider value={{ data }}>
            <Card
                className={cn(
                    dragDropVariants({ variant: currentVariant.variant }),
                    `cursor-${currentFile ? 'default' : 'pointer'}`,
                    props.className
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => (currentFile ? {} : inputRef.current?.click())}
            >
                <CardContent
                    className="p-0 rounded-md w-full h-full overflow-hidden 
                    flex items-center flex-col justify-center relative"
                >
                    {children}
                    <input ref={inputRef} type="file" className="hidden" onChange={handleFileInputChange} />
                </CardContent>
            </Card>
        </DragDropContext.Provider>
    )
}

export function DragDropContent({ className, ...props }: React.ComponentProps<'div'>) {
    const { data } = useDragDropContext()
    const { preview, inputRef, currentFile } = data

    if (currentFile) {
        return <></>
    }

    return (
        <div
            className={cn('flex flex-col gap-3 items-center justify-center text-center', className)}
            {...props}
            hidden={currentFile != null}
        >
            <CloudUpload className="text-primary/80" size={32} />
            <span className="text-sm leading-5 text-gray-500 font-semibold">Escolha um arquivo ou arraste aqui.</span>
            <Button
                type="button"
                variant={'ghost'}
                size={'sm'}
                className="z-10 bg-blue-200 hover:bg-blue-300 mt-2"
                hidden={preview != ''}
                onClick={() => inputRef.current?.click()}
            >
                Escolher arquivo
            </Button>
        </div>
    )
}

export function DragDropImagePreview({ ...props }: React.ComponentProps<'img'>) {
    const { data } = useDragDropContext()
    const { preview, currentFile } = data
    return (
        <img
            {...props}
            alt="Preview image"
            src={preview}
            hidden={!currentFile}
            className="h-full w-full object-cover z-0"
        />
    )
}

export function DragDropFileInfo({ children, ...props }: React.ComponentProps<'div'>) {
    const { data } = useDragDropContext()
    const { currentFile, handleFileChange } = data
    if (!currentFile) {
        return <></>
    }
    return (
        <Card {...props} hidden={!currentFile}>
            {children}
            <CardContent className="flex p-3 gap-3 items-center">
                <Image className="text-primary/80" size={20} />
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 max-w-full">
                        <span className="text-xs text-gray-400">{formatFileSize(currentFile?.size ?? 0)}</span>
                    </div>
                    <Button
                        size={'icon'}
                        className="p-1 bg-blue-200 hover:bg-blue-100"
                        variant={'ghost'}
                        type="button"
                        onClick={() => {
                            handleFileChange(null)
                        }}
                    >
                        <Trash size={16} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
