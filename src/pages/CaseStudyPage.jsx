import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PROJECTS } from '../data/projects';
import GlassPanel from '../components/GlassPanel';
import ScrollReveal from '../components/ScrollReveal';
import WorkflowGraph from '../components/workflow/WorkflowGraph';
import WorkflowPlayground from '../components/workflow/WorkflowPlayground';
import '../styles/Sections.css';
import '../styles/CaseStudy.css';


const CaseStudyPage = () => {
  const { slug } = useParams();

  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !project.caseStudy) {
    return (
      <GlassPanel>
        <div style={{ padding: '4rem 1rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          <h2 className="section-heading" style={{ margin: 0 }}>Case Study Not Found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The project case study you are looking for does not exist or has not been published yet.</p>
          <Link to="/projects" className="project-btn project-btn-repo" data-cursor-hover>
            ← View All Projects
          </Link>
        </div>
      </GlassPanel>
    );
  }

  const { caseStudy } = project;

  return (
    <GlassPanel>
      <div className="cs-container">
        {/* ── Hero Header ── */}
        <div className="cs-hero">
          <Link to="/projects" className="back-link" style={{ display: 'inline-block', alignSelf: 'flex-start' }} data-cursor-hover>
            ← Back to Projects
          </Link>
          
          <div className="cs-hero-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>

          <h1 className="cs-title">{project.name}</h1>
          <p className="cs-description">{project.description}</p>

          {(project.liveUrl || project.repoUrl || project.hackathonUrl || project.youtubeDemoUrl) && (
            <div className="cs-hero-actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-live" data-cursor-hover>
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-repo" data-cursor-hover>
                  GitHub Repo
                </a>
              )}
              {project.hackathonUrl && (
                <a href={project.hackathonUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-hackathon" data-cursor-hover>
                  Hackathon Submission
                </a>
              )}
              {project.youtubeDemoUrl && (
                <a href={project.youtubeDemoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-YouTube-Demo" data-cursor-hover>
                  YouTube Video
                </a>
              )}
            </div>
          )}

          {project.image && (
            <img src={project.image} alt={project.name} className="cs-hero-image" />
          )}
        </div>

        {/* ── Section 01: Project Overview ── */}
        {caseStudy.overview && (
          <ScrollReveal className="cs-section">
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Section 01
              </span>
              <h2 className="cs-section-heading">Project Overview & Motivation</h2>
            </div>
            
            <div className="cs-section-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p><strong>What is it?</strong> {caseStudy.overview.whatIsIt}</p>
              <p><strong>Who is it for?</strong> {caseStudy.overview.whoIsItFor}</p>
              <p><strong>Why build it?</strong> {caseStudy.overview.whyBuildIt}</p>
            </div>

            <div className="cs-grid-2" style={{ marginTop: '0.5rem' }}>
              <div className="cs-card-tinted cs-card-problem">
                <span className="cs-card-label cs-problem-label">⚠️ The Problem</span>
                <p className="cs-card-text">{caseStudy.overview.problem}</p>
              </div>
              <div className="cs-card-tinted cs-card-solution">
                <span className="cs-card-label cs-solution-label">💡 The Engineering Solution</span>
                <p className="cs-card-text">{caseStudy.overview.solution}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── Section 02: Your Role & Contribution ── */}
        {caseStudy.role && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
                Section 02
              </span>
              <h2 className="cs-section-heading">Role & Contribution</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                {caseStudy.role.title}
              </span>
              <span className="career-meta-divider"></span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--accent)' }}>
                {caseStudy.role.teamSize}
              </span>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '0.8rem' }}>
                Key Responsibilities & Ownership
              </h3>
              <ul className="cs-bullet-list">
                {caseStudy.role.contributions.map((item, i) => (
                  <li key={i} className="cs-bullet-item">
                    <span className="cs-bullet-icon">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* ── Section 03: Architecture & Technical Strategy ── */}
        {caseStudy.architecture && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                Section 03
              </span>
              <h2 className="cs-section-heading">Architecture & Technical Strategy</h2>
            </div>

            <div className="cs-section-body">
              <p>{caseStudy.architecture}</p>
            </div>

            {/* ── Interactive Architecture Flow Diagram ── */}
            {(caseStudy.architectureFlow || caseStudy.workflowGraph) && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>
                  System Architecture & Data Flow
                </h3>
                <div style={{ height: '550px', width: '100%', marginBottom: '2rem' }}>
                  <WorkflowGraph 
                    nodes={caseStudy.workflowGraph?.nodes} 
                    edges={caseStudy.workflowGraph?.edges} 
                    flowSteps={caseStudy.architectureFlow} 
                  />
                </div>
              </div>
            )}

            {caseStudy.techRationale && (
              <div style={{ marginTop: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                  Tech Stack Rationale
                </h3>
                <div className="cs-tech-grid">
                  {caseStudy.techRationale.map((item, i) => (
                    <div key={i} className="cs-tech-card">
                      <span className="cs-tech-name">{item.tech}</span>
                      <span className="cs-tech-desc">{item.rationale}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>
        )}

        {/* ── Section 04: Design Decisions & Trade-offs ── */}
        {caseStudy.designDecisions && caseStudy.designDecisions.length > 0 && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Section 04
              </span>
              <h2 className="cs-section-heading">Design Decisions & Trade-offs</h2>
            </div>

            <div className="cs-grid-2">
              {caseStudy.designDecisions.map((decision, i) => (
                <div key={i} className="cs-decision-card">
                  <div className="cs-decision-header">{decision.title}</div>
                  <div className="cs-decision-body">
                    <div className="cs-decision-row">
                      <span className="cs-row-title cs-row-chosen">✓ Why Chosen</span>
                      <p className="cs-row-text">{decision.chosen}</p>
                    </div>
                    <div className="cs-decision-row">
                      <span className="cs-row-title cs-row-alt">✕ Alternative Rejected</span>
                      <p className="cs-row-text">{decision.alternative}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* ── Section 05: Performance & Security ── */}
        {(caseStudy.performance || caseStudy.security) && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Section 05
              </span>
              <h2 className="cs-section-heading">Performance & Security</h2>
            </div>

            <div className="cs-grid-2">
              {caseStudy.performance && (
                <div className="cs-perf-sec-col">
                  <div className="cs-col-main-title">⚡ Performance Optimizations</div>
                  {caseStudy.performance.map((item, i) => (
                    <div key={i} className="cs-item-block">
                      <span className="cs-item-title">{item.title}</span>
                      <span className="cs-item-desc">{item.description}</span>
                    </div>
                  ))}
                </div>
              )}

              {caseStudy.security && (
                <div className="cs-perf-sec-col">
                  <div className="cs-col-main-title">🛡️ Security Controls</div>
                  {caseStudy.security.map((item, i) => (
                    <div key={i} className="cs-item-block">
                      <span className="cs-item-title">{item.title}</span>
                      <span className="cs-item-desc">{item.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* ── Section 06: Engineering Challenges ── */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Section 06
              </span>
              <h2 className="cs-section-heading">Engineering Challenges</h2>
            </div>

            <div>
              {caseStudy.challenges.map((challenge, i) => (
                <div key={i} className="cs-challenge-card">
                  <div className="cs-challenge-header">
                    <span className="cs-challenge-num">{`0${i + 1}`}</span>
                    <h3 className="cs-challenge-title">{challenge.title}</h3>
                  </div>
                  <div className="cs-challenge-cols">
                    <div className="cs-challenge-col">
                      <span className="cs-col-heading cs-col-cause">Why It Happened</span>
                      <p className="cs-col-text">{challenge.cause}</p>
                    </div>
                    <div className="cs-challenge-col">
                      <span className="cs-col-heading cs-col-solution">Engineering Solution</span>
                      <p className="cs-col-text">{challenge.solution}</p>
                    </div>
                    <div className="cs-challenge-col">
                      <span className="cs-col-heading cs-col-outcome">Outcome</span>
                      <p className="cs-col-text">{challenge.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* ── Section 07: Results & Impact ── */}
        {caseStudy.results && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                Section 07
              </span>
              <h2 className="cs-section-heading">Results & Impact</h2>
            </div>

            {caseStudy.results.metrics && (
              <div className="cs-metrics-grid">
                {caseStudy.results.metrics.map((m, i) => (
                  <div key={i} className="cs-metric-card">
                    <span className="cs-metric-value">{m.value}</span>
                    <span className="cs-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {caseStudy.results.outcomes && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '0.8rem' }}>
                  Key Takeaways
                </h3>
                <ul className="cs-bullet-list">
                  {caseStudy.results.outcomes.map((item, i) => (
                    <li key={i} className="cs-bullet-item">
                      <span className="cs-bullet-icon">★</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollReveal>
        )}

        {/* ── Section 08: Lessons Learned & Future Roadmap ── */}
        {(caseStudy.lessons || caseStudy.futureWork) && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Section 08
              </span>
              <h2 className="cs-section-heading">Lessons Learned & Future Roadmap</h2>
            </div>

            <div className="cs-grid-2">
              {caseStudy.lessons && (
                <div className="cs-perf-sec-col" style={{ gap: '12px' }}>
                  <div className="cs-col-main-title" style={{ fontSize: '1.15rem' }}>💡 Lessons Learned</div>
                  <ul className="cs-bullet-list">
                    {caseStudy.lessons.map((item, i) => (
                      <li key={i} className="cs-bullet-item">
                        <span className="cs-bullet-icon">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy.futureWork && (
                <div className="cs-perf-sec-col" style={{ gap: '12px' }}>
                  <div className="cs-col-main-title" style={{ fontSize: '1.15rem' }}>🚀 Future Roadmap</div>
                  <ul className="cs-bullet-list">
                    {caseStudy.futureWork.map((item, i) => (
                      <li key={i} className="cs-bullet-item">
                        <span className="cs-bullet-icon">➔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* ── Enterprise Workflow Playground ── */}
        {((caseStudy.workflows && caseStudy.workflows.length > 0) || !caseStudy.workflows) && (
          <ScrollReveal className="cs-section">
            <div className="section-divider"></div>
            <div className="cs-section-header">
              <span className="cs-section-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Detailed Architecture
              </span>
              <h2 className="cs-section-heading">Multiple Architecture Views</h2>
            </div>
            
            <div className="cs-section-body" style={{ marginBottom: '2rem' }}>
              <p>Explore this interactive playground to inspect specific architecture sub-systems, data payloads, and workflows isolated for clarity.</p>
            </div>

            <div style={{ width: '100%', height: '700px' }}>
              <WorkflowPlayground workflows={caseStudy.workflows || ['rest', 'microservices', 'ai-agent', 'queue', 'auth']} />
            </div>
          </ScrollReveal>
        )}

      </div>
    </GlassPanel>
  );
};

export default CaseStudyPage;
