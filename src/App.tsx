import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/global/Layout'
import { BooksPage } from './pages/BooksPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { BookPage } from './pages/BookPage'
import { CompanyPage } from './pages/CompanyPage'
import { Reader } from './pages/Reader'
import ProtectedRoute from './components/global/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout children={<BooksPage />} />
    },
    {
        path: '/categorias',
        element: <Layout children={<CategoriesPage />} />
    },
    {
        path: '/livro/:id',
        element: <Layout children={<BookPage />} />
    },
    {
        path: '/livro/:id/reader',
        element: (
            <ProtectedRoute>
                <Layout children={<Reader />} />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/empresas/:id',
        element: (
            <ProtectedRoute>
                <Layout children={<CompanyPage />} />
            </ProtectedRoute>
        )
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
