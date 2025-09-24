import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type Props = PropsWithChildren

export const Layout = ({ children }: Props) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-slate-50">
                <Header />
                <div className="p-5">{children}</div>
            </main>
        </div>
    )
}
