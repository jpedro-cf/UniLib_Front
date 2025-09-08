import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useReader } from '@/services/books'
import { useNavigate, useParams } from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export const Reader = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    if (!id) {
        navigate('/', { replace: true })
    }
    const [numPages, setNumPages] = useState(0)
    const [page, setPage] = useState(1)
    const [scale, setScale] = useState(1.0)

    const { data, isLoading, isRefetching, isError } = useReader(id!)

    if (isLoading || isRefetching) {
        return <>Loading...</>
    }

    if (isError) {
        return <>Ocorreu um erro ao ler o livro, verifique se você realmente tem acesso a esse livro.</>
    }

    return (
        <div className="flex flex-col items-center p-4">
            {/* Barra de controle */}
            <div className="flex items-center gap-4 mb-3">
                {/* Range Zoom */}
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-700" />
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-28 cursor-pointer"
                    />
                </div>

                {/* Navegação */}
                <Button variant={'blue'} onClick={() => setPage(1)} disabled={page <= 1}>
                    <ChevronsLeft className="w-5 h-5" />
                </Button>
                <Button variant={'blue'} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>

                <span className="text-sm">
                    Página {page} de {numPages || '—'}
                </span>

                <Button
                    variant={'blue'}
                    onClick={() => setPage((p) => Math.min(numPages, p + 1))}
                    disabled={page >= numPages}
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
                <Button variant={'blue'} onClick={() => setPage(numPages)} disabled={page >= numPages}>
                    <ChevronsRight className="w-5 h-5" />
                </Button>

                {/* Dropdown para selecionar página */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-2">
                            Ir para página
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                        <DropdownMenuLabel>Selecione a página</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {Array.from({ length: numPages }, (_, i) => (
                                <DropdownMenuItem
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={page === i + 1 ? 'bg-accent' : ''}
                                >
                                    Página {i + 1}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Render PDF */}
            <Document
                file={data?.url ?? '/documents/livro.pdf'}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page pageNumber={page} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
        </div>
    )
}
