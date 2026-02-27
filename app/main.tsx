import "./app.css";
import { createRoot } from 'react-dom/client'
import './app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from "./app";
import { Toaster } from 'sonner';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster
      position="top-center"
      richColors={false}
      expand={false}
      gap={10}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "bg-transparent shadow-none border-none p-0 w-full flex justify-center", // The custom component inside handles the styling
        },
        duration: 4000,
      }}
    />
  </QueryClientProvider>
)