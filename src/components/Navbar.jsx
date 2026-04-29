import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Career', href: '/#career' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Socials', href: '/#socials' },
  { label: 'Education', href: '/#education' },
]

const BREADCRUMB_SEGMENTS = ['~', 'thatengineerguy', 'portfolio']

function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
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
        // Let the bar span from left edge of breadcrumb to right edge of links
        const containerRect = mergedBarRef.current.parentElement.getBoundingClientRect()
        const bcRect = breadcrumbRef.current.getBoundingClientRect()
        const lnRect = linksRef.current.getBoundingClientRect()
        const fullSpan = lnRect.right - bcRect.left
        mergedBarRef.current.style.width = `${fullSpan + 16}px` // 16px for inner padding
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
            <Link
              className="nav-link"
              to={item.to || item.href}
              data-cursor-hover
            >
              {item.label}
            </Link>
            <span className="nav-divider" />
          </span>
        ))}
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          data-cursor-hover
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar