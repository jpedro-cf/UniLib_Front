import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-context'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { NavLink } from 'react-router-dom'

export function CurrentUserInfo() {
    const auth = useAuth()

    if (!auth.user) {
        return
        // ancora para a pagina de login?
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-slate-100 p-3 rounded-md">
                    <Avatar className="hover:cursor-pointer">
                        <AvatarFallback className="bg-blue-200">
                            {auth.user.name.split('')[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold">{auth.user.name}</span>
                        <span className="text-xs">{auth.user.email}</span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ms-2 w-56">
                <DropdownMenuLabel className='cursor-default'>Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <NavLink to={'/perfil'} className={'w-full'}>
                            Editar Perfil
                        </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <NavLink to={'/'} className={'w-full'}>
                            Sair
                        </NavLink>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {auth.companies && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className='cursor-default'>Empresas</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {auth.companies.map((company) => (
                                <DropdownMenuItem>
                                    <NavLink to={`/admin/empresas/${company.id}`} className={'w-full'}>
                                        {company.name}
                                    </NavLink>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
