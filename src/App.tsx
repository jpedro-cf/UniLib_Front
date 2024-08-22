import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/global/Layout'
import { BooksPage } from './pages/BooksPage'
import { CategoriesPage } from './pages/CategoriesPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout children={<BooksPage />} />
    },
    {
        path: '/categorias',
        element: <Layout children={<CategoriesPage />} />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
