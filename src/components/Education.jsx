import React from 'react';
import { GlassHoverCardContainer, GlassHoverCard } from './GlassHoverCard';
import '../styles/Sections.css';

const EDUCATION_ENTRIES = [
  {
    degree: 'Bachelor of Engineering — Information Technology',
    institution: 'Savitribai Phule Pune University, Pune',
    date: '2023 – 2027',
    grade: 'CGPA: 9.23/10',
    description: 'Relevant coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Machine Learning, Computer Networks, Cloud Computing, Theory of Computation, Software Engineering',
    hoverColor: { surface: 'rgba(120, 180, 255, 0.10)', border: 'rgba(120, 180, 255, 0.25)' },
  },
  {
    degree: 'Bachelor of Science — Data Science and Artificial Intelligence',
    institution: 'Indian Institute of Technology, Guwahati',
    date: '2023 - 2028',
    grade: 'CGPA: 4.22/10',
    description: 'Relevant coursework: Statistics, Data Mining and Warehousing, Artificial Intelligence, Machine Learning, Statistical Inferencing, Optimization Methods, Probability Theory, Signals and Systems, Linear Algebra',
    hoverColor: { surface: 'rgba(120, 255, 138, 0.1)', border: 'rgba(120, 255, 138, 0.25)' },
  },
  // {
  //   degree: 'Higher Secondary Certificate (XII)',
  //   institution: 'Your School',
  //   date: '2020 – 2022',
  //   description: 'Science stream — Physics, Chemistry, Mathematics, Computer Science',
  //   hoverColor: { surface: 'rgba(160, 120, 255, 0.10)', border: 'rgba(160, 120, 255, 0.25)' },
  // },
  // ← Add more education entries here
];

const Education = React.memo(() => {
  return (
    <section id="education" className="section-block">
      <h2 className="section-heading">Education</h2>
      <GlassHoverCardContainer className="education-timeline">
        {EDUCATION_ENTRIES.map((entry) => (
          <div key={entry.degree} className="education-entry">
            <span className="education-dot" />
            <GlassHoverCard hoverColor={entry.hoverColor} data-cursor-hover>
              <div className="education-card-body">
                <span className="education-degree">{entry.degree}</span>
                <div className="education-meta">
                  <span className="education-institution">{entry.institution}</span>
                  <span className="education-meta-divider" />
                  <span className="education-date">{entry.date}</span>
                  <span className="education-grade">{entry.grade}</span>
                </div>
                <span className="education-desc">{entry.description}</span>
              </div>
            </GlassHoverCard>
          </div>
        ))}
      </GlassHoverCardContainer>
    </section>
  );
});

export default Education;
