import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/RocketScrollbar.css'


function RocketScrollbar() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const scrollTimer = useRef(null)

  useEffect(() => {
    let scrollTicking = false
    const onScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => {
        if (isDragging.current) { scrollTicking = false; return }
        const max = document.documentElement.scrollHeight - window.innerHeight
        setHasOverflow(max > 0)
        if (max > 0) {
          setScrollPercent(Math.min(Math.max(window.scrollY / max, 0), 1))
        }
        setIsScrolling(true)
        clearTimeout(scrollTimer.current)
        scrollTimer.current = setTimeout(() => setIsScrolling(false), 200)
        scrollTicking = false
      })
    }

    const onResize = () => {
      setHasOverflow(document.documentElement.scrollHeight > window.innerHeight)
    }

    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(onResize, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', debouncedResize, { passive: true })
    onResize()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(scrollTimer.current)
      clearTimeout(resizeTimer)
    }
  }, [])

  const scrollTo = useCallback((pct) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo(0, pct * max)
  }, [])

  const handleTrackClick = useCallback((e) => {
    if (e.target.closest('.rocket-thumb')) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
    scrollTo(pct)
  }, [scrollTo])

  const handleDragStart = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    isDragging.current = true
    document.body.style.userSelect = 'none'

    const onMove = (ev) => {
      const rect = trackRef.current.getBoundingClientRect()
      const pct = Math.min(Math.max((ev.clientY - rect.top) / rect.height, 0), 1)
      setScrollPercent(pct)
      setIsScrolling(true)
      scrollTo(pct)
    }

    const onUp = () => {
      isDragging.current = false
      document.body.style.userSelect = ''
      setTimeout(() => setIsScrolling(false), 200)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [scrollTo])

  if (!hasOverflow) return null

  return (
    <div className="rocket-scrollbar">
      <div className="rocket-track" ref={trackRef} onClick={handleTrackClick}>
        {/* Exhaust trail */}
        <div
          className={`exhaust-trail ${isScrolling ? 'active' : ''}`}
          style={{ top: `${scrollPercent * 100}%` }}
        />

        {/* Rocket thumb */}
        <div
          className={`rocket-thumb ${isScrolling ? 'thrusting' : 'idle'}`}
          style={{
            top: `${scrollPercent * 100}%`,
            transform: `translateX(-50%) translateY(${-scrollPercent * 100}%)`
          }}
          onMouseDown={handleDragStart}
        >
          <svg className="rocket-svg" viewBox="0 0 24 30" width="22" height="28">
            <defs>
              <linearGradient id="rBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#bdc3c7" />
                <stop offset="45%" stopColor="#f2f3f4" />
                <stop offset="100%" stopColor="#95a5a6" />
              </linearGradient>
            </defs>
            {/* Nose cone */}
            <path d="M12 0 Q6 8 7 12 L17 12 Q18 8 12 0Z" fill="#e74c3c" />
            {/* Body */}
            <rect x="7" y="12" width="10" height="11" fill="url(#rBody)" />
            {/* Window */}
            <circle cx="12" cy="17" r="2.2" fill="#2980b9" />
            <circle cx="11.2" cy="16.2" r="0.8" fill="#5dade2" opacity="0.6" />
            {/* Left fin */}
            <path d="M7 19 L2 27 L7 24Z" fill="#c0392b" />
            {/* Right fin */}
            <path d="M17 19 L22 27 L17 24Z" fill="#c0392b" />
            {/* Nozzle */}
            <rect x="9" y="23" width="6" height="2.5" rx="1" fill="#566573" />
          </svg>

          {/* Flame effects */}
          <div className="rocket-flame">
            <div className="flame-outer"></div>
            <div className="flame-core"></div>
          </div>
        </div>
      </div>

      {/* Launch pad */}
      <div className="launch-pad">
        <div className="pad-support pad-left"></div>
        <div className="pad-support pad-right"></div>
        <div className="pad-base"></div>
        <div className="pad-light pad-light-l"></div>
        <div className="pad-light pad-light-r"></div>
      </div>
    </div>
  )
}

export default RocketScrollbar
