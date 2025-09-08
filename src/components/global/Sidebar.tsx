import { cva } from 'class-variance-authority'
import { BookText, List } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import logo from '../../../public/images/logo-ipsum.svg'
import { CurrentUserInfo } from './CurrentUserInfo'

const linksProperties = cva('flex items-center gap-2 font-semibold py-1 px-3 rounded-sm', {
    variants: {
        active: {
            true: 'bg-blue-500 text-gray-100',
            false: 'text-slate-700'
        },
        pending: {
            true: '',
            false: ''
        }
    },
    defaultVariants: {
        active: false,
        pending: false
    }
})

export const Sidebar = () => {
    return (
        <aside className="sidebar hidden lg:flex flex-col bg-[#fff] p-5 w-[225px] min-h-screen border-r border-blue-100/80">
            <nav>
                <img src={logo} alt="Logo" className="max-w-[80px] mb-10" />
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                linksProperties({ active: isActive, pending: isPending })
                            }
                        >
                            <BookText size={20} />
                            Livros
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/categorias"
                            className={({ isActive, isPending }) =>
                                linksProperties({ active: isActive, pending: isPending })
                            }
                        >
                            <List size={20} />
                            Categorias
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="justify-self-end mt-auto">
                <CurrentUserInfo />
            </div>
        </aside>
    )
}
