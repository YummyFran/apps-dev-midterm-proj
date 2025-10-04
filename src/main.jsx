import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './providers/CartContext.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CartProvider>
  </StrictMode>,
)
