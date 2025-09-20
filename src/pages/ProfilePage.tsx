import { UserForm } from '@/components/users/UserForm'
import { useAuth } from '@/context/auth-context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProfilePage() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true })
        }
    }, [user])

    if (!user) {
        return <>Ocorreu algum erro.</>
    }

    return (
        <div className="bg-slate-50 rounded-md p-5">
            <span className="font-bold text-xl mb-5">Atualizar Perfil:</span>
            <UserForm user={user} />
        </div>
    )
}
