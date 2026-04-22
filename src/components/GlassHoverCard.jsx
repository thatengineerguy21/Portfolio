import React, { useRef, useEffect } from 'react';
import '../styles/GlassHoverCard.css';

/* ── Edge-proximity & cursor-angle math ── */

function getCenterOfElement(el) {
  const { width, height } = el.getBoundingClientRect();
  return [width / 2, height / 2];
}

function getEdgeProximity(el, x, y) {
  const [cx, cy] = getCenterOfElement(el);
  const dx = x - cx;
  const dy = y - cy;
  let kx = Infinity;
  let ky = Infinity;
  if (dx !== 0) kx = cx / Math.abs(dx);
  if (dy !== 0) ky = cy / Math.abs(dy);
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

function getCursorAngle(el, x, y) {
  const [cx, cy] = getCenterOfElement(el);
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return 0;
  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI) + 90;
  if (degrees < 0) degrees += 360;
  return degrees;
}

/**
 * GlassHoverCardContainer
 *
 * Tracks mouse position across all child cards and writes
 * --mouse-x / --mouse-y / --edge-proximity / --cursor-angle
 * CSS custom properties so the surface spotlight, conic border
 * glow, and edge-light all follow the cursor.
 */
export const GlassHoverCardContainer = ({ children, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip hover tracking entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.glass-hover-card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Edge-proximity & cursor angle for conic border + edge-light
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
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
 * A premium minimalist card with refined hover interactions:
 *  - Mouse-tracking 2-layer spotlight
 *  - Monochromatic conic border glow (edge-sensitive)
 *  - Whisper edge-light (3-layer box-shadow)
 *
 * Props:
 *   children         – card body content
 *   className        – extra classes for the outer shell
 *   contentClassName – extra classes for the inner content pane
 *   hoverColor       – custom color for hover gradients (string or { surface, border })
 *   spotlightColor   – custom spotlight radial color, e.g. "rgba(0, 229, 255, 0.2)"
 *   edgeSensitivity  – threshold for edge-proximity activation (default 30)
 *   coneSpread       – width of the conic glow cone (default 25)
 */
export const GlassHoverCard = React.memo(({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  spotlightColor,
  edgeSensitivity = 30,
  coneSpread = 25,
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

  if (spotlightColor) {
    colorStyle['--spotlight-color'] = spotlightColor;
  }

  const mergedStyle = {
    ...colorStyle,
    '--edge-sensitivity': edgeSensitivity,
    '--color-sensitivity': edgeSensitivity + 20,
    '--cone-spread': coneSpread,
  };

  return (
    <div className={`glass-hover-card ${className}`} style={mergedStyle} {...props}>
      <span className="edge-light" />
      <div className={`glass-hover-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});
