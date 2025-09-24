import { PropsWithChildren, useState } from 'react'
import logo from '../../../public/images/logos/logo5.svg'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { NavLink } from 'react-router-dom'
import { BookText, List, PersonStandingIcon, PlusCircle, Star } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { cva } from 'class-variance-authority'
import { CreateCompanyDialog } from '../dialogs/CreateCompanyDialog'
import { Button } from '../ui/button'

const linksProperties = cva('flex items-center gap-2 font-semibold py-1 px-3 rounded-sm', {
    variants: {
        active: {
            true: 'bg-blue-500 text-gray-100',
            false: 'text-slate-700'
        },
        pending: {
            true: '',
            false: ''
        }
    },
    defaultVariants: {
        active: false,
        pending: false
    }
})

interface Props extends PropsWithChildren {}

export function SidebarSheet({ children }: Props) {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)

    const handleLinkClick = () => {
        setOpen(false) // fecha o sheet ao clicar no link
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="fixed right-0 top-0 h-full w-[250px] border-l border-blue-100/80 bg-white shadow-lg">
                <div className="flex flex-col h-full">
                    <SheetHeader>
                        <img src={logo} alt="Logo" className="max-w-[100px]" />
                    </SheetHeader>
                    <CreateCompanyDialog>
                        <Button variant={'blue'} className="my-6">
                            Criar Empresa <PlusCircle className="ms-3" />
                        </Button>
                    </CreateCompanyDialog>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    linksProperties({ active: isActive, pending: isPending })
                                }
                                onClick={handleLinkClick}
                            >
                                <BookText size={20} />
                                Livros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/categorias"
                                className={({ isActive, isPending }) =>
                                    linksProperties({ active: isActive, pending: isPending })
                                }
                                onClick={handleLinkClick}
                            >
                                <List size={20} />
                                Categorias
                            </NavLink>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <NavLink
                                        to="/meus-livros"
                                        className={({ isActive, isPending }) =>
                                            linksProperties({ active: isActive, pending: isPending })
                                        }
                                        onClick={handleLinkClick}
                                    >
                                        <BookText size={20} />
                                        Meus Livros
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/minhas-reviews"
                                        className={({ isActive, isPending }) =>
                                            linksProperties({ active: isActive, pending: isPending })
                                        }
                                        onClick={handleLinkClick}
                                    >
                                        <Star size={20} />
                                        Minhas Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/perfil"
                                        className={({ isActive, isPending }) =>
                                            linksProperties({ active: isActive, pending: isPending })
                                        }
                                        onClick={handleLinkClick}
                                    >
                                        <PersonStandingIcon size={20} />
                                        Perfil
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    )
}
