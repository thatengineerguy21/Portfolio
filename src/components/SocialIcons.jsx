import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import githubIcon from '../assets/icons/GitHub.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import twitterIcon from '../assets/icons/x.svg';
import instagramIcon from '../assets/icons/instagram.svg';

const SocialIcons = () => {
  const socials = [
    { name: 'GitHub', link: 'https://github.com/thatengineerguy21', icon: githubIcon, hoverColor: { surface: 'rgba(108, 198, 68, 0.12)', border: 'rgba(108, 198, 68, 0.30)' } },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/thatengineerguy13', icon: linkedinIcon, hoverColor: { surface: 'rgba(10, 102, 194, 0.12)', border: 'rgba(40, 130, 220, 0.30)' } },
    { name: 'Twitter', link: 'https://twitter.com/thisengineerguy', icon: twitterIcon, hoverColor: { surface: 'rgba(200, 200, 200, 0.10)', border: 'rgba(255, 255, 255, 0.25)' } },
    { name: 'Instagram', link: 'https://instagram.com/thatengineerguy13', icon: instagramIcon, hoverColor: { surface: 'rgba(231, 68, 86, 0.5)', border: 'rgba(231, 68, 86, 0.25)' } },
  ];

  return (
    <section id="social" style={{ padding: '2rem', paddingTop: '0', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', fontFamily: '"Exo 2", sans-serif', fontWeight: 500 }}>Connect with me</h2>
      <GlassHoverCardContainer>
        {socials.map((social) => (
          <GlassHoverCard key={social.name} hoverColor={social.hoverColor} data-cursor-hover >
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                textDecoration: 'none',
                color: 'rgb(240, 240, 240)',
                minWidth: '80px',
                fontFamily: '"Exo 2", sans-serif'
              }}
            >
              <span style={{ marginRight: '4px', display: 'flex', alignItems: 'center' }}>
                <img
                  src={social.icon}
                  alt={`${social.name} icon`}
                  style={{ width: '40px', height: '40px', filter: 'brightness(1)' }}
                />
              </span>
              {social.name}
            </a>
          </GlassHoverCard>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
};

export default SocialIcons;