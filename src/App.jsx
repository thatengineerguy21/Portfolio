import SpaceBackground from './components/SpaceBackground'
import RocketScrollbar from './components/RocketScrollbar'

function App() {
  return (
    <>
      <SpaceBackground />
      <RocketScrollbar />

      <div className="title">
        <h1>thatengineerguy</h1>
      </div>

      {/* Temporary spacer to test scrolling, need to remove later */}
      <div style={{ height: '200vh' }}></div>
    </>
  )
}

export default App
