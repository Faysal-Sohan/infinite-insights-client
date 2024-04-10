import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './Providers/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();
import { ChakraProvider } from '@chakra-ui/react'
import CategoryProvider from './Providers/CategoryProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <ChakraProvider>
            <RouterProvider router={router} />
          </ChakraProvider>
        </CategoryProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
