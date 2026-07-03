import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import { useSanityData } from '../hooks/useSanityData';
import { CAREER_QUERY } from '../lib/sanityQueries';

const Career = React.memo(() => {
  const { data: careerEntries, loading, error } = useSanityData(CAREER_QUERY);

  if (loading) return null;

  return (
    <section id="career" className="section-block">
      <h2 className="section-heading">Career</h2>
      <GlassHoverCardContainer className="career-timeline">
        {careerEntries.map((entry, index) => (
          <ScrollReveal key={entry._id || entry.role} delay={index * 0.15}>
            <div className="career-entry">
              <span className="career-dot" />
              <GlassHoverCard hoverColor={entry.hoverColor} data-cursor-hover>
                <div className="career-card-body">
                  <span className="career-role">{entry.role}</span>
                  <div className="career-meta">
                    <span className="career-company">{entry.company}</span>
                    <span className="career-meta-divider" />
                    <span className="career-date">{entry.date}</span>
                  </div>
                  <span className="career-desc">
                    {Array.isArray(entry.description) 
                      ? entry.description.map((line, i) => <span key={i} style={{display: 'block', marginBottom: '0.5rem'}}>{line}</span>)
                      : entry.description}
                  </span>
                </div>
              </GlassHoverCard>
            </div>
          </ScrollReveal>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
});

export default Career;
