import React, { useEffect, useRef } from 'react';
import '../styles/ParallaxImage.css';

// Default layers if none are provided. 
// We use the same image for the background, but normally this would be an array of layered PNGs.
import defaultProfileImage from '../assets/images/profile-casual.jpg';

/**
 * Interactive multi-layer parallax image effect
 * @param {Array} layers - Array of image URLs, from foreground (index 0) to background (index 3).
 * @param {string} alt - Alt text for accessibility.
 */
const ParallaxImage = ({ 
  layers = [], 
  alt = "Profile Image",
  className = "" 
}) => {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);

  // Default to a 4-layer array (even if empty, we provide fallbacks)
  const safeLayers = layers.length > 0 ? layers : [
    null, // foreground-most
    null,
    null,
    defaultProfileImage // background-most
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.dynamics) return;

    // Filter out any refs that might be null
    const validLayers = layerRefs.current.filter(Boolean);

    const mouseDivisors = [10, 20, 22, 30];
    const touchDivisors = [15, 25, 30, 40];

    let isInteracting = false;
    let entryX = 0;
    let entryY = 0;

    const handleMouseEnter = (e) => {
      isInteracting = true;
      const rect = container.getBoundingClientRect();
      entryX = e.clientX - rect.left;
      entryY = e.clientY - rect.top;
      
      validLayers.forEach(layer => window.dynamics.stop(layer));
    };

    const handleMouseMove = (e) => {
      if (!isInteracting) return;
      
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      const deltaX = currentX - entryX;
      const deltaY = currentY - entryY;

      validLayers.forEach((layer, index) => {
        const divisor = mouseDivisors[index] || mouseDivisors[mouseDivisors.length - 1];
        const shiftX = deltaX / divisor;
        const shiftY = deltaY / divisor;
        
        layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      isInteracting = false;
      
      validLayers.forEach(layer => {
        window.dynamics.animate(layer, {
          translateX: 0,
          translateY: 0
        }, {
          type: window.dynamics.spring,
          friction: 200,
          duration: 250
        });
      });
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        isInteracting = true;
        const rect = container.getBoundingClientRect();
        entryX = e.touches[0].clientX - rect.left;
        entryY = e.touches[0].clientY - rect.top;
        
        validLayers.forEach(layer => window.dynamics.stop(layer));
      }
    };

    const handleTouchMove = (e) => {
      if (!isInteracting) return;
      e.preventDefault(); // Prevent page scroll
      
      const rect = container.getBoundingClientRect();
      const currentX = e.touches[0].clientX - rect.left;
      const currentY = e.touches[0].clientY - rect.top;
      
      const deltaX = currentX - entryX;
      const deltaY = currentY - entryY;

      validLayers.forEach((layer, index) => {
        const divisor = touchDivisors[index] || touchDivisors[touchDivisors.length - 1];
        const shiftX = -deltaX / divisor; // Opposite direction
        const shiftY = -deltaY / divisor;
        
        layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      });
    };

    const handleTouchEnd = () => {
      isInteracting = false;
      
      validLayers.forEach(layer => {
        window.dynamics.animate(layer, {
          translateX: 0,
          translateY: 0
        }, {
          type: window.dynamics.spring,
          friction: 100,
          duration: 350
        });
      });
    };

    // Attach events
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    // Cleanup
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      className={`parallax-container ${className}`} 
      ref={containerRef}
      aria-label={alt}
      role="img"
    >
      {/* 
        Render layers in reverse order so layer0 (foreground) is at the bottom of the DOM,
        which places it visually on top. 
      */}
      {[...safeLayers].reverse().map((imgSrc, reverseIdx) => {
        const originalIdx = safeLayers.length - 1 - reverseIdx;
        return (
          <div
            key={originalIdx}
            className={`parallax-layer layer-${originalIdx}`}
            ref={el => layerRefs.current[originalIdx] = el}
            style={{
              backgroundImage: imgSrc ? `url(${imgSrc})` : 'none',
              // Add a slight fallback color so they're visible if no image is supplied yet
              backgroundColor: imgSrc ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
              zIndex: safeLayers.length - originalIdx
            }}
          />
        );
      })}
    </div>
  );
};

export default ParallaxImage;
