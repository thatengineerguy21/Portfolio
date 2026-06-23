import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import About from '../components/About';
import SocialIcons from '../components/SocialIcons';
import Skills from '../components/Skills';
import Career from '../components/Career';
import Education from '../components/Education';
import ScrollReveal from '../components/ScrollReveal';
import Marquee from '../components/Marquee';
import SpotifyEmbed from '../components/SpotifyEmbed';
import '../styles/Sections.css';

/* ──────────────────────────────────────────────────────
   FEATURED PROJECTS
   Add or remove entries here. Set `featured: true` on
   any project you want shown on the home page.
   Each entry supports:
   name        – Project title
   description – One-liner
   tags        – Array of tech used
   image       – Import an image, or null
   liveUrl     – Link to live site, or null
   repoUrl     – Link to GitHub repo, or null
   hackathonUrl– Link to Hackathon submission, or null
   hoverColor  – { surface, border } rgba strings
   ────────────────────────────────────────────────────── */
const FEATURED_PROJECTS = [
  {
    name: 'NeuroTicker',
    description: 'Hackathon-winning platform that merges geospatial visualization with real-time financial data — enabling traders to discover location-correlated market patterns at a glance.',
    impact: '1st Place — Gen AI Dev Hackathon',
    tags: ['React', 'TailwindCSS', 'Alpaca Markets API', 'Mapbox',],
    image: null,
    liveUrl: 'https://neuroticker.vercel.app/',
    repoUrl: 'https://github.com/iamproxman/geo-finance-nexus',
    hoverColor: { surface: 'rgba(11, 20, 36, 0.10)', border: 'rgba(11, 20, 36, 0.25)' },
  },
  {
    name: 'CareFlow',
    description: 'Multi-agent AI healthcare assistant that automates post-visit care coordination — selected among 4,500+ global submissions.',
    impact: 'Top 100 — Google Gen AI Academy APAC',
    tags: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Google ADK', 'Gemini 2.5', 'PostgreSQL', 'Docker', 'Cloud Run'],
    image: null,
    liveUrl: 'https://careflow-892626469440.us-central1.run.app/',
    repoUrl: 'https://github.com/Inference-Engines/careflow-agents',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
  },
  // ← Add more featured projects here
];
const SPOTIFY_PLAYLISTS = [
  "https://open.spotify.com/playlist/3iXhfxUwgIAhihizPA0Gf8?si=TlAD_9QZSQ-S9S7Y3uDFPg",
  "https://open.spotify.com/playlist/0WPPuEuYYN20CXhv87m99B?si=zgMFOXWgSs2eTDWLtsIDcw",
  "https://open.spotify.com/playlist/0Mvq2s07qOSYgEKPNOrbUq?si=9QmELWf5Rn-xGHPn_zhaOw"
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

      {/* <Marquee /> */}

      {/* ── Featured Projects ── */}
      <section id="projects" className="section-block">
        <ScrollReveal>
          <div className="section-header-row">
            <h2 className="section-heading">Featured Projects</h2>
            <Link to="/projects" className="section-view-all" data-cursor-hover>
              View All 
              <span className="arrow-circle-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </ScrollReveal>
        <GlassHoverCardContainer className="projects-grid">
          {FEATURED_PROJECTS.map((project, index) => (
            <ScrollReveal key={project.name} delay={index * 0.15}>
              <GlassHoverCard hoverColor={project.hoverColor} data-cursor-hover>
                <div className="project-card-body">
                  {project.image && (
                    <div className="project-image-preview">
                      <img src={project.image} alt={`${project.name} preview`} />
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
                  {(project.liveUrl || project.repoUrl || project.hackathonUrl) && (
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
                      {project.hackathonUrl && (
                        <a href={project.hackathonUrl} target="_blank" rel="noopener noreferrer" className="project-btn project-btn-hackathon" data-cursor-hover>
                          Hackathon
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </GlassHoverCard>
            </ScrollReveal>
          ))}
        </GlassHoverCardContainer>
      </section>

      <Skills />
      <Career />
      <Education />

      <SpotifyEmbed playlists={SPOTIFY_PLAYLISTS} />
    </GlassPanel>
  );
};

export default HomePage;
