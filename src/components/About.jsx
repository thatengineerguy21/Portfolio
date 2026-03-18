import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';

const About = () => {
  return (
    <section id="about" style={{ padding: '2rem', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', fontFamily: '"Exo 2", sans-serif', fontWeight: 400 }}>About Me</h2>
      <GlassHoverCardContainer>
        <GlassHoverCard contentClassName="about-content">
          <div style={{ maxWidth: '600px', cursor: 'pointer' }}>
            <h3 style={{ fontFamily: '"Exo 2", sans-serif', fontWeight: 400, color: 'rgb(240, 240, 240)' }}>
              Hello, I'm thatengineerguy!
            </h3>
            <p style={{ marginTop: '1rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', fontFamily: '"Exo 2", sans-serif' }}>
              I am a passionate software engineer with a love for creating beautiful, dynamic, and intuitive
              user interfaces. I build web applications that not only function flawlessly but also
              leave a lasting aesthetic impression.
            </p>
          </div>
        </GlassHoverCard>
      </GlassHoverCardContainer>
    </section>
  );
};

export default About;
