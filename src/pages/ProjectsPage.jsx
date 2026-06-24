import React, { useEffect } from 'react';
import { Link, replace } from 'react-router-dom';
import { GlassHoverCardContainer, GlassHoverCard } from '../components/GlassHoverCard';
import GlassPanel from '../components/GlassPanel';
import Projects3DWorld from '../components/Projects3DWorld';
import '../styles/Sections.css';
import portfolioImg from '../assets/images/portfolio.png';
import neuroTickerImage from '../assets/images/neuroticker.png'
import careFlowImage from '../assets/images/careflow.png'
import offDutyImage from '../assets/images/offduty.png'
import jdSkillsImage from '../assets/images/jdskills.png'
import weatherIntelligenceImage from '../assets/images/weatherIntelligence.png'
import stackoverflowIntelligenceImage from '../assets/images/stackoverflowIntelligence.png'
import jalSanketImage from '../assets/images/jalSanket.png'
import unihelpImage from '../assets/images/unihelp.png'

/* ──────────────────────────────────────────────────────
   ALL PROJECTS
   Add your projects here. Each entry supports:
   name        – Project title
   description – One-liner
   tags        – Array of tech used
   image       – Import an image, or null
   liveUrl     – Link to live site, or null
   repoUrl     – Link to GitHub repo, or null
   hackathonUrl– Link to Hackathon submission, or null
   youtubeDemoUrl - Link to YouTube video, or null
   hoverColor  – { surface, border } rgba strings
   ────────────────────────────────────────────────────── */
