import { useAuth } from '@/context/auth-context'
import { LoadingPage } from '@/pages/LoadingPage'
import { useCurrentUser } from '@/services/users'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function PersistAuth() {
    const { user, setUser } = useAuth()
    const { data, isLoading, isRefetching, isSuccess, isFetching, isError } = useCurrentUser(!user)

    useEffect(() => {
        if (isSuccess && !user && data) {
            setUser(data)
        }
        if (isError) {
            setUser(null)
        }
    }, [user, isSuccess, data])

    if (isLoading || isFetching || isRefetching) {
        return <LoadingPage />
    }

    return <Outlet />
}
