import React, { useRef, useCallback } from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import githubIcon from '../assets/icons/GitHub.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import twitterIcon from '../assets/icons/x.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import mediumIcon from '../assets/icons/medium.svg';

const socials = [
  { name: 'GitHub', link: 'https://github.com/thatengineerguy21', icon: githubIcon, hoverColor: { surface: 'rgba(108, 198, 68, 0.12)', border: 'rgba(108, 198, 68, 0.30)' } },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/thatengineerguy13', icon: linkedinIcon, hoverColor: { surface: 'rgba(10, 102, 194, 0.12)', border: 'rgba(40, 130, 220, 0.30)' } },
  { name: 'Twitter', link: 'https://twitter.com/thisengineerguy', icon: twitterIcon, hoverColor: { surface: 'rgba(200, 200, 200, 0.10)', border: 'rgba(255, 255, 255, 0.25)' } },
  { name: 'Medium', link: 'https://medium.com/@thatengineerguy', icon: mediumIcon, hoverColor: { surface: 'rgba(108, 198, 68, 0.12)', border: 'rgba(21, 109, 18, 0.25)' } },
  { name: 'Instagram', link: 'https://instagram.com/thatengineerguy13', icon: instagramIcon, hoverColor: { surface: 'rgba(231, 68, 86, 0.5)', border: 'rgba(224, 38, 60, 0.85)' } },
];

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
                    src={social.icon}
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