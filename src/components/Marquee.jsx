import { useEffect, useRef } from 'react';
import '../styles/Marquee.css';

/**
 * Marquee — Infinite scrolling keyword strip.
 * Duplicates items once for seamless loop.
 * Fully self-contained & reversible: remove this component
 * and its single JSX line in HomePage to undo.
 */

const ITEMS = [
  'React',
  'Python',
  'Cloud Computing',
  'Artificial Intelligence',
  'FastAPI',
  'Docker',
  'Gemini',
  'PostgreSQL',
  'TypeScript',
  'Machine Learning',
  'Full Stack',
  'Node.js',
];

function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Build item + separator pairs
    const fragment = document.createDocumentFragment();

    const createItems = () => {
      ITEMS.forEach((text) => {
        const item = document.createElement('span');
        item.className = 'marquee-item';
        item.textContent = text;
        fragment.appendChild(item);

        const sep = document.createElement('span');
        sep.className = 'marquee-sep';
        sep.textContent = '✦';
        fragment.appendChild(sep);
      });
    };

    // Original + duplicate for seamless loop
    createItems();
    createItems();

    track.appendChild(fragment);
  }, []);

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track" ref={trackRef} />
    </div>
  );
}

export default Marquee;
