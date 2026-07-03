import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import { useSanityData } from '../hooks/useSanityData';
import { POR_QUERY } from '../lib/sanityQueries';

const PositionsOfResponsibility = React.memo(() => {
  const { data: porEntries, loading, error } = useSanityData(POR_QUERY);

  if (loading) return null;

  return (
    <section id="positions-of-responsibility" className="section-block">
      <h2 className="section-heading">Positions of Responsibility</h2>
      <GlassHoverCardContainer className="education-timeline">
        {porEntries.map((entry, index) => (
          <ScrollReveal key={entry._id || entry.role} delay={index * 0.15}>
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
