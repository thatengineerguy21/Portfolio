import React, { useRef, useCallback } from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import { useSanityData } from '../hooks/useSanityData';
import { urlFor } from '../lib/sanityClient';

const SOCIALS_QUERY = `
  *[_type == "socialLink"] | order(sortOrder asc)
`;

/**
 * MagneticIcon — Wraps an icon with a subtle magnetic pull toward the cursor.
 * Uses vanilla JS for zero-dependency spring feel via CSS transition.
 * On touch devices, this is a no-op (no transforms applied).
 */
const MagneticIcon = ({ children }) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.2; // 20% pull strength
    const dy = (e.clientY - cy) * 0.2;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        display: 'inline-flex',
      }}
    >
      {children}
    </div>
  );
};

const SocialIcons = React.memo(() => {
  const { data: socials, loading, error } = useSanityData(SOCIALS_QUERY);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading socials...</div>;
  if (error || !socials) return null;

  return (
    <section id="socials" className="section-block">
      <h2 className="section-heading">Connect with me !</h2>
      <GlassHoverCardContainer className="social-grid">
        {socials.map((social, index) => (
          <ScrollReveal key={social.name} delay={index * 0.1}>
            <GlassHoverCard hoverColor={social.hoverColor} data-cursor-hover>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-link"
              >
                <MagneticIcon>
                  <img
                    src={social.icon ? urlFor(social.icon).url() : ''}
                    alt={`${social.name} icon`}
                    className="social-card-icon"
                  />
                </MagneticIcon>
                <span className="social-card-name">{social.name}</span>
              </a>
            </GlassHoverCard>
          </ScrollReveal>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
});

export default SocialIcons;