import React, { useState, useEffect } from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

const MOBILE_BREAKPOINT = 818;

const formatSpotifyUrl = (url, theme) => {
  try {
    let newUrl = url;
    if (newUrl.includes('/playlist/') && !newUrl.includes('/embed/playlist/')) {
      newUrl = newUrl.replace('/playlist/', '/embed/playlist/');
    } else if (newUrl.includes('/track/') && !newUrl.includes('/embed/track/')) {
      newUrl = newUrl.replace('/track/', '/embed/track/');
    } else if (newUrl.includes('/album/') && !newUrl.includes('/embed/album/')) {
      newUrl = newUrl.replace('/album/', '/embed/album/');
    }
    
    const urlObj = new URL(newUrl);
    urlObj.searchParams.set('utm_source', 'generator');
    
    if (theme === 'dark') {
      urlObj.searchParams.set('theme', '0');
    } else {
      urlObj.searchParams.delete('theme');
    }
    
    return urlObj.toString();
  } catch (error) {
    return url;
  }
};

/**
 * Extract the original Spotify URL (non-embed) for linking on mobile.
 * Strips query params and ensures it's the public open.spotify.com URL.
 */
const getSpotifyLinkUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Remove tracking params for a clean link
    urlObj.search = '';
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Extract a human-readable label from the Spotify URL.
 * e.g., "Playlist" / "Track" / "Album"
 */
const getSpotifyType = (url) => {
  if (url.includes('/playlist/')) return 'Playlist';
  if (url.includes('/track/')) return 'Track';
  if (url.includes('/album/')) return 'Album';
  return 'Music';
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getHoverColor = (index) => {
  const customHexColors = ["#8a3638", "#9f0000", "#39508f"];
  
  if (index < customHexColors.length) {
    const rgb = hexToRgb(customHexColors[index]);
    if (rgb) {
      return {
        surface: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
        border: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
      };
    }
  }
  
  // Default to Spotify green for any additional playlists
  return { surface: 'rgba(30, 215, 96, 0.08)', border: 'rgba(30, 215, 96, 0.3)' };
};

const SpotifyEmbed = ({ playlists = [] }) => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!playlists || playlists.length === 0) return null;

  return (
    <ScrollReveal delay={0.25}>
      <section id="playlists" className="section-block" style={{ marginTop: '4rem' }}>
        <div className="section-header-row">
          <h2 className="section-heading">My Playlists</h2>
        </div>
        <GlassHoverCardContainer className={isMobile ? 'playlists-mobile-grid' : 'projects-grid'}>
          {playlists.map((url, index) => (
            <GlassHoverCard 
              key={index} 
              hoverColor={getHoverColor(index)}
            >
              {isMobile ? (
                /* ── Mobile: Spotify link card ── */
                <a
                  href={getSpotifyLinkUrl(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotify-mobile-link"
                >
                  {/* Spotify icon */}
                  <svg className="spotify-mobile-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <div className="spotify-mobile-text">
                    <span className="spotify-mobile-label">Open {getSpotifyType(url)}</span>
                    <span className="spotify-mobile-sub">Listen on Spotify</span>
                  </div>
                  {/* Arrow icon */}
                  <svg className="spotify-mobile-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </a>
              ) : (
                /* ── Desktop: Embedded player ── */
                <div className="spotify-embed-inner">
                  <iframe
                    className="spotify-iframe"
                    src={formatSpotifyUrl(url, theme)}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify Playlist ${index + 1}`}
                  ></iframe>
                </div>
              )}
            </GlassHoverCard>
          ))}
        </GlassHoverCardContainer>
      </section>
    </ScrollReveal>
  );
};

export default SpotifyEmbed;
