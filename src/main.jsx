import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './styles/globals.css'
import './styles/index.css'

// Apply saved theme before first render to prevent flash
try {
  const saved = localStorage.getItem('bf_theme')
  const theme = saved ? JSON.parse(saved) : 'dark'
  document.documentElement.setAttribute('data-theme', theme)
} catch {}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
