import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// ── RocketScrollbar disabled — premium minimalism refactor ──
// import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing'
// ── Aurora disabled — pure dark background ──
// import Aurora from './components/Aurora'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import CaseStudyPage from './pages/CaseStudyPage'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'


function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      {/* Aurora disabled — pure dark background */}
      {/* <Aurora /> */}
      <Navbar />
      <DotRing />
      {/* RocketScrollbar disabled — premium minimalism refactor */}
      {/* <RocketScrollbar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
      </Routes>
    </>
  )
}

export default App
