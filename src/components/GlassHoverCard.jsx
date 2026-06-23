import React, { useRef, useEffect } from 'react';
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
 * GlassHoverCard — Clean card with canvas spotlight on hover.
 *
 * Architecture matches the reference spotlight-section exactly:
 *   <div.glass-hover-card>            ← position:relative
 *     <canvas>                        ← position:absolute, inset:0, z:0
 *     <div.glass-hover-card-content>  ← position:relative, z:1
 *       {children}
 *     </div>
 *   </div>
 *
 * Canvas is sized to the card via getBoundingClientRect().
 * Mouse coords are relative to the card.
 * Single 3-stop radialGradient, card-scoped rAF loop.
 */
export const GlassHoverCard = React.memo(({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  spotlightColor,
  ...props
}) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sx = -999;
    let sy = -999;
    let rafId = null;

    function resizeCanvas() {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    }

    // ResizeObserver fires on initial layout + any size changes
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(card);

    function onMouseMove(e) {
      const r = canvas.getBoundingClientRect();
      sx = e.clientX - r.left;
      sy = e.clientY - r.top;
    }

    function onMouseLeave() {
      sx = -999;
      sy = -999;
    }

    // Resolve spotlight colors from props
    const inner = spotlightColor || hoverColor?.surface || 'rgba(140, 165, 230, 0.12)';
    const mid = 'rgba(110, 150, 220, 0.06)';

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (sx !== -999) {
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 260);
        g.addColorStop(0, inner);
        g.addColorStop(0.5, mid);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      rafId = requestAnimationFrame(draw);
    }

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hoverColor, spotlightColor]);

  return (
    <div ref={cardRef} className={`glass-hover-card ${className}`} {...props}>
      <canvas ref={canvasRef} className="glass-hover-card-canvas" />
      <div className={`glass-hover-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});
