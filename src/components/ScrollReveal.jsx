import { useEffect, useRef } from 'react';
import '../styles/ScrollReveal.css';

/**
 * ScrollReveal — Wraps children in a .reveal container
 * that fades + slides in when scrolled into view.
 *
 * Props:
 *   delay   — extra transition-delay in seconds (default 0)
 *   className — additional classes for the wrapper
 *   as      — HTML element to render (default 'div')
 */
function ScrollReveal({ children, delay = 0, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('in-view');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}

export default ScrollReveal;
