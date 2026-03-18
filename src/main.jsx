import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MouseContextProvider from './context/mouse-context'
import initParticleCanvas from './scripts/script.js'

createRoot(document.getElementById('root')).render(
  <MouseContextProvider>
    <App />
  </MouseContextProvider>
)

// Initialise the particle canvas background after fonts are loaded
document.fonts.ready.then(() => {
  initParticleCanvas("thatengineerguy's portfolio")
})
