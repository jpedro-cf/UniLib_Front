import { useAuth } from '@/context/auth-context'
import { LoadingPage } from '@/pages/LoadingPage'
import { useCurrentUser } from '@/services/users'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function PersistAuth() {
    const { user, setUser } = useAuth()
    const { data, isLoading, isRefetching, isSuccess, isFetching } = useCurrentUser(!user)

    useEffect(() => {
        if (isSuccess) {
            if (!user && data) {
                setUser(data)
            }
        }
    }, [user, isSuccess, data])

    if (isLoading || isFetching || isRefetching) {
        return <LoadingPage />
    }

    return <Outlet />
}
