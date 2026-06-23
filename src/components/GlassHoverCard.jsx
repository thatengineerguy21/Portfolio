import React from 'react';
import '../styles/GlassHoverCard.css';

/**
 * GlassHoverCardContainer — simple flex wrapper for card grids.
 */
export const GlassHoverCardContainer = ({ children, className = '' }) => {
  return (
    <div className={`glass-hover-cards-container ${className}`}>
      {children}
    </div>
  );
};

/**
 * GlassHoverCard — Clean card with CSS-only hover effects.
 *
 * Hover treatment (no JS needed):
 *   1. Subtle border glow — border brightens with inset accent shadow
 *   2. Pure elevation shift — translateY + deeper shadow + backdrop-filter
 *   3. Tactile noise reveal — ::before SVG noise fades in
 *
 * Architecture:
 *   <div.glass-hover-card>            ← position:relative
 *     <div.glass-hover-card-content>  ← position:relative, z:1
 *       {children}
 *     </div>
 *   </div>
 */
export const GlassHoverCard = React.memo(({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  spotlightColor,
  style = {},
  ...props
}) => {
  const customStyle = {
    ...style,
    '--hover-border-dim': spotlightColor || hoverColor?.surface || 'rgba(140, 165, 230, 0.15)',
    '--hover-border-bright': hoverColor?.border || spotlightColor || 'rgba(140, 165, 230, 0.35)',
  };

  return (
    <div className={`glass-hover-card ${className}`} style={customStyle} {...props}>
      <div className={`glass-hover-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});
