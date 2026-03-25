import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import '../styles/Sections.css';

const CAREER_ENTRIES = [
  {
    role: 'Research & Development Intern',
    company: 'STSARC Pvt. Ltd',
    date: 'Dec. 2024 - Feb. 2026 (14-Months, Part-time, Hybrid)',
    description: [
      '- Design AI system architecture for an EdTech platform by contributing to the design of the RAG pipeline, the evaluation of SLM vs LLM, and backend workflows, optimizing for 55–60% lower inference cost and sub-second response latency targets \n',
      '- Authored end-to-end SRS and product specs covering 20+ functional & non-functional requirements, prioritized 4 core features, and finalized a scalable full-stack + AI tech stack, reducing future rework by ∼25% \n',
      '- Owned a production frontend PR, implementing a reusable Radio Group UI component, improving UI consistency and cutting similar component dev time by ∼20%'
    ],
    hoverColor: { surface: 'rgba(237, 142, 18, 0.15)', border: 'rgba(0, 200, 150, 0.20)' },
  },
  // {
  //   role: 'ML Research Assistant',
  //   company: 'University Lab',
  //   date: 'Jan 2025 – May 2025',
  //   description: 'Developed predictive models for climate data analysis',
  //   hoverColor: { surface: 'rgba(120, 180, 255, 0.08)', border: 'rgba(120, 180, 255, 0.20)' },
  // },
  // {
  //   role: 'Open Source Contributor',
  //   company: 'Various Projects',
  //   date: '2024',
  //   description: 'Contributing to React ecosystem and developer tools',
  //   hoverColor: { surface: 'rgba(200, 130, 255, 0.08)', border: 'rgba(200, 130, 255, 0.20)' },
  // },
];

const Career = () => {
  return (
    <section id="career" className="section-block">
      <h2 className="section-heading">Career</h2>
      <GlassHoverCardContainer className="career-timeline">
        {CAREER_ENTRIES.map((entry) => (
          <div key={entry.role} className="career-entry">
            <span className="career-dot" />
            <GlassHoverCard hoverColor={entry.hoverColor} data-cursor-hover>
              <div className="career-card-body">
                <span className="career-role">{entry.role}</span>
                <div className="career-meta">
                  <span className="career-company">{entry.company}</span>
                  <span className="career-meta-divider" />
                  <span className="career-date">{entry.date}</span>
                </div>
                <span className="career-desc">{entry.description}</span>
              </div>
            </GlassHoverCard>
          </div>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
};

export default Career;
