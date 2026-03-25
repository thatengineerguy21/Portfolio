import React from 'react';
import { Link } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import About from '../components/About';
import SocialIcons from '../components/SocialIcons';
import Skills from '../components/Skills';
import Career from '../components/Career';
import '../styles/Sections.css';

/* ──────────────────────────────────────────────────────
   FEATURED PROJECTS
   Add or remove entries here. Set `featured: true` on
   any project you want shown on the home page.
   ────────────────────────────────────────────────────── */
const FEATURED_PROJECTS = [
  {
    name: 'Portfolio',
    description: 'Interactive particle canvas portfolio with glassmorphism UI',
    tags: ['React', 'Vite', 'Canvas API'],
    image: null,          // e.g. import img from '../assets/images/portfolio-preview.png'
    liveUrl: null,        // e.g. 'https://yoursite.com'
    repoUrl: null,        // e.g. 'https://github.com/you/repo'
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
  // ← Add more featured projects here
];

const HomePage = () => {
  return (
    <GlassPanel>
      <About />
      <SocialIcons />

      {/* ── Featured Projects ── */}
      <section id="projects" className="section-block">
        <div className="section-header-row">
          <h2 className="section-heading">Featured Projects</h2>
          <Link to="/projects" className="section-view-all" data-cursor-hover>
            View All →
          </Link>
        </div>
        <GlassHoverCardContainer className="projects-grid">
          {FEATURED_PROJECTS.map((project) => (
            <GlassHoverCard key={project.name} hoverColor={project.hoverColor} data-cursor-hover>
              <div className="project-card-body">
                {project.image && (
                  <div className="project-image-preview">
                    <img src={project.image} alt={`${project.name} preview`} />
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

      <Skills />
      <Career />
    </GlassPanel>
  );
};

export default HomePage;
