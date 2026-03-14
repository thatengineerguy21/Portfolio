import SpaceBackground from './components/SpaceBackground'
import Navbar from './components/Navbar'
import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing/DotRing'
import GlassPanel from './components/GlassPanel'

function App() {
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <DotRing />
      <RocketScrollbar />

      {/* <div className="title" >
        <h1 data-cursor-hover>thatengineerguy</h1>
      </div> */}

      <GlassPanel>
        {/* All portfolio content goes here */}
      </GlassPanel>

    </>
  )
}

export default App
