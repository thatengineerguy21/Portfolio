import { useState, useEffect, useRef } from 'react'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Career', href: '#career' },
  { label: 'Skills', href: '#skills' },
  { label: 'Socials', href: '#socials' },
]

const BREADCRUMB_SEGMENTS = ['~', 'thatengineerguy', 'portfolio']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const breadcrumbRef = useRef(null)
  const linksRef = useRef(null)
  const mergedBarRef = useRef(null)

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Resize merged bar to wrap both children ──
  useEffect(() => {
    if (!mergedBarRef.current || !breadcrumbRef.current || !linksRef.current) return

    const updateMergedSize = () => {
      if (scrolled) {
        // Let the bar auto-size by measuring children
        const bcRect = breadcrumbRef.current.getBoundingClientRect()
        const lnRect = linksRef.current.getBoundingClientRect()
        const totalWidth = bcRect.width + lnRect.width + 40 // 40 for divider + padding
        mergedBarRef.current.style.width = `${totalWidth}px`
      }
    }

    updateMergedSize()
    window.addEventListener('resize', updateMergedSize)
    return () => window.removeEventListener('resize', updateMergedSize)
  }, [scrolled])

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Merged bar background (visible only when scrolled) */}
      <div className="navbar-merged-bar" ref={mergedBarRef} aria-hidden="true" />

      {/* Left: Command-line breadcrumb */}
      <div className="nav-breadcrumb" ref={breadcrumbRef} data-cursor-hover>
        <span className="breadcrumb-prompt">❯</span>
        {BREADCRUMB_SEGMENTS.map((segment, i) => (
          <span key={i}>
            {i > 0 && <span className="breadcrumb-separator">/</span>}
            <span
              className={`breadcrumb-segment ${i === BREADCRUMB_SEGMENTS.length - 1 ? 'current' : ''}`}
            >
              {segment}
            </span>
          </span>
        ))}
      </div>

      {/* Center divider (visible only in merged state) */}
      <div className="nav-merge-divider" />

      {/* Right: Section links */}
      <div className="nav-links" ref={linksRef}>
        {NAV_ITEMS.map((item, i) => (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <a
              className="nav-link"
              href={item.href}
              data-cursor-hover
            >
              {item.label}
            </a>
            {i < NAV_ITEMS.length - 1 && <span className="nav-divider" />}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Navbar