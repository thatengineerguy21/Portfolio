import SpaceBackground from './components/SpaceBackground'
import RocketScrollbar from './components/RocketScrollbar'
import DotRing from './components/DotRing/DotRing'

function App() {
  return (
    <>
      <SpaceBackground />
      <DotRing />
      <RocketScrollbar />

      <div className="title" >
        <h1 data-cursor-hover>thatengineerguy</h1>
      </div>

      {/* Temporary spacer to test scrolling, need to remove later */}
      <div style={{ height: '200vh' }}></div>
    </>
  )
}

export default App
