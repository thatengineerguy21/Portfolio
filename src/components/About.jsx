import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import resumePdf from '../assets/documents/Vedant_Chaudhari_DYPCOE.pdf';
import downloadIcon from '../assets/icons/download-file.svg';
import profilePhoto from '../assets/images/profile-casual.jpg'

const About = () => {
  return (
    <>
      <h1 style={{ color: 'white', fontFamily: '"Exo 2", sans-serif', fontWeight: 900, textAlign: 'center' }}>Vedant Chaudhari</h1>
      <section id="about" style={{ padding: '2rem', color: 'white' }}>
        <h2 style={{ marginBottom: '1.5rem', fontFamily: '"Exo 2", sans-serif', fontWeight: 400 }}>Full Stack Developer & Machine Learning Enthusiast</h2>
        <GlassHoverCardContainer>
          <GlassHoverCard contentClassName="about-content">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', maxWidth: '950px', cursor: 'pointer', padding: '1rem' }}>
              <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={profilePhoto}
                  alt="Profile Photo"
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: '"Exo 2", sans-serif', fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                  Hello, I'm
                  <br />
                  Vedant Chaudhari
                </h3>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', fontFamily: '"Exo 2", sans-serif' }}>
                  I'm a <strong style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 600 }}>21 y/o Full Stack Developer</strong> based out of <strong style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 600 }}>Pune, India</strong>.
                  <br /><br />
                  <strong style={{ color: 'rgba(255, 241, 118, 1)', fontWeight: 700 }}>Interests:</strong> Data Structures and Algorithms, Computer Networks, Operating Systems, Cloud Computing, Data Science, Machine Learning Algorithms, Statistics, Artificial Intelligence.
                </p>
              </div>
            </div>
          </GlassHoverCard>
          <GlassHoverCard
            hoverColor={{ surface: 'rgba(220, 50, 50, 0.12)', border: 'rgba(220, 50, 50, 0.30)' }}
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
                color: 'rgb(240, 240, 240)',
                minWidth: '80px',
                fontFamily: '"Exo 2", sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}><img src={downloadIcon} alt="Download Resume" style={{ width: '20px', height: '20px', filter: 'invert(1)' }} /></span>
              Download Resume
            </a>
          </GlassHoverCard>
        </GlassHoverCardContainer>
      </section>
    </>
  );
};

export default About;

