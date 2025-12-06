import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CommentProvider } from './context/CommentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CommentProvider>
          <App />
        </CommentProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
