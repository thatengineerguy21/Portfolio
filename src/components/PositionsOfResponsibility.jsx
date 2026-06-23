import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';

const POR_ENTRIES = [
  {
    role: 'Club Service Director',
    organization: 'Rotaract Club of the D Y Patil College of Engineering',
    date: 'Sept 2024 - Jul 2025',
    description: 'Organized and Managed RunForCure Marathon 2025. Managed various Club Service Events and fostered Communication and Engagement through Events like Navaratri, Sports Meet, etc ',
    hoverColor: { surface: 'rgba(255, 120, 180, 0.10)', border: 'rgba(255, 120, 180, 0.25)' },
  },
  {
    role: 'Technical Coordinator',
    organization: 'Information Technology Engineering Student Association (ITESA)',
    date: 'Aug 2024 - Jun 2025',
    description: 'Managed Technical domain events for ITESA and collaborated with team to build Department Webpage. Major Contributor in Techfest and Designed Interactive Tech games for Annual Techfest under IT Theme',
    hoverColor: { surface: 'rgba(199, 120, 255, 0.1)', border: 'rgba(120, 188, 255, 0.34)' },
  },
  // ← Add more POR entries here
];

const PositionsOfResponsibility = React.memo(() => {
  return (
    <section id="positions-of-responsibility" className="section-block">
      <h2 className="section-heading">Positions of Responsibility</h2>
      <GlassHoverCardContainer className="education-timeline">
        {POR_ENTRIES.map((entry, index) => (
          <ScrollReveal key={entry.role} delay={index * 0.15}>
            <div className="education-entry">
              <span className="education-dot" />
              <GlassHoverCard hoverColor={entry.hoverColor} data-cursor-hover>
                <div className="education-card-body">
                  <span className="education-degree">{entry.role}</span>
                  <div className="education-meta">
                    <span className="education-institution">{entry.organization}</span>
                    <span className="education-meta-divider" />
                    <span className="education-date">{entry.date}</span>
                  </div>
                  <span className="education-desc">{entry.description}</span>
                </div>
              </GlassHoverCard>
            </div>
          </ScrollReveal>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
});

export default PositionsOfResponsibility;