const ALL_PROJECTS = [
  {
    name: 'NeuroTicker',
    description: 'An award-winning, AI-driven fintech platform that merges geospatial location intelligence with real-time financial data to visualize global market trends and portfolio exposure at a glance. Architected for sub-second market awareness, the platform bypasses traditional REST polling by leveraging persistent WebSockets for live data streaming, a highly scalable Supabase backend engineered for millions of signals, and high-performance Mapbox GIS rendering. Powered by advanced LLMs (Groq, Tavily), it delivers confidence-ranked trading signals, AI-driven earnings forecasts, and automated alerts, demonstrating exceptional depth in full-stack systems engineering and generative AI integration.',
    impact: '2nd Place — Gen AI Dev Hackathon',
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Mapbox', 'Alpaca Markets API', 'Supabase', 'FastAPI', 'WebSockets', 'Groq', 'Tavily AI', 'LLMs'],
    image: neuroTickerImage,
    liveUrl: 'https://neuroticker.vercel.app/',
    repoUrl: 'https://github.com/iamproxman/geo-finance-nexus',
    youtubeDemoUrl: 'https://www.youtube.com/watch?v=DDbJPrrW2C4',
    hoverColor: { surface: 'rgba(11, 20, 36, 0.10)', border: 'rgba(11, 20, 36, 0.25)' },
    bento: 'wide',
  },
  {
    name: 'CareFlow by Inference Engines',
    description: 'Selected among 4,500+ global submissions in the Google Cloud Gen AI Academy APAC (Top 100), CareFlow is a cloud-native, multi-agent healthcare platform that automates post-visit care coordination for chronic disease patients. Orchestrated via the Google Agent Development Kit (ADK) and powered by Gemini 2.5 Pro/Flash, the system implements robust AI safety gates, AlloyDB/PostgreSQL for persistent agent memory, and Model Context Protocol (MCP) tools for seamless workflow integration with external services like Gmail and Calendar. Designed to bridge the gap between clinical visits and home-based care, CareFlow utilizes a modern React/TailwindCSS interface on Google Cloud Run to deliver transparent, actionable "Care Receipts" that empower patient self-management.',
    impact: 'Top 100 — Google Gen AI Academy APAC',
    tags: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Google ADK', 'Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Model Context Protocol (MCP)', 'AlloyDB', 'PostgreSQL', 'Docker', 'Google Cloud Run', 'GCP', 'Multi-Agent Systems'],
    image: careFlowImage,
    // liveUrl: 'https://careflow-892626469440.us-central1.run.app/',
    repoUrl: 'https://github.com/thatengineerguy21/careflow',
    youtubeDemoUrl: 'https://youtu.be/HBNQerMbNmw?si=x3oVeShC_wyH2r-V',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
  },
  {
    name: 'Portfolio',
    description: 'An elite, high-performance personal portfolio web application engineered with React, Vite, and Tailwind CSS to showcase award-winning AI, cloud computing, and full-stack projects. The architecture features an advanced custom glassmorphism UI engine enriched with real-time mouse-tracking spotlight lighting, shape-shifting custom cursor micro-interactions, smooth scroll physics (Lenis), and live GitHub contribution graphs. Optimized for lightning-fast loading and strict accessibility, the platform serves as a powerful demonstration of elite frontend craftsmanship, modern UI/UX design principles, and production-ready technical depth.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Glassmorphism', 'Lenis (Scroll Physics)', 'Vercel Analytics', 'Vitest', 'Single Page Application (SPA)', 'UI/UX Animation'],
    image: portfolioImg,
    liveUrl: 'https://www.thatengineerguy.in',
    repoUrl: 'https://github.com/thatengineerguy21/Portfolio',
    hoverColor: { surface: 'rgba(120, 180, 255, 0.10)', border: 'rgba(120, 180, 255, 0.25)' },
  },
  {
    name: 'Off-Duty by Storeops',
    description: 'Off-Duty by Storeops is an inventory-aware AI store manager developed for a Google Cloud Hackathon that transforms retail operations by proactively bundling and promoting surplus cafe inventory rather than relying on static menus. Powered by Google Cloud Agent Builder and Gemini, the system achieves real-time database grounding via MongoDB Model Context Protocol (MCP) integrations atop a high-performance Python FastAPI backend and a responsive React frontend. This production-grade architecture bridges live inventory data with autonomous AI decision-making, providing offline businesses with an enterprise-ready solution to reduce stock waste and drive revenue.',
    tags: ['Python', 'FastAPI', 'Google Cloud Agent Builder', 'Gemini', 'MCP (Model Context Protocol)', 'MongoDB', 'React', 'JavaScript', 'Docker', 'Google Cloud'],
    image: offDutyImage,
    liveUrl: 'https://off-duty-180895049757.us-central1.run.app/',
    repoUrl: 'https://github.com/thatengineerguy21/storeops',
    youtubeDemoUrl: 'https://youtu.be/2TLC_nwCI6c?si=uw-GuaVzjELgnJZv',
    hoverColor: { surface: 'rgba(18, 26, 23, 0.10)', border: 'rgba(0, 237, 100, 0.25)' },
    bento: 'wide'
  },
  {
    name: 'Jal Sanket Kendra',
    description: 'Jal Sanket Kendra is a high-performance environmental informatics platform and real-time dashboard engineered for advanced water quality monitoring and automated Heavy Metal Pollution Index (HPI) evaluation. Built with a robust Python and FastAPI backend paired with a lightweight SQLite database, the system executes rapid data processing to translate complex physicochemical datasets into actionable visualizations. Fully containerized with Docker for seamless deployment, the platform empowers researchers and municipal authorities to conduct precise environmental risk assessments and ensure drinking water safety compliance.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Docker', 'REST API', 'Data Visualization'],
    image: jalSanketImage,
    repoUrl: 'https://github.com/thatengineerguy21/Jal-Sanket-Kendra',
    hoverColor: { surface: 'rgba(0, 212, 178, 0.10)', border: 'rgba(0, 212, 178, 0.25)' }
  },
  {
    name: 'Weather Intelligence Agent',
    description: 'A production-ready, serverless AI assistant built with the Google Agent Development Kit (ADK) and Gemini 2.5 Flash that democratizes access to complex meteorological data through intuitive natural language querying. Engineered using Python, FastAPI, and Model Context Protocol (MCP) tooling, the agent seamlessly bridges advanced AI reasoning with robust historical climate data retrieval. Containerized with Docker and deployed on Google Cloud Run, the platform showcases high-performance cloud-native architecture and modern end-to-end AI agent development.',
    tags: ['Python', 'FastAPI', 'Google ADK', 'Gemini 2.5 Flash', 'MCP', 'Vertex AI', 'Google Cloud Run', 'Docker', 'HTML'],
    image: weatherIntelligenceImage,
    liveUrl: 'https://weather-intelligence-agent.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/weather-intelligence-agent',
    hoverColor: { surface: 'rgba(66, 133, 244, 0.15)', border: 'rgba(66, 133, 244, 0.35)' }
  },
  {
    name: 'Job Description Skills Extractor',
    description: 'A production-ready, AI-powered parsing engine that instantly converts unstructured job descriptions into highly structured, actionable talent intelligence—including core skills, experience levels, and role qualifications. Built using the Google Agent Development Kit (ADK) and Gemini AI on Vertex AI, the platform integrates a robust FastAPI backend with an interactive chat interface. Containerized with Docker and deployed serverless on Google Cloud Run, the system delivers high scalability to automate candidate screening and empower data-driven recruitment pipelines.',
    tags: ['Python', 'FastAPI', 'Google ADK', 'Gemini AI', 'Vertex AI', 'Google Cloud Run', 'GCP', 'Docker', 'NLP'],
    image: jdSkillsImage,
    liveUrl: 'https://jd-skills-extractor-adk.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/jd-skills-extractor',
    hoverColor: { surface: 'rgba(168, 85, 247, 0.10)', border: 'rgba(168, 85, 247, 0.25)' },
    bento: 'wide'
  },
  
  {
    name: 'StackOverflow Intelligence Agent',
    description: "A production-grade, serverless AI developer assistant that queries BigQuery's massive StackOverflow dataset (24M+ questions) in real time to deliver actionable, data-driven insights into technology stacks and programming trends. Built with the Google Agent Development Kit (ADK), Vertex AI, and Model Context Protocol (MCP) Toolbox for Databases, the agent seamlessly bridges natural language understanding with complex big data analytics. The system is architected for robust enterprise scalability, featuring a containerized FastAPI backend deployed directly to Google Cloud Run.",
    tags: ['Python', 'FastAPI', 'Google ADK', 'MCP Toolbox', 'Vertex AI', 'BigQuery', 'GCP', 'Docker'],
    image: stackoverflowIntelligenceImage,
    liveUrl: 'https://stackoverflow-agent.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/stackoverflow-intelligence-agent',
    hoverColor: { surface: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.35)' },
    bento: 'wide'
  },
  {
    name: 'Unihelp',
    description: 'A full-stack student accommodation and campus helpdesk platform engineered to streamline the discovery of hostels, paying guest (PG) housing, and dining hall facilities. Built on a scalable MERN stack utilizing React and Redux for predictable state management alongside an Express/MongoDB backend, the platform unifies fragmented local living amenities into a single, highly responsive user dashboard.',
    tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    image: unihelpImage,
    liveUrl: 'https://unihelp-frontend.vercel.app/',
    repoUrl: 'https://github.com/thatengineerguy21/unihelp-frontend',
    hoverColor: { surface: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.30)' }
  },
  {
    name: 'Video Transcript Extractor',
    description: 'A high-performance Chrome Extension built on the modern Manifest V3 architecture that automates full transcript extraction from online video lectures with a single click. Leveraging Chrome Extension APIs and efficient DOM manipulation, it bypasses manual copy-pasting to instantly extract, parse, and format sidebar captions into clean, timestamped text. Designed for productivity, it enables immediate exporting and seamless file downloading to optimize research, note-taking, and AI workflow preprocessing.',
    tags: ['JavaScript', 'Chrome Manifest V3', 'Extension API', 'DOM Manipulation', 'HTML5', 'CSS3'],
    repoUrl: 'https://github.com/thatengineerguy21/video-transcript-extractor',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' }
  }
  // ← Add more projects here
];

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
                    {(project.liveUrl || project.repoUrl || project.hackathonUrl || project.youtubeDemoUrl) && (
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
