import React, { useRef, useEffect } from 'react';
import '../styles/GlassHoverCard.css';

/* ── Helpers ported from BorderGlow ── */

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

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
 * CSS custom properties so the glass surface spotlight,
 * conic border glow, and edge-light all follow the cursor.
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

        // Spotlight coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Edge-proximity & cursor angle (from BorderGlow)
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
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
 * A premium glassmorphism card with:
 *  - Mouse-tracking spotlight (from SpotlightCard)
 *  - Conic-masked mesh-gradient border glow (from BorderGlow)
 *  - Edge-light outer radiance (from BorderGlow)
 *  - Full glassmorphism inner pane
 *
 * Props:
 *   children         – card body content
 *   className        – extra classes for the outer shell
 *   contentClassName – extra classes for the inner glass pane
 *   hoverColor       – custom color for hover gradients (string or { surface, border })
 *   spotlightColor   – custom spotlight radial color, e.g. "rgba(0, 229, 255, 0.2)"
 *   glowColor        – HSL string for edge glow, e.g. "40 80 80"
 *   glowIntensity    – multiplier for glow opacity layers (default 1.0)
 *   colors           – array of CSS colors for mesh gradient border
 *   coneSpread       – width of the conic glow cone (default 25)
 *   edgeSensitivity  – threshold for edge-proximity activation (default 30)
 *   glowRadius       – outer-glow padding in px (default 40)
 *   fillOpacity      – opacity of the mesh background fill (default 0.5)
 */
export const GlassHoverCard = ({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  spotlightColor,
  glowColor = '40 80 80',
  glowIntensity = 1.0,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  coneSpread = 25,
  edgeSensitivity = 30,
  glowRadius = 40,
  fillOpacity = 0.5,
  ...props
}) => {
  const colorStyle = {};

  // Legacy hoverColor support
  if (hoverColor) {
    if (typeof hoverColor === 'object') {
      if (hoverColor.surface) colorStyle['--hover-surface-color'] = hoverColor.surface;
      if (hoverColor.border) colorStyle['--hover-border-color'] = hoverColor.border;
    } else {
      colorStyle['--hover-surface-color'] = hoverColor;
      colorStyle['--hover-border-color'] = hoverColor;
    }
  }

  // SpotlightCard spotlight color
  if (spotlightColor) {
    colorStyle['--spotlight-color'] = spotlightColor;
  }

  // BorderGlow variables
  const glowVars = buildGlowVars(glowColor, glowIntensity);
  const gradientVars = buildGradientVars(colors);

  const mergedStyle = {
    ...colorStyle,
    ...glowVars,
    ...gradientVars,
    '--edge-sensitivity': edgeSensitivity,
    '--color-sensitivity': edgeSensitivity + 20,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
  };

  return (
    <div className={`glass-hover-card ${className}`} style={mergedStyle} {...props}>
      <span className="edge-light" />
      <div className={`glass-hover-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
