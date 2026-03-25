import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import '../styles/Sections.css';
import githubIcon from '../assets/icons/GitHub.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import twitterIcon from '../assets/icons/x.png';
import instagramIcon from '../assets/icons/instagram.svg';

const socials = [
  { name: 'GitHub', link: 'https://github.com/thatengineerguy21', icon: githubIcon, hoverColor: { surface: 'rgba(108, 198, 68, 0.12)', border: 'rgba(108, 198, 68, 0.30)' } },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/thatengineerguy13', icon: linkedinIcon, hoverColor: { surface: 'rgba(10, 102, 194, 0.12)', border: 'rgba(40, 130, 220, 0.30)' } },
  { name: 'Twitter', link: 'https://twitter.com/thisengineerguy', icon: twitterIcon, hoverColor: { surface: 'rgba(200, 200, 200, 0.10)', border: 'rgba(255, 255, 255, 0.25)' } },
  { name: 'Instagram', link: 'https://instagram.com/thatengineerguy13', icon: instagramIcon, hoverColor: { surface: 'rgba(231, 68, 86, 0.5)', border: 'rgba(224, 38, 60, 0.85)' } },
];

const SocialIcons = () => {
  return (
    <section id="socials" className="section-block">
      <h2 className="section-heading">Connect with me !</h2>
      <GlassHoverCardContainer className="social-grid">
        {socials.map((social) => (
          <GlassHoverCard key={social.name} hoverColor={social.hoverColor} data-cursor-hover>
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card-link"
            >
              <img
                src={social.icon}
                alt={`${social.name} icon`}
                className="social-card-icon"
              />
              <span className="social-card-name">{social.name}</span>
            </a>
          </GlassHoverCard>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
};

export default SocialIcons;