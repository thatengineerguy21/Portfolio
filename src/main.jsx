import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MouseContextProvider from './context/mouse-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>
  </StrictMode>,
)
