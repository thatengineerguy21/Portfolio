import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import About from '../components/About';
import SocialIcons from '../components/SocialIcons';
import Skills from '../components/Skills';
import Career from '../components/Career';
import Education from '../components/Education';
import '../styles/Sections.css';

/* ──────────────────────────────────────────────────────
   FEATURED PROJECTS
   Add or remove entries here. Set `featured: true` on
   any project you want shown on the home page.
   ────────────────────────────────────────────────────── */
const FEATURED_PROJECTS = [
  {
    name: 'NeuroTicker',
    description: 'Gen AI Dev Hackathon Winning Project. NeuroTicker is an innovative platform that combines geospatial visualization with financial data analysis, providing traders and investors with location-aware market insights and trading capabilities.',
    tags: ['React', 'TailwindCSS', 'Alpaca Markets API', 'Mapbox',],
    image: null,
    liveUrl: 'https://neuroticker.vercel.app/',
    repoUrl: 'https://github.com/iamproxman/geo-finance-nexus',
    hoverColor: { surface: 'rgba(11, 20, 36, 0.10)', border: 'rgba(11, 20, 36, 0.25)' },
  },
  {
    name: 'CareFlow',
    description: 'Google Gen AI Academy APAC Edition Top 100 project. CareFlow is a multi-agent AI healthcare assistant that acts as a post-visit care coordinator.',
    tags: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Google ADK', 'Gemini 2.5', 'PostgreSQL', 'Docker', 'Cloud Run'],
    image: null,
    liveUrl: 'https://careflow-892626469440.us-central1.run.app/',
    repoUrl: 'https://github.com/Inference-Engines/careflow-agents',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        // Use setTimeout to ensure rendering has occurred before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

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
      <Education />
    </GlassPanel>
  );
};

export default HomePage;
