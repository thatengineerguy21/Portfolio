import React from 'react';
import { Link } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import '../styles/Sections.css';

/* ──────────────────────────────────────────────────────
   ALL PROJECTS
   Add your projects here. Each entry supports:
     name        – Project title
     description – One-liner
     tags        – Array of tech used
     image       – Import an image, or null
     liveUrl     – Link to live site, or null
     repoUrl     – Link to GitHub repo, or null
     hoverColor  – { surface, border } rgba strings
   ────────────────────────────────────────────────────── */
const ALL_PROJECTS = [
  {
    name: 'Portfolio',
    description: 'Interactive particle canvas portfolio with glassmorphism UI',
    tags: ['React', 'Vite', 'Canvas API'],
    image: '/src/assets/images/portfolio.png',
    liveUrl: 'https://www.thatengineerguy.in',
    repoUrl: null,
    hoverColor: { surface: 'rgba(120, 180, 255, 0.10)', border: 'rgba(120, 180, 255, 0.25)' },
  },
  // {
  //   name: 'ML Pipeline',
  //   description: 'End-to-end machine learning pipeline with automated training',
  //   tags: ['Python', 'TensorFlow', 'Docker'],
  //   image: null,
  //   liveUrl: null,
  //   repoUrl: null,
  //   hoverColor: { surface: 'rgba(255, 152, 0, 0.10)', border: 'rgba(255, 152, 0, 0.25)' },
  // },
  // {
  //   name: 'Cloud Dashboard',
  //   description: 'Real-time cloud infrastructure monitoring dashboard',
  //   tags: ['React', 'AWS', 'D3.js'],
  //   image: null,
  //   liveUrl: null,
  //   repoUrl: null,
  //   hoverColor: { surface: 'rgba(0, 200, 150, 0.10)', border: 'rgba(0, 200, 150, 0.25)' },
  // },
  // {
  //   name: 'Algorithm Visualizer',
  //   description: 'Interactive data structure and algorithm visualizations',
  //   tags: ['JavaScript', 'Canvas'],
  //   image: null,
  //   liveUrl: null,
  //   repoUrl: null,
  //   hoverColor: { surface: 'rgba(200, 130, 255, 0.10)', border: 'rgba(200, 130, 255, 0.25)' },
  // },
  // ← Add more projects here
];

const ProjectsPage = () => {
  return (
    <GlassPanel>
      <section className="section-block">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
          <Link to="/" className="back-link" style={{ display: 'inline-block' }} data-cursor-hover>← Back</Link>
          <h2 className="section-heading" style={{ margin: 0 }}>All Projects</h2>
        </div>
        <GlassHoverCardContainer className="projects-grid">
          {ALL_PROJECTS.map((project) => (
            <GlassHoverCard key={project.name} hoverColor={project.hoverColor} data-cursor-hover>
              <div className="project-card-body">
                {project.image && (
                  <div className="project-image-preview">
                    <img src={project.image} alt={`${project.name} preview`} style={{ width: '100%', height: 'auto' }} />
                  </div>
                )}
                <span className="project-name">{project.name}</span>
                <span className="project-description">{project.description}</span>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                {(project.liveUrl || project.repoUrl) && (
                  <div className="project-actions">
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
                  </div>
                )}
              </div>
            </GlassHoverCard>
          ))}
        </GlassHoverCardContainer>
      </section>
    </GlassPanel>
  );
};

export default ProjectsPage;
