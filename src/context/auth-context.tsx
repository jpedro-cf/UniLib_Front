import { ICurrentUserData } from '@/interfaces/User'
import React, { createContext, useContext, useState } from 'react'

interface AuthContextsTypes {
    user: ICurrentUserData | null
    setUser: (data: ICurrentUserData | null) => void
}

const AuthContext = createContext<AuthContextsTypes | undefined>(undefined)

export default function AuthProvider({ children }: React.ComponentProps<'div'>) {
    const [user, setUser] = useState<ICurrentUserData | null>(null)

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
