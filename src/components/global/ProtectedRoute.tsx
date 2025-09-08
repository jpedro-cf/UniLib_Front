import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/auth-context'

interface Props {
    children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/', { replace: true })
        }
    }, [navigate, user])

    return children
}
