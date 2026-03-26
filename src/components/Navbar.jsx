import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Career', href: '#career' },
  { label: 'Skills', href: '#skills' },
  { label: 'Socials', href: '#socials' },
  { label: 'Education', href: '#education' },
]

const BREADCRUMB_SEGMENTS = ['~', 'thatengineerguy', 'portfolio']

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const breadcrumbRef = useRef(null)
  const linksRef = useRef(null)
  const mergedBarRef = useRef(null)

  // ── Scroll listener (rAF-gated to prevent layout thrashing) ──
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 0)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Scroll Spy using Intersection Observer ──
  useEffect(() => {
    if (location.pathname !== '/') {
      setCurrentSection('')
      return
    }

    const sectionIds = ['about', 'socials', 'projects', 'skills', 'career', 'education']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])

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

    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateMergedSize, 150)
    }

    updateMergedSize()
    window.addEventListener('resize', debouncedResize, { passive: true })
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [scrolled])

  // ── Determine Dynamic Breadcrumb Segments ──
  let dynamicSegment = ''
  if (location.pathname === '/projects') {
    dynamicSegment = 'projects'
  } else if (location.pathname === '/') {
    dynamicSegment = currentSection
  }

  const currentSegments = [...BREADCRUMB_SEGMENTS]
  if (dynamicSegment) {
    currentSegments.push(dynamicSegment)
  }

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Merged bar background (visible only when scrolled) */}
      <div className="navbar-merged-bar" ref={mergedBarRef} aria-hidden="true" />

      {/* Left: Command-line breadcrumb */}
      <div className="nav-breadcrumb" ref={breadcrumbRef} data-cursor-hover>
        <span className="breadcrumb-prompt">❯</span>
        {currentSegments.map((segment, i) => (
          <span key={i}>
            {i > 0 && <span className="breadcrumb-separator">/</span>}
            <span
              className={`breadcrumb-segment ${i === currentSegments.length - 1 ? 'current' : ''}`}
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
            {item.to ? (
              <Link
                className="nav-link"
                to={item.to}
                data-cursor-hover
              >
                {item.label}
              </Link>
            ) : (
              <a
                className="nav-link"
                href={item.href}
                data-cursor-hover
              >
                {item.label}
              </a>
            )}
            {i < NAV_ITEMS.length - 1 && <span className="nav-divider" />}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Navbar