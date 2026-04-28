import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
 import { GoogleOAuthProvider } from '@react-oauth/google';

 import { Toaster } from 'react-hot-toast';
export const authService = 'http://localhost:8080';
import { AppProvider } from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="550362684517-nndq6apc8ve6d19rsb2kue44itqa93dh.apps.googleusercontent.com">
      <AppProvider>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>

    <Toaster />
  </StrictMode>,
)
