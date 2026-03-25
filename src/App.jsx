import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

function App() {
  return (
    <>
      <Navbar />
      <DotRing />
      <RocketScrollbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  )
}

export default App
