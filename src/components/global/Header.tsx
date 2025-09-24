import { DoorOpen, MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { SidebarSheet } from './SidebarSheet'
import { useLogoutMutation } from '@/services/users'
import { useAuth } from '@/context/auth-context'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { NavLink } from 'react-router-dom'

export function Header() {
    const { mutate, isPending } = useLogoutMutation()
    const { user } = useAuth()
    return (
        <header className="bg-white p-5 flex lg:hidden items-center gap-5 justify-between sticky top-0 z-20 shadow-sm">
            {user ? (
                <NavLink to={'/perfil'}>
                    <Button variant={'ghost'} className="py-6 px-4">
                        <Avatar className="hover:cursor-pointer me-2">
                            <AvatarFallback className="bg-blue-200">
                                {user.name.split('')[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        Perfil
                    </Button>
                </NavLink>
            ) : (
                <NavLink to={'/login'}>
                    <Button variant={'blue'} size={'sm'}>
                        Login
                    </Button>
                </NavLink>
            )}
            <div className="flex gap-3">
                {user && (
                    <Button disabled={isPending} onClick={() => mutate()} size={'sm'} variant={'outline'}>
                        <DoorOpen /> Sair
                    </Button>
                )}
                <SidebarSheet>
                    <Button size={'icon'} variant={'blue'}>
                        <MenuIcon />
                    </Button>
                </SidebarSheet>
            </div>
        </header>
    )
}
