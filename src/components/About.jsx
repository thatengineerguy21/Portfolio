import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import resumePdf from '../assets/documents/Vedant_Chaudhari_DYPCOE.pdf';
import downloadIcon from '../assets/icons/download-file.svg';
import profilePhoto from '../assets/images/profile-casual.jpg';
import locationPinIcon from '../assets/icons/locationpin.svg';

const About = React.memo(() => {
  return (
    <>
      <h1 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 900, textAlign: 'center', letterSpacing: '-0.03em' }}>Vedant Chaudhari</h1>
      <section id="about" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontWeight: 400, textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>Full Stack Developer | Specializing in AI & Cloud Computing | Early-Stage Contributor @ STSARC Pvt. Ltd.</h2>
        <GlassHoverCardContainer>
          <GlassHoverCard contentClassName="about-content">
            <div className="about-container cursor-pointer">
              <div className="about-image-wrapper">
                <img
                  src={profilePhoto}
                  alt="Profile Photo"
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div className="about-text-wrapper">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                  Hello, I'm
                  <br />
                  Vedant Chaudhari
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  I'm a <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>21 y/o Full Stack Developer</strong> based in <img src={locationPinIcon} alt="Location Pin" style={{ width: '14px', height: '14px', opacity: 0.7 }} /> <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Pune, India</strong>.
                  <br /><br />
                  <strong style={{ color: 'var(--accent-warm-solid)', fontWeight: 600 }}>Interests:</strong> Data Structures and Algorithms, Computer Networks, Operating Systems, Cloud Computing, Data Science, Machine Learning Algorithms, Statistics, Artificial Intelligence.
                </p>
              </div>
            </div>
          </GlassHoverCard>
          <GlassHoverCard
            hoverColor={{ surface: 'rgba(220, 50, 50, 0.08)', border: 'rgba(220, 50, 50, 0.20)' }}
            data-cursor-hover
          >
            <a
              href={resumePdf}
              download="Vedant_Chaudhari_Resume.pdf"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: 0,
                textDecoration: 'none',
                color: 'var(--text-primary)',
                minWidth: '80px',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}><img src={downloadIcon} alt="Download Resume" style={{ width: '18px', height: '18px', filter: 'invert(1)', opacity: 0.8 }} /></span>
              Download Resume
            </a>
          </GlassHoverCard>
        </GlassHoverCardContainer>
      </section>
    </>
  );
});

export default About;
