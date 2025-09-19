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
import { CreateCompanyDialog } from '../dialogs/CreateCompanyDialog'
import { Button } from '../ui/button'
import { useLogoutMutation } from '@/services/users'

export function CurrentUserInfo() {
    const auth = useAuth()
    const { mutate, isPending } = useLogoutMutation()

    if (!auth.user) {
        return (
            <div className="flex gap-3">
                <NavLink to={'/login'}>
                    <Button variant={'blue'}>Entrar</Button>
                </NavLink>
                <NavLink to={'/criar-conta'}>
                    <Button>Criar conta</Button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
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
                    <DropdownMenuLabel className="cursor-default">Perfil</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <NavLink to={'/perfil'} className={'w-full'}>
                                Perfil
                            </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NavLink to={'/'} className={'w-full'} onClick={() => !isPending && mutate()}>
                                Sair
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {auth.user.memberships && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="cursor-default">Empresas</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {auth.user.memberships.map((membership) => (
                                    <DropdownMenuItem>
                                        <NavLink to={`/admin/empresas/${membership.company.id}`} className={'w-full'}>
                                            {membership.company.name}
                                        </NavLink>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <CreateCompanyDialog>
                <Button variant={'blue'} className="">
                    Criar Empresa
                </Button>
            </CreateCompanyDialog>
        </div>
    )
}
