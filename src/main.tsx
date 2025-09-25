import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster.tsx'
import AuthProvider from './context/auth-context.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <TooltipProvider>
                    <App />
                    <Toaster />
                </TooltipProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
)
