import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

type Props = PropsWithChildren

export const Layout = ({ children }: Props) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-slate-50 p-5">{children}</main>
        </div>
    )
}
