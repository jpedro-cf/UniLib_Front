import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
type ProtectedRouteProps = PropsWithChildren

const Layout = ({ children }: ProtectedRouteProps) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full min-h-screen bg-slate-50 p-5">{children}</main>
        </div>
    )
}

export default Layout
