import React, { useRef, useEffect } from 'react';
import '../styles/GlassHoverCard.css';

/**
 * GlassHoverCardContainer
 * 
 * Drop-in replacement for HoverCardContainer.
 * Tracks mouse position across all child cards and writes
 * --mouse-x / --mouse-y CSS custom properties so the
 * glass surface spotlight and border glow follow the cursor.
 */
export const GlassHoverCardContainer = ({ children, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.glass-hover-card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`glass-hover-cards-container ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * GlassHoverCard
 * 
 * A card that looks exactly like GlassPanel but responds to the
 * mouse-tracking spotlight effect from HoverCard.
 *
 * Structure:
 *   .glass-hover-card          ← position shell; hosts ::before (spotlight) and ::after (border glow)
 *   └─ .glass-hover-card-content  ← carries all glassmorphism styling (background, backdrop-filter,
 *                                    border, box-shadow, edge highlights via its own ::before/::after)
 *
 * Props:
 *   children         – card body content
 *   className        – extra classes for the outer shell
 *   contentClassName – extra classes for the inner glass pane
 *   hoverColor       – custom color for hover gradients, e.g. "rgba(255, 100, 100, 0.15)"
 *                      Sets both surface spotlight and border glow color.
 *                      Pass an object { surface, border } to set them independently.
 */
export const GlassHoverCard = ({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  ...props
}) => {
  const colorStyle = {};
  if (hoverColor) {
    if (typeof hoverColor === 'object') {
      if (hoverColor.surface) colorStyle['--hover-surface-color'] = hoverColor.surface;
      if (hoverColor.border) colorStyle['--hover-border-color'] = hoverColor.border;
    } else {
      colorStyle['--hover-surface-color'] = hoverColor;
      colorStyle['--hover-border-color'] = hoverColor;
    }
  }

  return (
    <div className={`glass-hover-card ${className}`} style={colorStyle} {...props}>
      <div className={`glass-hover-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
