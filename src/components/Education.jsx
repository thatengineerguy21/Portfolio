import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import { useSanityData } from '../hooks/useSanityData';
import { EDUCATION_QUERY } from '../lib/sanityQueries';

const Education = React.memo(() => {
  const { data: educationEntries, loading, error } = useSanityData(EDUCATION_QUERY);

  if (loading) return null;

  return (
    <section id="education" className="section-block">
      <h2 className="section-heading">Education</h2>
      <GlassHoverCardContainer className="education-timeline">
        {educationEntries.map((entry, index) => (
          <ScrollReveal key={entry._id || entry.degree} delay={index * 0.15}>
            <div className="education-entry">
              <span className="education-dot" />
              <GlassHoverCard hoverColor={entry.hoverColor} data-cursor-hover>
                <div className="education-card-body">
                  <span className="education-degree">{entry.degree}</span>
                  <div className="education-meta">
                    <span className="education-institution">{entry.institution}</span>
                    <span className="education-meta-divider" />
                    <span className="education-date">{entry.date}</span>
                    {entry.grade && <span className="education-grade">{entry.grade}</span>}
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

export default Education;
