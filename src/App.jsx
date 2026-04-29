import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// ── RocketScrollbar disabled — premium minimalism refactor ──
// import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing'
import Aurora from './components/Aurora'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

function App() {
  return (
    <>
      <Aurora />
      <Navbar />
      <DotRing />
      {/* RocketScrollbar disabled — premium minimalism refactor */}
      {/* <RocketScrollbar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  )
}

export default App
