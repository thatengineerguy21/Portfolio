import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import Projects3DWorld from '../components/Projects3DWorld';
import { ALL_PROJECTS } from '../data/projects';
import '../styles/Sections.css';

const ProjectsPage = () => {
  const [isBrutalMode, setIsBrutalMode] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Brutal mode hidden per request */}
      {/* {isBrutalMode && (
        <button 
          className="brutal-toggle-btn active"
          onClick={() => setIsBrutalMode(false)}
          data-cursor-hover
        >
          <div className="indicator"></div>
          BRUTAL MODE: ON
        </button>
      )} */}

      {/* <Projects3DWorld projects={ALL_PROJECTS} isActive={isBrutalMode} /> */}

      {/* {!isBrutalMode && ( */}
        <GlassPanel>
          <section className="section-block">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 10, width: '100%' }}>
              <Link to="/" className="back-link" style={{ display: 'inline-block' }} data-cursor-hover>← Back</Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="section-heading" style={{ margin: 0 }}>All Projects</h2>
                {/* <button 
                  className="project-btn project-btn-hackathon"
                  onClick={() => setIsBrutalMode(true)}
                  data-cursor-hover
                >
                  Brutal Mode: OFF
                </button> */}
              </div>
            </div>
            <GlassHoverCardContainer className="projects-grid">
              {ALL_PROJECTS.map((project) => (
                <GlassHoverCard
                  key={project.name}
                  hoverColor={project.hoverColor}
                  className={project.bento === 'wide' ? 'bento-wide' : ''}
                  data-cursor-hover
                >
                  <div className="project-card-body">
                    {project.image && (
                      <div className="project-image-preview">
                        <img src={project.image} alt={`${project.name} preview`} style={{ width: '100%', height: 'auto' }} />
                      </div>
                    )}
                    <span className="project-name">{project.name}</span>
                    {project.impact && (
                      <span className="project-impact">{project.impact}</span>
                    )}
                    <span className="project-description">{project.description}</span>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    {(project.caseStudy || project.liveUrl || project.repoUrl || project.hackathonUrl || project.youtubeDemoUrl) && (
                      <div className="project-actions">
                        {project.caseStudy && (
                          <Link to={`/projects/${project.slug}`} className="project-btn project-btn-hackathon" data-cursor-hover>
                            Case Study
                          </Link>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-live" data-cursor-hover>
                            Live Demo
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-repo" data-cursor-hover>
                            GitHub
                          </a>
                        )}
                        {project.hackathonUrl && (
                          <a href={project.hackathonUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-hackathon" data-cursor-hover>
                            Hackathon
                          </a>
                        )}
                        {project.youtubeDemoUrl && (
                          <a href={project.youtubeDemoUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-YouTube-Demo" data-cursor-hover>
                            YouTube Video
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </GlassHoverCard>
              ))}
            </GlassHoverCardContainer>
          </section>
        </GlassPanel>
      {/* )} */}
    </>
  );
};

export default ProjectsPage;

