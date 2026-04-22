import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MouseContextProvider from './context/mouse-context'

// ── Particle canvas disabled — premium minimalism refactor ──
// import initParticleCanvas from './scripts/script.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MouseContextProvider>
      <App />
    </MouseContextProvider>
  </BrowserRouter>
)

// ── Particle canvas init disabled — premium minimalism refactor ──
// document.fonts.ready.then(() => {
//   initParticleCanvas()
// })
