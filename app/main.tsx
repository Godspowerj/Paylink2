import "./app.css";
import { AuthProvider } from "./contexts/auth";
import { createRoot } from 'react-dom/client'
import './app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from "./app";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)