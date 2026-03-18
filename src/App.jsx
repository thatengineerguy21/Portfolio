import Navbar from './components/Navbar'
import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing'
import GlassPanel from './components/GlassPanel'
import About from './components/About'
import SocialIcons from './components/SocialIcons'

function App() {
  return (
    <>
      <Navbar />
      <DotRing />
      <RocketScrollbar />

      <GlassPanel>
        <About />
        <SocialIcons />
      </GlassPanel>

    </>
  )
}

export default App
