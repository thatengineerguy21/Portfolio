import '../styles/GlassPanel.css'

function GlassPanel({ children }) {
  return (
    <div className="glass-panel-wrapper">
      <div className="glass-panel">
        {children}
      </div>
    </div>
  )
}

export default GlassPanel
