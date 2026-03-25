import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MouseContextProvider from './context/mouse-context'
import initParticleCanvas from './scripts/script.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>
  </BrowserRouter>
)

// Initialise the particle canvas background after fonts are loaded
document.fonts.ready.then(() => {
  initParticleCanvas("thatengineerguy's portfolio")
})
