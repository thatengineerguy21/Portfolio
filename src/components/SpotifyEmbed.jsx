import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

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

  if (!playlists || playlists.length === 0) return null;

  return (
    <ScrollReveal delay={0.25}>
      <section id="playlists" className="section-block" style={{ marginTop: '4rem' }}>
        <div className="section-header-row">
          <h2 className="section-heading">My Playlists</h2>
        </div>
        <GlassHoverCardContainer className="projects-grid">
          {playlists.map((url, index) => (
            <GlassHoverCard 
              key={index} 
              hoverColor={getHoverColor(index)}
            >
              <div style={{ padding: '1rem', width: '100%', height: '100%' }}>
                <iframe
                  style={{ borderRadius: '12px', display: 'block' }}
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
            </GlassHoverCard>
          ))}
        </GlassHoverCardContainer>
      </section>
    </ScrollReveal>
  );
};

export default SpotifyEmbed;
