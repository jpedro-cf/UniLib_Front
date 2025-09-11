import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './components/global/Layout'
import { BooksPage } from './pages/BooksPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { BookPage } from './pages/BookPage'
import { CompanyPage } from './pages/CompanyPage'
import { Reader } from './pages/Reader'
import { PersistAuth } from './components/global/PersistAuth'

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PersistAuth />}>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <BooksPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/categorias"
                        element={
                            <Layout>
                                <CategoriesPage />
                            </Layout>
                        }
                    />

                    <Route
                        path="/livro/:id"
                        element={
                            <Layout>
                                <BookPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/livro/:id/reader"
                        element={
                            <Layout>
                                <Reader />
                            </Layout>
                        }
                    />
                    <Route
                        path="/admin/empresas/:id"
                        element={
                            <Layout>
                                <CompanyPage />
                            </Layout>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
