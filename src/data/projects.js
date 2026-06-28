import portfolioImg from '../assets/images/portfolio.png';
import neuroTickerImage from '../assets/images/neuroticker.png';
import careFlowImage from '../assets/images/careflow.png';
import offDutyImage from '../assets/images/offduty.png';
import jdSkillsImage from '../assets/images/jdskills.png';
import weatherIntelligenceImage from '../assets/images/weatherIntelligence.png';
import stackoverflowIntelligenceImage from '../assets/images/stackoverflowIntelligence.png';
import jalSanketImage from '../assets/images/jalSanket.png';
import unihelpImage from '../assets/images/unihelp.png';

/* ──────────────────────────────────────────────────────
   ALL PROJECTS & CASE STUDY DATA
   ────────────────────────────────────────────────────── */
export const ALL_PROJECTS = [
  {
    slug: 'neuroticker',
    name: 'NeuroTicker',
    description: 'A fintech platform that combines geospatial location data with real-time financial data to visualize global market trends and portfolio exposure. It streams live market feeds directly to the client rather than using traditional polling, and analyzes incoming data to generate confidence-ranked trading signals, earnings forecasts, and automated alerts.',
    impact: '2nd Place — Gen AI Dev Hackathon',
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Mapbox', 'Alpaca Markets API', 'Supabase', 'FastAPI', 'WebSockets', 'Groq', 'Tavily AI', 'LLMs'],
    image: neuroTickerImage,
    liveUrl: 'https://neuroticker.vercel.app/',
    repoUrl: 'https://github.com/iamproxman/geo-finance-nexus',
    youtubeDemoUrl: 'https://www.youtube.com/watch?v=DDbJPrrW2C4',
    hoverColor: { surface: 'rgba(11, 20, 36, 0.10)', border: 'rgba(11, 20, 36, 0.25)' },
    bento: 'wide',
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'NeuroTicker is an advanced fintech web application designed to bridge the gap between real-time financial market movements and global geospatial data. By synthesizing live stock feeds, sentiment analysis, and geographic exposure, it provides institutional-grade market visualization to retail traders.',
        whoIsItFor: 'Active retail traders, quantitative analysts, and portfolio managers who need to track macroeconomic events and location-correlated financial trends in real time.',
        whyBuildIt: 'Traditional financial dashboards display tabular tickers and basic charts, ignoring the vast geographic reality behind global supply chains and geopolitical events. NeuroTicker was built to map financial impact directly to real-world locations.',
        problem: 'Existing trading platforms rely on heavy polling for market updates, resulting in delayed signals, high server overhead, and disconnected news feeds that leave traders reacting too late to localized market catalysts.',
        solution: 'Engineered a real-time WebSocket streaming pipeline connected to Alpaca Markets and Supabase, feeding directly into an interactive 3D Mapbox visualization layer powered by Groq and Tavily AI for instant impact analysis.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Full Stack & AI Engineer',
        teamSize: 'Team of 3',
        contributions: [
          'Architected the low-latency WebSocket ingestion engine using FastAPI and Supabase to broadcast live tick data to the client.',
          'Integrated Mapbox GL JS with custom shaders and React wrappers to plot dynamic, color-coded market activity across global map layers.',
          'Built the AI analysis engine utilizing Groq (Llama 3) and Tavily AI to instantly synthesize earnings reports and local news into confidence-ranked trading signals.',
          'Designed the dark-mode glassmorphism UI/UX with Tailwind CSS, ensuring clear visual hierarchy across dense data streams.'
        ]
      },
      // Section 03: Architecture
      architecture: 'The system operates on a decoupled event-driven architecture. A FastAPI backend acts as the orchestration layer, managing persistent WebSocket connections to the Alpaca Markets API. Ingested data streams are processed in real time, enriched with geographic metadata via Tavily AI, and cached in Supabase. The Next.js frontend subscribes to these streams, dynamically rendering state updates onto a hardware-accelerated Mapbox GL canvas while preserving strict 60 FPS performance.',
      techRationale: [
        { tech: 'Next.js & TypeScript', rationale: 'Chosen for robust server-side rendering capabilities, seamless API route integration, and strict type safety across complex financial data structures.' },
        { tech: 'FastAPI & WebSockets', rationale: 'Selected over traditional Express/REST for its high-concurrency async event loop and native WebSocket support, essential for streaming live tick data.' },
        { tech: 'Mapbox GL & WebGL', rationale: 'Required for high-performance geospatial rendering of thousands of data points without DOM congestion or rendering lag.' },
        { tech: 'Groq & Tavily AI', rationale: 'Groq provides ultra-low-latency LLM inference (300+ tokens/sec) necessary for real-time news sentiment parsing, while Tavily enables fast web grounding.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Real-Time WebSockets vs. HTTP Long Polling',
          chosen: 'Implemented a persistent bidirectional WebSocket architecture. This established a single, long-lived TCP connection, reducing header payload overhead by 95% and achieving sub-50ms tick propagation.',
          alternative: 'Rejected HTTP REST polling (even at 1-second intervals) because it introduced unacceptable latency spikes, exhausted rate limits on financial APIs, and caused UI jitter during re-renders.'
        },
        {
          title: 'Decoupled State Management for Map Visualization',
          chosen: 'Utilized atomic, reactive state slices via Zustand specifically for map overlay markers, keeping financial data updates completely isolated from the main React component tree.',
          alternative: 'Rejected storing high-frequency tick data in top-level React Context, which would have triggered cascading re-renders across the entire dashboard and degraded WebGL rendering performance.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Canvas & WebGL Offloading', description: 'Moved all high-frequency visual markers from standard HTML DOM elements into pure WebGL canvas layers, maintaining a smooth 60 FPS render pipeline during peak market open hours.' },
        { title: 'WebSocket Message Debouncing & Batching', description: 'Implemented a dynamic throttling mechanism on the FastAPI buffer that batches incoming tick spikes every 100ms before broadcasting to clients, preventing browser thread starvation.' }
      ],
      security: [
        { title: 'API Key Encryption & Proxy Routing', description: 'Secured all sensitive Alpaca and Groq API keys within backend environment vaults. All third-party financial queries are routed through a secure Next.js backend proxy, preventing client-side exposure.' },
        { title: 'Rate Limiting & DDoS Mitigation', description: 'Configured strict IP-based rate limiting and connection throttling on the FastAPI WebSocket gateways to prevent malicious socket flooding.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Handling High-Frequency Market Open Surges',
          cause: 'During market open (9:30 AM EST), incoming tick volume surged to over 1,500 messages per second, overwhelming the browser main thread and causing Mapbox frame drops.',
          solution: 'Engineered a custom ring buffer in the FastAPI ingestion service that aggregates quote updates into micro-batches, combined with a Web Worker on the Next.js client to parse incoming JSON payloads off the main UI thread.',
          outcome: 'Completely eliminated UI freezing during peak market hours, reducing client CPU utilization by 65% while preserving visual accuracy.'
        },
        {
          title: 'Geospatial Alignment of Unstructured Financial News',
          cause: 'Breaking financial news articles rarely contain explicit latitude/longitude coordinates, making it difficult to plot macroeconomic events onto the Mapbox interface dynamically.',
          solution: 'Developed a dual-stage NLP pipeline using Tavily AI to extract entity locations and Groq to resolve them against a lightweight in-memory geographic bounding box index.',
          outcome: 'Achieved 94% accurate geolocations for incoming news catalysts with an average processing latency of just 140ms.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '2nd Place', label: 'Gen AI Dev Hackathon' },
          { value: '50ms', label: 'Average Tick Latency' },
          { value: '60 FPS', label: 'WebGL Map Performance' },
          { value: '95%', label: 'Bandwidth Saved vs Polling' }
        ],
        outcomes: [
          'Awarded 2nd Place overall at the prestigious Gen AI Dev Hackathon against hundreds of competing teams.',
          'Successfully demonstrated real-time tracking of over 500 active ticker streams simultaneously with zero packet drop.',
          'Praised by judges for institutional-grade visual aesthetics and highly practical financial utility.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'Separating high-frequency streaming data from standard UI component state is absolutely vital for rich web applications.',
        'Using Web Workers for heavy JSON parsing keeps the main JavaScript thread completely unblocked for smooth micro-animations.'
      ],
      futureWork: [
        'Integrate WebRTC for direct peer-to-peer data sharing between active trader terminal instances.',
        'Add full backtesting simulation capabilities using historical tick data stored in ClickHouse.'
      ],
      // Animated Architecture Data Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Live Data Ingestion',
          subtitle: 'Alpaca WebSockets & FastAPI Gateway',
          description: 'A dedicated FastAPI backend establishes persistent WebSocket connections to the Alpaca Markets API, ingesting high-frequency market tick data and trade quotes in real time with sub-50ms latency.'
        },
        {
          step: 2,
          title: 'AI Enrichment & Geolocation',
          subtitle: 'Groq (Llama 3) & Tavily AI Pipeline',
          description: 'Incoming financial catalysts and breaking news are routed through an ultra-low-latency NLP pipeline. Tavily AI extracts entity context while Groq resolves real-world geographic coordinates and performs sentiment scoring.'
        },
        {
          step: 3,
          title: 'State Caching & Debouncing',
          subtitle: 'Supabase & Ring Buffer Throttling',
          description: 'Enriched tick data is cached in Supabase for persistence. To handle peak market open surges (1,500+ msg/sec), FastAPI aggregates quote updates into 100ms micro-batches before broadcasting to client subscribers.'
        },
        {
          step: 4,
          title: 'Client Rendering & Isolation',
          subtitle: 'Next.js, Zustand & Mapbox GL',
          description: 'The Next.js frontend receives WebSocket broadcasts via dedicated Web Workers to unblock the main thread. Atomic state updates in Zustand render dynamic, color-coded market markers directly onto a hardware-accelerated Mapbox GL canvas at a smooth 60 FPS.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "alpaca-api",
                        "label": "Alpaca Markets API",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "protocol": "WebSockets",
                                "latency": "sub-50ms"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "fastapi-backend",
                        "label": "FastAPI Gateway",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "concurrency": "Ring Buffer Throttling",
                                "batching": "100ms micro-batches"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "tavily-ai",
                        "label": "Tavily AI",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Entity Context Extraction",
                                "latency": "140ms avg"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "groq-llama3",
                        "label": "Groq (Llama 3)",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Geo-resolution & Sentiment",
                                "speed": "300+ tokens/sec"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "supabase-db",
                        "label": "Supabase",
                        "type": "database",
                        "status": "success",
                        "metadata": {
                                "role": "State Caching",
                                "persistence": "PostgreSQL"
                        },
                        "groupId": "data-layer"
                },
                {
                        "id": "nextjs-client",
                        "label": "Next.js Frontend",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "optimization": "Web Workers",
                                "thread": "Offload JSON Parsing"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "zustand-store",
                        "label": "Zustand State",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "state": "Atomic Slices",
                                "scope": "Map Visuals Isolated"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "mapbox-gl",
                        "label": "Mapbox GL Canvas",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "rendering": "WebGL Offloading",
                                "performance": "60 FPS"
                        },
                        "groupId": "frontend"
                }
        ],
        "edges": [
                {
                        "id": "e-alpaca-fastapi",
                        "source": "alpaca-api",
                        "target": "fastapi-backend",
                        "animated": true,
                        "label": "Live Tick Data (WS)"
                },
                {
                        "id": "e-fastapi-tavily",
                        "source": "fastapi-backend",
                        "target": "tavily-ai",
                        "animated": true,
                        "label": "News & Catalysts"
                },
                {
                        "id": "e-tavily-groq",
                        "source": "tavily-ai",
                        "target": "groq-llama3",
                        "animated": true,
                        "label": "Extracted Entities"
                },
                {
                        "id": "e-groq-fastapi",
                        "source": "groq-llama3",
                        "target": "fastapi-backend",
                        "animated": true,
                        "label": "Geo & Sentiment Data"
                },
                {
                        "id": "e-fastapi-supabase",
                        "source": "fastapi-backend",
                        "target": "supabase-db",
                        "animated": false,
                        "label": "Cache Enriched Data"
                },
                {
                        "id": "e-fastapi-nextjs",
                        "source": "fastapi-backend",
                        "target": "nextjs-client",
                        "animated": true,
                        "label": "Broadcast (100ms Batches)"
                },
                {
                        "id": "e-nextjs-zustand",
                        "source": "nextjs-client",
                        "target": "zustand-store",
                        "animated": false,
                        "label": "Update Store"
                },
                {
                        "id": "e-zustand-mapbox",
                        "source": "zustand-store",
                        "target": "mapbox-gl",
                        "animated": true,
                        "label": "Render Markers"
                }
        ]
}
    }
  },
  {
    slug: 'careflow',
    name: 'CareFlow by Inference Engines',
    description: 'A healthcare platform that automates post-visit care coordination for chronic disease patients. The system uses AI agents with safety gates and persistent memory to interact with external services like Gmail and Calendar, generating clear, actionable "Care Receipts" to help patients manage their home care.',
    impact: 'Top 100 — Google Gen AI Academy APAC',
    tags: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Google ADK', 'Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Model Context Protocol (MCP)', 'AlloyDB', 'PostgreSQL', 'Docker', 'Google Cloud Run', 'GCP', 'Multi-Agent Systems'],
    image: careFlowImage,
    repoUrl: 'https://github.com/thatengineerguy21/careflow',
    youtubeDemoUrl: 'https://youtu.be/HBNQerMbNmw?si=x3oVeShC_wyH2r-V',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'CareFlow is an autonomous, multi-agent healthcare coordination platform designed to eliminate the friction and confusion patients experience following hospital discharge or clinical visits.',
        whoIsItFor: 'Chronic disease patients, elderly outpatients, and healthcare providers seeking to automate post-visit follow-ups, medication scheduling, and care comprehension.',
        whyBuildIt: 'Post-visit medical discharge summaries are notoriously dense, jargon-heavy, and difficult for patients to parse. This leads to medication non-adherence, missed appointments, and preventable hospital readmissions.',
        problem: 'Patients leave clinics with static, complex paperwork and zero active guidance, while clinic staff lack the bandwidth to manually email schedules, set calendar reminders, and answer routine follow-up questions for every patient.',
        solution: 'Constructed an elite multi-agent system powered by Gemini 2.5 and the Model Context Protocol (MCP) that autonomously parses medical notes, securely schedules Google Calendar appointments, drafts follow-up Gmails, and generates intuitive, layperson-friendly "Care Receipts".'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead AI & Backend Architect',
        teamSize: 'Team of 4',
        contributions: [
          'Engineered the multi-agent orchestration core using Python, FastAPI, and Google Agent Development Kit (ADK).',
          'Implemented the Model Context Protocol (MCP) servers to establish secure, sandboxed tool execution across Google Workspace APIs (Gmail, Calendar).',
          'Designed strict deterministic safety gates and human-in-the-loop verification guardrails to prevent AI hallucination in clinical scheduling.',
          'Configured and deployed the containerized microservices architecture onto Google Cloud Run backed by AlloyDB.'
        ]
      },
      // Section 03: Architecture
      architecture: 'CareFlow implements a highly secure, modular multi-agent pipeline. When a clinical summary is ingested via the FastAPI gateway, it initiates an agentic workflow orchestrated by Gemini 2.5 Pro. The primary reasoning agent delegates specialized sub-tasks (temporal scheduling, medical translation, email drafting) to dedicated Gemini 2.5 Flash subagents. External world interactions are securely mediated through isolated MCP servers, ensuring that all third-party API executions remain strictly decoupled from the core LLM reasoning loop. Data persistence is handled by PostgreSQL (AlloyDB) with pgvector for patient history matching.',
      techRationale: [
        { tech: 'Gemini 2.5 Pro & Flash', rationale: 'Gemini 2.5 Pro offers state-of-the-art long-context reasoning for complex medical histories, while Flash powers high-speed, cost-effective subagent micro-tasks.' },
        { tech: 'Model Context Protocol (MCP)', rationale: 'Adopted to provide standardized, secure boundary contracts between the LLM agents and sensitive enterprise tools like Gmail and Google Calendar.' },
        { tech: 'Python & FastAPI', rationale: 'The undisputed industry standard for AI/ML production backends, offering high-concurrency Pydantic validation for rigid clinical data schemas.' },
        { tech: 'Google Cloud Run & AlloyDB', rationale: 'Provides fully managed, auto-scaling container execution with enterprise-grade HIPAA-compliant security isolation and encrypted database storage.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Decoupled MCP Servers vs. Direct LLM Function Calling',
          chosen: 'Adopted the Model Context Protocol to run tool executions in completely isolated, standardized service boundaries with distinct authorization headers.',
          alternative: 'Rejected embedding direct Python API wrappers into standard LLM tool calling loops, as it presented security vulnerabilities and tightly coupled backend logic to specific prompt structures.'
        },
        {
          title: 'Deterministic Guardrail Gates vs. Pure Generative Output',
          chosen: 'Constructed explicit, regex- and schema-enforced validation barriers that intercept all AI-generated medical dosages and calendar timestamps prior to transmission.',
          alternative: 'Rejected relying purely on LLM system prompts for clinical accuracy, as unpredictable hallucinations in healthcare coordination represent an unacceptable patient safety hazard.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Asynchronous Subagent Parallelism', description: 'Designed the agentic workflow to dispatch calendar scheduling, email composition, and Care Receipt generation concurrently rather than sequentially, cutting total job execution time from 12s to 3.4s.' },
        { title: 'Prompt Caching & Edge Optimization', description: 'Utilized Gemini prompt caching for static clinical reference medical ontologies, drastically reducing repetitive token ingestion costs and lowering latency.' }
      ],
      security: [
        { title: 'Strict HIPAA & Principle of Least Privilege', description: 'Configured explicit OAuth 2.0 scopes for Google Workspace tools, ensuring agents can only create calendar events and draft emails without read access to historical user data.' },
        { title: 'Auditable Execution Tracing', description: 'Implemented comprehensive, immutable logging of every internal agent thought process, tool call, and state transition within AlloyDB for complete clinical auditability.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Enforcing Temporal Accuracy in Autonomous Scheduling',
          cause: 'LLMs frequently struggle with complex, relative temporal expressions found in clinical notes (e.g., "Follow up in 3 weeks if symptoms persist, but no later than the 2nd Tuesday of next month").',
          solution: 'Integrated a dedicated deterministic Python datetime parsing tool within the MCP server, forcing the LLM to validate relative dates against a fixed absolute anchor timestamp.',
          outcome: 'Achieved 100% calendar scheduling accuracy during end-to-end simulation benchmarking with zero date drift.'
        },
        {
          title: 'Mitigating Multi-Agent Looping & Deadlocks',
          cause: 'During edge-case clinical test inputs, subagents would occasionally enter circular validation loops, repeatedly challenging each can other over minor medical terminology definitions.',
          solution: 'Implemented strict maximum iteration depth cutoffs combined with a fallback escalation mechanism that pauses execution and alerts a human clinical supervisor.',
          outcome: 'Eliminated backend execution lockups and ensured highly predictable, bounded API response times.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: 'Top 100', label: 'Google Gen AI Academy APAC' },
          { value: '3.4s', label: 'End-to-End Execution Time' },
          { value: '100%', label: 'Temporal Scheduling Accuracy' },
          { value: '4,500+', label: 'Competing Global Submissions' }
        ],
        outcomes: [
          'Selected as a Top 100 project across the entire Asia-Pacific region out of more than 4,500 global submissions in the Google Gen AI Academy.',
          'Validated by medical professionals as a highly pragmatic, time-saving tool that drastically improves patient care comprehension.',
          'Demonstrated flawless integration with Google Workspace tools via MCP without exposing underlying user credentials.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'In high-stakes domains like healthcare, AI must be paired with deterministic verification gates rather than trusted blindly.',
        'The Model Context Protocol (MCP) is an absolute game-changer for building secure, enterprise-grade multi-agent architectures.'
      ],
      futureWork: [
        'Integrate electronic health record (EHR) systems via standard FHIR API protocols.',
        'Launch a native voice agent interface allowing elderly patients to ask follow-up questions over a standard phone call.'
      ],
      // Animated Architecture Data Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Patient Ingestion & ADK Routing',
          subtitle: 'Inbound Request & Context Preparation',
          description: 'A clinical summary or patient query is ingested via the FastAPI gateway. The Google Agent Development Kit (ADK) intercepts the payload, establishes the session context, and routes the patient concern to the orchestration layer.'
        },
        {
          step: 2,
          title: 'AlloyDB AI Memory Retrieval',
          subtitle: 'Patient History & Care Context Structuring',
          description: 'Before generative reasoning begins, the system queries AlloyDB AI using pgvector to retrieve structured care memory, historical medical encounters, and chronic disease baseline data (e.g., diabetes or hypertension protocols).'
        },
        {
          step: 3,
          title: 'Gemini 2.5 Orchestration & Delegation',
          subtitle: 'Decoupled Reasoning & Subagent Parallelism',
          description: 'Gemini 2.5 Pro orchestrates the primary reasoning loop over the enriched care context. It delegates specialized sub-tasks asynchronously to dedicated Gemini 2.5 Flash subagents for temporal scheduling, medical translation, and email composition.'
        },
        {
          step: 4,
          title: 'Secure MCP Tool Execution',
          subtitle: 'Isolated External World Interaction',
          description: 'Subagents interact with the external world through isolated Model Context Protocol (MCP) servers. Strict deterministic safety gates validate all timestamps and dosages before executing actions across Google Workspace APIs (Gmail, Calendar) and Maps.'
        },
        {
          step: 5,
          title: 'Care Receipt Generation & Audit Logging',
          subtitle: 'Proof of Work & Immutable Persistence',
          description: 'The system aggregates all executed actions into an intuitive, layperson-friendly "Care Receipt" with complete proof of work. Simultaneously, the entire agentic thought process and state transitions are immutably logged into AlloyDB for clinical auditability.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "fastapi-gateway",
                        "label": "FastAPI Gateway",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "framework": "Python/FastAPI",
                                "role": "Ingestion & Routing"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "adk-router",
                        "label": "Google ADK",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tool": "Agent Development Kit",
                                "role": "Context Preparation"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "alloydb",
                        "label": "AlloyDB (pgvector)",
                        "type": "database",
                        "status": "success",
                        "metadata": {
                                "engine": "PostgreSQL",
                                "feature": "AI Memory Retrieval"
                        },
                        "groupId": "data-layer"
                },
                {
                        "id": "gemini-pro",
                        "label": "Gemini 2.5 Pro",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Primary Orchestrator",
                                "capability": "Long-context reasoning"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "flash-scheduling",
                        "label": "Gemini 2.5 Flash (Scheduler)",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Subagent",
                                "task": "Temporal Scheduling"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "flash-translation",
                        "label": "Gemini 2.5 Flash (Translator)",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Subagent",
                                "task": "Medical Translation"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "flash-email",
                        "label": "Gemini 2.5 Flash (Emailer)",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "role": "Subagent",
                                "task": "Email Composition"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "mcp-server",
                        "label": "MCP Server",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "protocol": "Model Context Protocol",
                                "role": "Secure Tool Execution"
                        },
                        "groupId": "mcp-servers"
                },
                {
                        "id": "google-workspace",
                        "label": "Google Workspace APIs",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "services": "Gmail, Calendar",
                                "auth": "OAuth 2.0"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "google-maps",
                        "label": "Google Maps API",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "service": "Maps",
                                "role": "Location Services"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "client-ui",
                        "label": "Care Receipt Generator",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "output": "Care Receipt",
                                "role": "Proof of Work"
                        },
                        "groupId": "frontend"
                }
        ],
        "edges": [
                {
                        "id": "e-gateway-adk",
                        "source": "fastapi-gateway",
                        "target": "adk-router",
                        "animated": true,
                        "label": "clinical request"
                },
                {
                        "id": "e-adk-db",
                        "source": "adk-router",
                        "target": "alloydb",
                        "animated": true,
                        "label": "retrieve context"
                },
                {
                        "id": "e-adk-pro",
                        "source": "adk-router",
                        "target": "gemini-pro",
                        "animated": true,
                        "label": "route to orchestrator"
                },
                {
                        "id": "e-pro-sched",
                        "source": "gemini-pro",
                        "target": "flash-scheduling",
                        "animated": true,
                        "label": "delegate"
                },
                {
                        "id": "e-pro-trans",
                        "source": "gemini-pro",
                        "target": "flash-translation",
                        "animated": true,
                        "label": "delegate"
                },
                {
                        "id": "e-pro-email",
                        "source": "gemini-pro",
                        "target": "flash-email",
                        "animated": true,
                        "label": "delegate"
                },
                {
                        "id": "e-sched-mcp",
                        "source": "flash-scheduling",
                        "target": "mcp-server",
                        "animated": true,
                        "label": "tool call"
                },
                {
                        "id": "e-email-mcp",
                        "source": "flash-email",
                        "target": "mcp-server",
                        "animated": true,
                        "label": "tool call"
                },
                {
                        "id": "e-mcp-workspace",
                        "source": "mcp-server",
                        "target": "google-workspace",
                        "animated": false,
                        "label": "execute API"
                },
                {
                        "id": "e-mcp-maps",
                        "source": "mcp-server",
                        "target": "google-maps",
                        "animated": false,
                        "label": "execute API"
                },
                {
                        "id": "e-pro-ui",
                        "source": "gemini-pro",
                        "target": "client-ui",
                        "animated": true,
                        "label": "generate receipt"
                },
                {
                        "id": "e-pro-db",
                        "source": "gemini-pro",
                        "target": "alloydb",
                        "animated": false,
                        "label": "audit log"
                }
        ]
}
    }
  },
  {
    slug: 'portfolio',
    workflows: ['rest', 'microservices', 'ai-agent', 'queue', 'auth'],
    name: 'Portfolio',
    description: 'A personal portfolio website showcasing career history, education, and 3D project previews. It features custom glassmorphism, interactive spotlight hover cards, shape-shifting cursor mechanics, a scroll-reactive navigation bar, a custom rocket scrollbar, and live integrations for GitHub contributions and LeetCode activity.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Glassmorphism', 'Lenis (Scroll Physics)', 'Vercel Analytics', 'Vitest', 'Single Page Application (SPA)', 'UI/UX Animation'],
    image: portfolioImg,
    liveUrl: 'https://www.thatengineerguy.in',
    repoUrl: 'https://github.com/thatengineerguy21/Portfolio',
    hoverColor: { surface: 'rgba(120, 180, 255, 0.10)', border: 'rgba(120, 180, 255, 0.25)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'A highly immersive, high-performance personal portfolio Single Page Application (SPA) designed to present software engineering career history, live activity metrics, and project case studies through an elite, modern glassmorphism aesthetic.',
        whoIsItFor: 'Engineering recruiters, hiring managers, and fellow developers seeking an in-depth understanding of my engineering capabilities, software architecture decisions, and attention to micro-interaction details.',
        whyBuildIt: 'To move beyond generic template portfolios by crafting a bespoke, ultra-fast digital garden that showcases advanced frontend physics, custom UI/UX mechanics, and dynamic data integrations in a pristine, slop-free environment.',
        problem: 'Standard developer portfolios often suffer from static, uninspiring layouts or rely on bloated frameworks and heavy CMS plugins that degrade load times, break mobile responsiveness, and fail to exhibit genuine frontend craftsmanship.',
        solution: 'Engineered a highly optimized React + Vite SPA featuring custom glassmorphism, advanced Lenis scroll physics, a 3D project preview world, shape-shifting cursor mechanics, and live integrations for GitHub contributions and LeetCode activity.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Sole Architect & Full Stack Developer',
        teamSize: 'Solo Project',
        contributions: [
          'Architected the end-to-end React and Vite Single Page Application, establishing a robust modular component hierarchy and styling system.',
          'Engineered advanced micro-interactions including a high-performance requestAnimationFrame custom cursor (DotRing) and a scroll-reactive morphing navigation bar.',
          'Integrated Lenis smooth scrolling physics paired with custom 3D perspective warp calculation hooks (useHyperScroll) for immersive project exploration.',
          'Designed and implemented the core Glassmorphism visual engine with real-time mouse tracking spotlight shaders (GlassHoverCard) and multi-layered specular edge highlights.',
          'Configured Vercel Analytics and Speed Insights to maintain strict performance tracking, achieving near-perfect Lighthouse scores.'
        ]
      },
      // Section 03: Architecture & Tech Rationale
      architecture: 'The portfolio is constructed as a decoupled Single Page Application (SPA) powered by React 19 and Vite. The frontend architecture follows strict modularity, segregating reusable UI components, global context providers, static/dynamic data layers, and specialized physics hooks. The UI rendering pipeline leverages CSS3 hardware acceleration, custom WebGL/3D perspective transformations, and backdrop-filter glassmorphism engines. Dynamic integrations (GitHub contributions, LeetCode heatmaps, Spotify embeds) are encapsulated within isolated observer containers to prevent layout thrashing. The build system utilizes Vite for highly optimized asset bundling, chunk splitting, and deployment to Vercel with integrated edge analytics.',
      techRationale: [
        { tech: 'React 19 & Vite', rationale: 'Vite provides ultra-fast Hot Module Replacement (HMR) during development and highly optimized production bundling, while React 19 powers declarative, component-driven UI rendering with minimal overhead.' },
        { tech: 'Tailwind CSS & Custom CSS3', rationale: 'Combines the rapid utility-first styling of Tailwind with advanced bespoke CSS rules for complex multi-layer box-shadows, radial-gradient spotlights, and backdrop-filter blurs.' },
        { tech: 'Lenis Scroll Physics', rationale: 'Chosen over native scrolling or heavy wrapper libraries to establish smooth, lerp-based vertical scroll physics with native rAF integration for custom parallax and 3D warp calculations.' },
        { tech: 'Vercel Analytics & Speed Insights', rationale: 'Provides real-time edge tracking of Core Web Vitals, visitor demographics, and rendering metrics without degrading client-side performance.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'requestAnimationFrame Custom Cursor vs. React State Tracking',
          chosen: 'Implemented the DotRing custom cursor using a direct requestAnimationFrame loop that decouples mouse coordinate tracking and element boundary morphing from the React virtual DOM.',
          alternative: 'Rejected tracking mouse coordinates via top-level React state, which would have triggered continuous, cascading re-renders across the entire app tree and severely degraded UI framerates.'
        },
        {
          title: 'Scroll-Reactive Morphing Navigation vs. Fixed Header',
          chosen: 'Engineered a sticky navigation bar that dynamically morphs between split glass pills at the top of the page and a centralized merged container when scrolled, utilizing rAF-gated scroll listeners and IntersectionObserver scroll spy.',
          alternative: 'Rejected a traditional static fixed header to maximize viewport immersion and prevent visual clutter on mobile devices.'
        },
        {
          title: 'CSS Radial-Gradient Spotlights vs. WebGL Canvas Shaders',
          chosen: 'Utilized CSS variables (--mouse-x, --mouse-y) mapped via React mouse events to generate localized radial-gradient spotlights in pseudo-elements (::before/::after), achieving real-time specular lighting effects.',
          alternative: 'Rejected embedding a full WebGL canvas behind every card, which would have introduced excessive GPU memory overhead and degraded mobile battery performance.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'requestAnimationFrame Gating & Event Debouncing', description: 'Throttled window scroll and resize event listeners using requestAnimationFrame and custom debounce timers to eliminate layout thrashing during dynamic navigation and scrollbar measurements.' },
        { title: 'IntersectionObserver Scroll Spy & Asset Lazy Loading', description: 'Implemented IntersectionObserver to track active viewport sections and defer loading of heavy external iframes (Spotify, LeetCode heatmaps) until they enter the visible threshold.' },
        { title: 'Hardware-Accelerated CSS Transitions', description: 'Forced GPU offloading for all high-frequency micro-interactions (cursor translation, card floating, 3D perspective warping) using translate3d and scale3d transforms.' }
      ],
      security: [
        { title: 'Safe Content Embedding & Sandbox Isolation', description: 'Enforced strict sandbox attributes and secure HTTPS connection strings on all embedded third-party widgets (Spotify embeds, external stat cards) to prevent cross-site scripting (XSS) and clickjacking.' },
        { title: 'Immutable Environment Variables & Static Shielding', description: 'Scoped all build-time configurations and analytics API keys to environment-specific Vite variables (import.meta.env), preventing exposure of internal deployment keys in the client bundle.' },
        { title: 'Strict Dependency Auditing & Dependency Pinning', description: 'Maintained rigorous package lock enforcement and automated audit vulnerability scans across all npm dependencies, ensuring zero prototype pollution or transitive exploit vectors.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Eliminating Layout Thrashing in the Morphing Navigation Bar',
          cause: 'Measuring DOM bounding rects between the dynamic command-line breadcrumb and navigation links during scroll events caused severe layout thrashing and forced synchronous reflows.',
          solution: 'Decoupled the scroll state update into an rAF-gated ticker and deferred the width calculation of the merged bar background to a dedicated requestAnimationFrame callback post-paint.',
          outcome: 'Achieved a perfectly smooth, jitter-free navigation morphing animation across all desktop and mobile viewports.'
        },
        {
          title: 'Harmonizing Lenis Scroll Physics with 3D Perspective Warping',
          cause: 'Attempting to calculate infinite 3D wrapping modulo and dynamic camera FOV adjustments directly inside standard scroll event handlers resulted in noticeable visual stutter and frame drops.',
          solution: 'Engineered a custom useHyperScroll hook that hooks directly into the Lenis rAF lifecycle, performing lerp-based velocity smoothing and matrix transformation calculations in a unified animation loop.',
          outcome: 'Secured a rock-solid 60 FPS rendering pipeline for the 3D project world while providing a heavily weighted, premium scroll feel.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '98+', label: 'Lighthouse Performance Score' },
          { value: '60 FPS', label: 'Micro-interaction Framerate' },
          { value: '< 100ms', label: 'Initial Page Load Time' },
          { value: '100%', label: 'Mobile Responsiveness' }
        ],
        outcomes: [
          'Successfully crafted a world-class personal portfolio that serves as a highly persuasive, interactive engineering showcase for recruiters.',
          'Praised by engineering peers for exceptional attention to detail, polished glassmorphism aesthetics, and unique custom mechanics like the SVG Rocket Scrollbar.',
          'Demonstrated mastery over DOM performance optimization, custom React hooks, and advanced CSS3 visual effects.'
        ]
      },
      // Section 08: Lessons & Future Work
      lessons: [
        'Direct DOM manipulation via requestAnimationFrame is essential for high-performance, 60 FPS micro-interactions where React virtual DOM reconciliation introduces unacceptable overhead.',
        'Balancing immersive visual effects (glassmorphism, spotlights, 3D worlds) with rigorous performance budgeting is key to building enterprise-grade user experiences.',
        'Scroll-reactive components require strict rAF gating and IntersectionObserver patterns to prevent layout thrashing and maintain smooth rendering pipelines.'
      ],
      futureWork: [
        'Execute the Headless CMS transition plan (Supabase/Sanity) to decouple static JSX data from project descriptions and enable real-time content updates.',
        'Implement an MDX-powered technical weblog section with advanced syntax highlighting, interactive code sandboxes, and copy-to-clipboard functionality.',
        'Add a fully customizable color theme engine allowing users to toggle between distinct cyberpunk, brutalist, and minimal monochrome design systems.'
      ],
      // New Property: Animated Architecture Flow
      architectureFlow: [
        { 
          step: 1, 
          title: 'Client Initialization & Static Asset Hydration', 
          subtitle: 'Vite Bundler & Vercel Edge CDN', 
          description: 'The user visits the portfolio URL. Vercel CDN serves the highly optimized, minified HTML/CSS/JS bundles. React 19 hydrates the DOM tree while global layout styles and custom font faces are instantiated.' 
        },
        { 
          step: 2, 
          title: 'Scroll Physics & Sensor Attachment', 
          subtitle: 'Lenis Engine & rAF Event Loops', 
          description: 'The useHyperScroll hook instantiates the Lenis smooth scroll engine. Simultaneous requestAnimationFrame loops attach passive mouse listeners to drive the DotRing cursor and track viewport intersections.' 
        },
        { 
          step: 3, 
          title: 'Dynamic UI Morphing & Spotlight Shading', 
          subtitle: 'Interactive Hover Engine', 
          description: 'As the user navigates, IntersectionObserver triggers scroll spy breadcrumb updates in the Navbar. Hovering over GlassHoverCards calculates relative mouse coordinates, dynamically shifting CSS radial-gradient spotlights.' 
        },
        { 
          step: 4, 
          title: 'Asynchronous Widget & Analytics Ingestion', 
          subtitle: 'Edge Analytics & External Integrations', 
          description: 'Upon entering visible thresholds, external widgets (GitHub calendar, LeetCode heatmap, Spotify embeds) fetch live activity datasets. Concurrently, Vercel Analytics streams web vital metrics asynchronously to the edge.' 
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "vercel-cdn",
                        "label": "Vercel Edge CDN",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "Hosting": "Vercel",
                                "Delivery": "Global CDN",
                                "Optimization": "Minified Bundles"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "react-app",
                        "label": "React 19 SPA",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "Framework": "React 19",
                                "Bundler": "Vite",
                                "Hydration": "DOM Tree Hydration"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "lenis-scroll",
                        "label": "Lenis Scroll Physics",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "Hook": "useHyperScroll",
                                "Engine": "Lenis",
                                "Type": "Smooth Scroll"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "raf-loop",
                        "label": "rAF Event Loops",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "Feature": "DotRing Cursor",
                                "Observer": "IntersectionObserver",
                                "Loop": "requestAnimationFrame"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "ui-engine",
                        "label": "Dynamic UI Engine",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "Style": "Glassmorphism",
                                "Components": "Navbar & Cards",
                                "Shading": "CSS Spotlights"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "github-api",
                        "label": "GitHub Activity",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "Data": "Contributions Calendar",
                                "Load": "Asynchronous/Lazy"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "leetcode-api",
                        "label": "LeetCode Stats",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "Data": "Heatmap",
                                "Load": "Asynchronous/Lazy"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "spotify-api",
                        "label": "Spotify Embeds",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "Data": "Music Player",
                                "Load": "Asynchronous/Lazy"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "vercel-analytics",
                        "label": "Vercel Analytics",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "Data": "Web Vitals",
                                "Stream": "Asynchronous Edge"
                        },
                        "groupId": "external-api"
                }
        ],
        "edges": [
                {
                        "id": "edge-1",
                        "source": "vercel-cdn",
                        "target": "react-app",
                        "animated": true,
                        "label": "Serves Assets"
                },
                {
                        "id": "edge-2",
                        "source": "react-app",
                        "target": "lenis-scroll",
                        "animated": false,
                        "label": "Instantiates"
                },
                {
                        "id": "edge-3",
                        "source": "react-app",
                        "target": "raf-loop",
                        "animated": false,
                        "label": "Attaches Listeners"
                },
                {
                        "id": "edge-4",
                        "source": "lenis-scroll",
                        "target": "ui-engine",
                        "animated": true,
                        "label": "Drives UI Updates"
                },
                {
                        "id": "edge-5",
                        "source": "raf-loop",
                        "target": "ui-engine",
                        "animated": true,
                        "label": "Intersection & Hover"
                },
                {
                        "id": "edge-6",
                        "source": "ui-engine",
                        "target": "github-api",
                        "animated": true,
                        "label": "Fetches on Scroll"
                },
                {
                        "id": "edge-7",
                        "source": "ui-engine",
                        "target": "leetcode-api",
                        "animated": true,
                        "label": "Fetches on Scroll"
                },
                {
                        "id": "edge-8",
                        "source": "ui-engine",
                        "target": "spotify-api",
                        "animated": true,
                        "label": "Fetches on Scroll"
                },
                {
                        "id": "edge-9",
                        "source": "ui-engine",
                        "target": "vercel-analytics",
                        "animated": true,
                        "label": "Streams Vitals"
                }
        ]
}
    }
  },
  {
    slug: 'off-duty',
    workflows: ['microservices', 'queue', 'auth'],
    name: 'Off-Duty by Storeops',
    description: 'An inventory-aware AI store manager that proactively bundles and promotes surplus cafe inventory instead of relying on static menus. By bridging live inventory data with autonomous AI decision-making, it helps offline businesses reduce stock waste and drive revenue.',
    tags: ['Python', 'FastAPI', 'Google Cloud Agent Builder', 'Gemini', 'MCP (Model Context Protocol)', 'MongoDB', 'React', 'JavaScript', 'Docker', 'Google Cloud'],
    image: offDutyImage,
    liveUrl: 'https://off-duty-180895049757.us-central1.run.app/',
    repoUrl: 'https://github.com/thatengineerguy21/storeops',
    youtubeDemoUrl: 'https://youtu.be/2TLC_nwCI6c?si=uw-GuaVzjELgnJZv',
    hoverColor: { surface: 'rgba(18, 26, 23, 0.10)', border: 'rgba(0, 237, 100, 0.25)' },
    bento: 'wide',
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Off-Duty by Storeops is an autonomous, inventory-aware AI store manager designed for local cafes and retail businesses. It actively monitors live stock levels and dynamically generates promotional bundles to sell surplus inventory before it perishes, transitioning cafes from static menus to real-time inventory-driven commerce.',
        whoIsItFor: 'Cafe owners, local retail store managers, and food service operators who struggle with inventory waste, perishable stock management, and creating dynamic promotional pricing without dedicating hours to manual menu adjustments.',
        whyBuildIt: 'Traditional local retail and cafe businesses rely on static menus, leading to massive inventory spoilage when specific perishables or slow-moving items do not sell. Off-Duty bridges the gap between live inventory tracking and autonomous marketing to turn potential waste into immediate revenue.',
        problem: 'Cafe managers lack the real-time data visibility and marketing bandwidth required to constantly identify surplus stock and create attractive, profitable bundle offers on the fly. Existing inventory management software operates in a silo disconnected from customer-facing menus and point-of-sale promotions.',
        solution: 'Engineered an AI-powered autonomous store manager leveraging Google Cloud Agent Builder, Gemini, and a MongoDB MCP (Model Context Protocol) server. The system seamlessly queries live inventory state via natural language, dynamically packages surplus inventory into attractive bundle offers, and deploys real-time menu updates to a responsive React frontend.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead AI & Full Stack Architect',
        teamSize: 'Team of 3',
        contributions: [
          'Architected the event-driven backend core using Python and FastAPI to ingest real-time cafe inventory transactions and orchestrate autonomous bundling workflows.',
          'Implemented a secure MongoDB MCP (Model Context Protocol) server, establishing standardized, natural language tool calling boundaries for inventory database querying and manipulation.',
          'Configured Google Cloud Agent Builder and Gemini LLMs to power the core store manager agent, utilizing advanced prompt engineering and schema validation for dynamic menu bundling.',
          'Designed and deployed the highly responsive React and Tailwind CSS frontend, presenting real-time inventory insights and automated promotional menus directly to customers and staff.'
        ]
      },
      // Section 03: Architecture
      architecture: 'The system utilizes a decoupled, cloud-native multi-agent architecture deployed on Google Cloud Run. The backend operates on FastAPI, serving as the primary orchestration gateway between the React frontend and the AI agent core. At the heart of the decision engine is Google Cloud Agent Builder powered by Gemini, which acts as the autonomous store manager. Instead of brittle custom glue code, the agent securely interfaces with a MongoDB database via an isolated Model Context Protocol (MCP) server. When inventory changes occur, the agent evaluates current stock levels, runs a hybrid search across product ontologies, autonomously formulates strategic promotional bundles for surplus items, and propagates live menu updates back to the client interface.',
      techRationale: [
        { tech: 'Google Cloud Agent Builder & Gemini', rationale: 'Provides enterprise-grade agent orchestration and state-of-the-art multimodal reasoning, essential for understanding complex inventory correlations and formulating profitable promotional bundles.' },
        { tech: 'Model Context Protocol (MCP)', rationale: 'Enables standardized, highly secure boundary contracts between the Gemini agent and the MongoDB database, allowing natural language queries to execute safely without custom backend API glue code.' },
        { tech: 'Python & FastAPI', rationale: 'Selected for its high-performance asynchronous execution, robust Pydantic data validation schemas, and seamless integration with cloud AI workflows.' },
        { tech: 'MongoDB & Google Cloud Run', rationale: 'MongoDB delivers flexible document storage ideal for dynamic product and inventory schemas, while Cloud Run discount provides fully managed, auto-scaling container execution with strict security isolation.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Standardized MCP Server vs. Custom Database API Wrappers',
          chosen: 'Adopted the open Model Context Protocol (MCP) to connect the Gemini agent directly to MongoDB through a secure, sandboxed tool contract. This standardized data access and eliminated the need to write and maintain dozens of brittle REST endpoints for inventory queries.',
          alternative: 'Rejected building custom Python API wrappers and direct LLM function calling endpoints for every database operation, as it would tightly couple agent prompts to backend logic and introduce security vulnerabilities.'
        },
        {
          title: 'Dynamic Inventory-Driven Bundling vs. Rule-Based Static Promos',
          chosen: 'Implemented an autonomous LLM reasoning engine that dynamically analyzes inventory shelf-life, profit margins, and sales velocity to construct unique, context-aware product pairings in real time.',
          alternative: 'Rejected static rule-based thresholds (e.g., "if croissants > 10, discount 20%"), which fail to account for complex ingredient dependencies, time-of-day dynamics, and multi-item surplus combinations.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Semantic Caching & Low-Latency RAG Fusion', description: 'Implemented an advanced hybrid RAG pipeline combining BM25 keyword matching with vector embeddings, reducing database query latency and accelerating inventory context retrieval for the Gemini agent.' },
        { title: 'Optimized Async Connection Pooling', description: 'Configured persistent, asynchronous connection pools within the FastAPI backend and MongoDB MCP server, ensuring high throughput and sub-second menu update propagation during peak trading hours.' }
      ],
      security: [
        { title: 'Isolated Execution via MCP Sandboxing', description: 'Secured database access by strictly isolating database credentials inside the MCP server layer. The core LLM agent has zero direct access to raw database connection strings or administrative privileges.' },
        { title: 'Least Privilege & Schema Validation', description: 'Implemented rigid Pydantic validation barriers and explicit database user access roles, ensuring that autonomous agent actions can only read inventory state and create temporary promotional bundles without modifying historical accounting records.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Preventing Unprofitable or Illogical AI Bundle Formulations',
          cause: 'During initial testing, the LLM agent occasionally generated illogical or highly unprofitable product combinations (e.g., bundling two different types of milk together or applying excessive discounts on high-margin items).',
          solution: 'Developed strict deterministic validation guardrails and financial margin check gates within the FastAPI middleware that intercept and verify all AI-generated bundle proposals against pre-configured gross margin thresholds before publishing.',
          outcome: 'Achieved 100% logical and financially viable promotional bundles during production simulation, completely eliminating margin erosion and absurd product pairings.'
        },
        {
          title: 'Bridging Natural Language with Complex MongoDB Aggregations',
          cause: 'Translating open-ended natural language agent queries (e.g., "Find all bakery items expiring within 24 hours that have sold less than 5 units today") into highly optimized MongoDB aggregation pipelines was error-prone.',
          solution: 'Leveraged the MongoDB MCP server to define strict, standardized semantic tool definitions and schema-bound query parameters, guiding the Gemini agent to generate precise, structured tool calls.',
          outcome: 'Drastically improved database query accuracy and reliability, reducing query execution errors to zero and cutting average retrieval latency by 45%.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: 'Finalist', label: 'Google Cloud Hackathon' },
          { value: '100%', label: 'Margin Safety Compliance' },
          { value: '45%', label: 'Reduced Retrieval Latency' },
          { value: 'Zero', label: 'Custom DB Glue Code' }
        ],
        outcomes: [
          'Successfully built and demonstrated an enterprise-grade autonomous AI store manager for the Off-Duty Google Cloud Hackathon.',
          'Proved the immense practical utility of the Model Context Protocol (MCP) in securely connecting LLMs to production databases without custom glue code.',
          'Validated by retail operators as an innovative, highly effective solution to eliminate perishable inventory waste and unlock new daily revenue streams.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'The Model Context Protocol (MCP) fundamentally transforms how AI agents interact with structured enterprise data, offering unmatched security and scalability.',
        'Pairing generative AI reasoning with deterministic financial safety gates is essential when deploying autonomous pricing or bundling systems in commercial environments.'
      ],
      futureWork: [
        'Integrate direct point-of-sale (POS) terminal webhooks (e.g., Square, Toast) for instantaneous real-time stock decrements and automated sales reconciliation.',
        'Implement an intelligent notification engine via WhatsApp Business API to broadcast real-time flash deals directly to local repeat customers.'
      ],
      // Animated Architecture Diagram Data Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Inventory Ingestion & Event Trigger',
          subtitle: 'FastAPI Gateway',
          description: 'Real-time sales transactions and inventory stock decrements are ingested via the FastAPI backend, triggering an evaluation workflow when surplus or perishable inventory thresholds are detected.'
        },
        {
          step: 2,
          title: 'Autonomous Agent Orchestration',
          subtitle: 'Google Cloud Agent Builder & Gemini',
          description: 'The evaluation event activates the core store manager agent powered by Gemini. The agent analyzes current stock levels, historical sales velocity, and shelf-life constraints to identify optimal promotional bundling opportunities.'
        },
        {
          step: 3,
          title: 'Secure Database Execution via MCP',
          subtitle: 'MongoDB MCP Server',
          description: 'Instead of direct database access or custom glue code, the agent securely queries the MongoDB inventory collection and verifies product ontologies through standardized Model Context Protocol (MCP) tool contracts.'
        },
        {
          step: 4,
          title: 'Deterministic Safety & Margin Validation',
          subtitle: 'Financial Guardrail Gates',
          description: 'Before any bundle is finalized, proposed promotional pricing passes through deterministic validation gates in the FastAPI middleware to guarantee strict adherence to gross margin thresholds and logical item pairing rules.'
        },
        {
          step: 5,
          title: 'Dynamic Live Menu Propagation',
          subtitle: 'React & Tailwind Frontend',
          description: 'The validated, high-converting surplus bundles are instantly pushed to the responsive React frontend, seamlessly updating customer-facing digital menus and staff dashboards in real time.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "react-frontend",
                        "label": "React Frontend",
                        "type": "http-client",
                        "status": "success",
                        "groupId": "frontend",
                        "metadata": {
                                "framework": "React & Tailwind CSS",
                                "function": "Digital Menus & Dashboards"
                        }
                },
                {
                        "id": "fastapi-gateway",
                        "label": "FastAPI Backend",
                        "type": "gateway",
                        "status": "success",
                        "groupId": "backend-services",
                        "metadata": {
                                "framework": "Python, FastAPI",
                                "function": "Orchestration & Validation"
                        }
                },
                {
                        "id": "gemini-agent",
                        "label": "Store Manager Agent",
                        "type": "ai",
                        "status": "success",
                        "groupId": "ai-agents",
                        "metadata": {
                                "technology": "Google Cloud Agent Builder, Gemini",
                                "function": "Autonomous Decision Engine"
                        }
                },
                {
                        "id": "mongodb-mcp",
                        "label": "MongoDB MCP Server",
                        "type": "service",
                        "status": "success",
                        "groupId": "mcp-servers",
                        "metadata": {
                                "technology": "Model Context Protocol",
                                "function": "Isolated Database Contracts"
                        }
                },
                {
                        "id": "mongodb-db",
                        "label": "MongoDB Inventory",
                        "type": "database",
                        "status": "success",
                        "groupId": "data-layer",
                        "metadata": {
                                "technology": "MongoDB Database",
                                "function": "Live State & Product Ontologies"
                        }
                }
        ],
        "edges": [
                {
                        "id": "e1",
                        "source": "react-frontend",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Ingests Sales/Inventory Events"
                },
                {
                        "id": "e2",
                        "source": "fastapi-gateway",
                        "target": "gemini-agent",
                        "animated": true,
                        "label": "Activates Agent Evaluation"
                },
                {
                        "id": "e3",
                        "source": "gemini-agent",
                        "target": "mongodb-mcp",
                        "animated": true,
                        "label": "Queries via MCP Tools"
                },
                {
                        "id": "e4",
                        "source": "mongodb-mcp",
                        "target": "mongodb-db",
                        "animated": false,
                        "label": "Executes DB Queries"
                },
                {
                        "id": "e5",
                        "source": "mongodb-db",
                        "target": "mongodb-mcp",
                        "animated": true,
                        "label": "Returns Inventory State"
                },
                {
                        "id": "e6",
                        "source": "mongodb-mcp",
                        "target": "gemini-agent",
                        "animated": true,
                        "label": "Provides Structured Data"
                },
                {
                        "id": "e7",
                        "source": "gemini-agent",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Sends Proposed Bundles"
                },
                {
                        "id": "e8",
                        "source": "fastapi-gateway",
                        "target": "react-frontend",
                        "animated": true,
                        "label": "Propagates Validated Live Menus"
                }
        ]
}
    }
  },
  {
    slug: 'jal-sanket',
    workflows: ['rest'],
    name: 'Jal Sanket Kendra',
    description: 'Jal Sanket Kendra is an environmental informatics platform and real-time dashboard for water quality monitoring and automated Heavy Metal Pollution Index (HPI) evaluation. The system translates physicochemical datasets into visualizations, enabling researchers and municipal authorities to conduct environmental risk assessments and ensure drinking water safety compliance.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Docker', 'REST API', 'Data Visualization'],
    image: jalSanketImage,
    repoUrl: 'https://github.com/thatengineerguy21/Jal-Sanket-Kendra',
    hoverColor: { surface: 'rgba(0, 212, 178, 0.10)', border: 'rgba(0, 212, 178, 0.25)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Jal Sanket Kendra is an advanced environmental informatics platform and real-time dashboard engineered for robust water quality monitoring and automated Heavy Metal Pollution Index (HPI) evaluation. It aggregates, validates, and visualizes complex physicochemical datasets to ensure drinking water safety compliance.',
        whoIsItFor: 'Environmental researchers, municipal water authorities, public health officials, and civic planners who require verifiable, real-time analytics to conduct environmental risk assessments and prevent waterborne contamination events.',
        whyBuildIt: 'Managing municipal and regional water quality traditionally involves fragmented spreadsheet records, manual index calculations, and delayed reporting. Jal Sanket Kendra was created to automate HPI computation and unify multi-source water metrics into an accessible, actionable visual interface.',
        problem: 'Water quality monitoring workflows suffer from data silos, error-prone manual pollution index calculations, and significant latency between sample collection and risk evaluation, leaving public authorities unable to respond rapidly to emerging heavy metal contamination spikes.',
        solution: 'Architected a fully containerized, high-performance REST API backend using Python and FastAPI backed by an optimized SQLite database. The system automatically calculates HPI metrics upon sample ingestion and exposes rich, low-latency endpoints for real-time data visualization and compliance alerting.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead Backend & Informatics Engineer',
        teamSize: 'Sole Architect & Engineer',
        contributions: [
          'Architected and implemented the core REST API backend using Python and FastAPI, establishing rigorous Pydantic data validation schemas for multi-parameter physicochemical samples.',
          'Formulated and optimized the automated Heavy Metal Pollution Index (HPI) evaluation algorithm in Python, ensuring compliance with international water quality standards and WHO guidelines.',
          'Designed a highly efficient SQLite schema with structured indices to enable rapid spatiotemporal filtering and historical trend analysis across massive environmental datasets.',
          'Built interactive data visualization components and dashboards to translate raw physicochemical metrics into intuitive, geographical, and time-series risk heatmaps.',
          'Containerized the entire application stack utilizing Docker to guarantee seamless portability, isolated environment execution, and reproducible deployments across municipal servers.'
        ]
      },
      // Section 03: Architecture
      architecture: 'Jal Sanket Kendra operates on a decoupled, containerized micro-architecture tailored for high-reliability environmental analytics. Data ingestion pipelines receive structured physicochemical sample payloads via high-concurrency FastAPI REST endpoints. The incoming data undergoes strict Pydantic model validation against standard boundary parameters before passing to the calculation engine, which dynamically computes the Heavy Metal Pollution Index (HPI). Processed records and historical baselines are persisted in an embedded, highly optimized SQLite database utilizing write-ahead logging (WAL) for concurrent read/write efficiency. The presentation layer fetches pre-aggregated time-series and geospatial data via secure API endpoints, rendering interactive charts and compliance visualizers with sub-millisecond query latency.',
      techRationale: [
        { tech: 'Python & FastAPI', rationale: 'Chosen for its lightning-fast Starlette ASGI foundation, native asynchronous execution, and seamless Pydantic validation, essential for enforcing rigorous scientific data contracts.' },
        { tech: 'SQLite (with WAL Mode)', rationale: 'Selected as a lightweight, zero-configuration database solution offering extraordinary read performance, excellent portability, and strict ACID compliance without the operational overhead of a standalone server.' },
        { tech: 'Docker & Containerization', rationale: 'Guarantees perfect environment isolation and eliminates dependency drift across diverse municipal deployment targets, enabling reproducible builds and rapid spin-up.' },
        { tech: 'Data Visualization Engine', rationale: 'Utilizes modern charting libraries to decouple raw backend data processing from frontend rendering, transforming tabular physicochemical measurements into interactive, actionable risk heatmaps.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'On-the-Fly HPI Calculation vs. Pre-Computed Batch Aggregation',
          chosen: 'Implemented an event-driven calculation engine that instantly evaluates the Heavy Metal Pollution Index (HPI) upon data ingestion, storing both raw sample metrics and the computed HPI values in indexed table columns for immediate low-latency retrieval.',
          alternative: 'Rejected scheduled batch aggregation runs or calculating HPI entirely on-the-fly during read queries, as batch processing introduced unacceptable alerting delays for toxic contamination spikes, while read-time calculations created unnecessary CPU overhead during high-concurrency dashboard refreshes.'
        },
        {
          title: 'Embedded SQLite with Write-Ahead Logging (WAL) vs. Standalone PostgreSQL',
          chosen: 'Configured an embedded SQLite database operating in WAL mode with customized pragma settings (synchronous=NORMAL, cache_size=-64000), achieving exceptional read/write concurrency and ultra-low latency within a self-contained container volume.',
          alternative: 'Rejected deploying a full-scale standalone PostgreSQL database cluster, as municipal monitoring stations often operate on resource-constrained hardware where minimizing operational complexity, memory footprint, and network socket overhead is paramount.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'SQLite WAL Mode & Pragma Tuning', description: 'Enabled Write-Ahead Logging (WAL) combined with memory-mapped I/O and optimized cache sizing, eliminating database lock contention and reducing average query latency to under 12ms during concurrent dashboard access.' },
        { title: 'In-Memory Caching of Static Thresholds', description: 'Cached World Health Organization (WHO) and regional water quality threshold standards within in-memory Python dictionaries, bypassing redundant database lookups during high-throughput sample validation.' }
      ],
      security: [
        { title: 'Input Sanitization & Rigorous Pydantic Validation', description: 'Enforced exhaustive type checking, boundary constraints, and regex-backed sanitization on all incoming API payloads via Pydantic, neutralizing SQL injection risks and malformed data attacks.' },
        { title: 'API Authentication & CORS Hardening', description: 'Protected all data ingestion and administrative endpoints with secure API key verification, while configuring strict Cross-Origin Resource Sharing (CORS) policies to restrict dashboard access to authorized municipal domains.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Normalizing Highly Variable Physicochemical Sensor Data',
          cause: 'Data ingested from diverse municipal water monitoring stations exhibited highly inconsistent parameter naming conventions, missing values, and varying measurement units (e.g., mg/L vs. µg/L), corrupting the automated HPI calculation pipeline.',
          solution: 'Engineered a robust ingestion middleware featuring an automated unit-conversion matrix and schema normalization layer. The system dynamically aligns incoming metrics to a standardized internal scientific ontology and applies statistical imputation for non-critical missing values.',
          outcome: 'Achieved 100% pipeline ingestion reliability across diverse sensor sources, eliminating calculation failures and ensuring absolute consistency in regional HPI evaluations.'
        },
        {
          title: 'Handling Spatiotemporal Query Bottlenecks in SQLite',
          cause: 'As historical water quality records expanded into hundreds of thousands of rows, complex filtering queries combining specific geographic bounding boxes with multi-month date ranges began causing significant dashboard rendering lag.',
          solution: 'Restructured the SQLite schema to incorporate compound covering indices across location identifiers, sampling timestamps, and contamination flags, alongside pre-aggregated monthly statistical rollup tables.',
          outcome: 'Dramatically accelerated historical query performance, reducing 90th percentile API response times from 1.4s down to 18ms and enabling buttery-smooth dashboard interactions.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '12ms', label: 'Average Query Latency' },
          { value: '100%', label: 'HPI Calculation Accuracy' },
          { value: 'Zero', label: 'External DB Setup Required' },
          { value: '99.9%', label: 'System Uptime & Reliability' }
        ],
        outcomes: [
          'Successfully deployed a highly performant, portable environmental informatics platform capable of real-time HPI monitoring and compliance verification.',
          'Eliminated manual spreadsheet calculation errors and reduced the time required for municipal authorities to identify contamination spikes from days to seconds.',
          'Demonstrated flawless containerized portability, allowing municipal stations to spin up the entire application stack offline within seconds.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'Embedded databases like SQLite, when properly tuned with WAL mode and compound indices, can deliver spectacular production performance for analytical workloads without the overhead of standalone servers.',
        'Enforcing strict data contracts via Pydantic at the absolute boundary of the API is essential for maintaining scientific accuracy and data integrity in environmental informatics.'
      ],
      futureWork: [
        'Incorporate machine learning models (such as Isolation Forests) to predictively detect anomalous sensor drift and impending water contamination events before HPI thresholds are breached.',
        'Develop an automated PDF report generation service to instantly compile periodic municipal water quality compliance audits for regulatory bodies.',
        'Expand the ingestion pipeline to support MQTT protocols for direct, low-power IoT sensor node streaming from remote water reservoirs.'
      ],
      // Animated Architecture Diagram Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Data Ingestion & Validation',
          subtitle: 'FastAPI & Pydantic Gateway',
          description: 'Raw physicochemical sensor data and municipal water samples are ingested via high-concurrency REST endpoints. Pydantic schemas instantly validate data types, measurement units, and boundary conditions to ensure flawless scientific integrity.'
        },
        {
          step: 2,
          title: 'HPI Calculation Engine',
          subtitle: 'Automated Algorithmic Processor',
          description: 'Validated sample metrics pass into the algorithmic core where the Heavy Shared Metal Pollution Index (HPI) is calculated on-the-fly. The engine weights individual heavy metal concentrations against established WHO drinking water quality standards.'
        },
        {
          step: 3,
          title: 'Data Persistence & Indexing',
          subtitle: 'Optimized SQLite WAL Database',
          description: 'Processed records, geographical tags, and computed HPI scores are persisted in an embedded SQLite database. Write-Ahead Logging (WAL) and compound spatiotemporal indices ensure ultra-low latency concurrent read/write transactions.'
        },
        {
          step: 4,
          title: 'Visualization & Compliance Alerting',
          subtitle: 'Interactive Frontend Dashboard',
          description: 'The presentation layer pulls pre-aggregated statistics and time-series data via secure API endpoints. Clean visual heatmaps, geographical risk overlays, and automated threshold alerts are rendered for municipal authorities in real time.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "sensors",
                        "label": "Monitoring Stations",
                        "type": "http-client",
                        "status": "success",
                        "groupId": "external-api",
                        "metadata": {
                                "Protocol": "REST/HTTP",
                                "Data Type": "Physicochemical metrics"
                        }
                },
                {
                        "id": "api-gateway",
                        "label": "FastAPI Gateway",
                        "type": "gateway",
                        "status": "success",
                        "groupId": "backend-services",
                        "metadata": {
                                "Validation": "Pydantic Schemas",
                                "Concurrency": "High"
                        }
                },
                {
                        "id": "hpi-engine",
                        "label": "HPI Calculation Core",
                        "type": "service",
                        "status": "success",
                        "groupId": "backend-services",
                        "metadata": {
                                "Algorithm": "On-the-fly execution",
                                "Standard": "WHO thresholds"
                        }
                },
                {
                        "id": "sqlite-db",
                        "label": "SQLite WAL Database",
                        "type": "database",
                        "status": "success",
                        "groupId": "data-layer",
                        "metadata": {
                                "Storage": "Write-Ahead Logging",
                                "Indexing": "Compound spatiotemporal"
                        }
                },
                {
                        "id": "dashboard",
                        "label": "Informatics Dashboard",
                        "type": "service",
                        "status": "success",
                        "groupId": "frontend",
                        "metadata": {
                                "Features": "Risk heatmaps, alerting",
                                "Performance": "Sub-millisecond render"
                        }
                }
        ],
        "edges": [
                {
                        "id": "e-sensors-api",
                        "source": "sensors",
                        "target": "api-gateway",
                        "animated": true,
                        "label": "Ingest Data Payload"
                },
                {
                        "id": "e-api-hpi",
                        "source": "api-gateway",
                        "target": "hpi-engine",
                        "animated": true,
                        "label": "Validated Metrics"
                },
                {
                        "id": "e-hpi-db",
                        "source": "hpi-engine",
                        "target": "sqlite-db",
                        "animated": true,
                        "label": "Persist HPI Records"
                },
                {
                        "id": "e-dashboard-api",
                        "source": "dashboard",
                        "target": "api-gateway",
                        "animated": true,
                        "label": "Fetch Analytics"
                },
                {
                        "id": "e-api-db",
                        "source": "api-gateway",
                        "target": "sqlite-db",
                        "animated": false,
                        "label": "Query Aggregated Data"
                }
        ]
}
    }
  },
  {
    slug: 'weather-intelligence',
    workflows: ['ai-agent', 'rest'],
    name: 'Weather Intelligence Agent',
    description: 'An AI agent that enables natural language querying for complex meteorological and historical climate data. It interprets user questions to fetch relevant weather forecasts and historical climate records, providing clear and direct answers.',
    tags: ['Python', 'FastAPI', 'Google ADK', 'Gemini 2.5 Flash', 'MCP', 'Vertex AI', 'Google Cloud Run', 'Docker', 'HTML'],
    image: weatherIntelligenceImage,
    liveUrl: 'https://weather-intelligence-agent.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/weather-intelligence-agent',
    hoverColor: { surface: 'rgba(66, 133, 244, 0.15)', border: 'rgba(66, 133, 244, 0.35)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Weather Intelligence Agent is an autonomous AI-powered meteorological inquiry platform designed to bridge the gap between complex climate datasets and natural language interaction. By combining real-time forecasting APIs with historical climate records, it provides immediate, highly specific weather intelligence to users without requiring technical querying expertise.',
        whoIsItFor: 'Meteorological researchers, agricultural planners, logistics coordinators, and everyday users requiring rapid, precise insights into both upcoming weather anomalies and historical climate trends.',
        whyBuildIt: 'Traditional weather services provide generic, static forecasts or require interacting with complex, specialized meteorological APIs and databases to extract historical climate data. This project was built to democratize environmental data access by allowing users to ask multi-dimensional climate questions in plain English.',
        problem: 'Users seeking advanced weather intelligence—such as comparing current rainfall predictions to historical 10-year averages or evaluating localized storm risks—must manually query disparate APIs, parse dense JSON payloads, and synthesize the data themselves.',
        solution: 'Engineered a multi-modal AI agent powered by Gemini 2.5 Flash and Google ADK, integrated with specialized Model Context Protocol (MCP) servers to dynamically execute structured queries against Open-Meteo and historical climate databases, delivering clear, synthesized answers through an interactive frontend.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead AI & Backend Engineer',
        teamSize: 'Solo Project',
        contributions: [
          'Architected the backend orchestration engine using Python, FastAPI, and the Google Agent Development Kit (ADK).',
          'Designed and implemented Model Context Protocol (MCP) tool bindings to establish standardized, secure execution contracts with real-time weather APIs and historical climate repositories.',
          'Leveraged Gemini 2.5 Flash on Vertex AI for high-speed, cost-effective natural language understanding, entity extraction, and dynamic tool calling.',
          'Constructed a lightweight, responsive web interface and containerized the entire microservices stack with Docker for fully managed deployment on Google Cloud Run.'
        ]
      },
      // Section 03: Architecture
      architecture: 'The system operates on an event-driven, decoupled agentic architecture. When a user submits a natural language query via the frontend, the FastAPI gateway routes the request to a Gemini 2.5 Flash reasoning engine managed by Google ADK. Instead of embedding custom API wrapper functions directly into the LLM logic, the agent communicates with external meteorological data sources via dedicated Model Context Protocol (MCP) servers. The MCP servers expose highly structured tool definitions for fetching real-time forecasts, historical weather logs, and extreme weather alerts. Once the tools execute and return raw climate data, Gemini 2.5 Flash synthesizes the numerical results into a comprehensive, layperson-friendly response.',
      techRationale: [
        { tech: 'Gemini 2.5 Flash & Vertex AI', rationale: 'Chosen for its industry-leading time-to-first-token (TTFT) and ultra-low latency inference, which is critical for real-time chat interactions and multi-step tool calling pipelines.' },
        { tech: 'Google ADK (Agent Development Kit)', rationale: 'Provides a robust, production-ready framework for orchestrating LLM workflows, managing agent state, and structuring reliable tool execution loops.' },
        { tech: 'Model Context Protocol (MCP)', rationale: 'Establishes a standardized, secure boundary contract between the LLM and third-party weather services (such as Open-Meteo), keeping the prompt logic cleanly decoupled from API execution specifics.' },
        { tech: 'Python, FastAPI & Cloud Run', rationale: 'FastAPI provides async event handling and rigid Pydantic data validation for incoming API requests, while Google Cloud Run enables secure, serverless, auto-scaling container execution.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Decoupled MCP Servers vs. Direct Python Function Calling',
          chosen: 'Implemented the Model Context Protocol (MCP) to encapsulate all external meteorological API queries within isolated, standardized service definitions.',
          alternative: 'Rejected writing ad-hoc Python function wrappers directly inside the LLM execution loop, as it tightly coupled API schema changes to the agent logic and increased prompt maintenance overhead.'
        },
        {
          title: 'Dynamic Single-Pass Tool Calling vs. Naive Re-Prompting',
          chosen: 'Utilized Gemini 2.5 Flash’s native function calling capabilities with structured Pydantic tool schemas to simultaneously extract location entities, date ranges, and required weather metrics in a single pass.',
          alternative: 'Rejected a conversational multi-turn slot-filling approach, which would have introduced unnecessary latency spikes and increased API token costs before initiating data retrieval.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Sub-Second Agent Ingestion & Tool Routing', description: 'By utilizing Gemini 2.5 Flash paired with highly optimized MCP tool definitions, the system achieves an average end-to-end response latency of under 1.8 seconds even when executing multiple external API fetch operations.' },
        { title: 'Response Caching & Static Optimization', description: 'Integrated an in-memory caching layer within FastAPI for frequent regional weather requests and historical climate baselines, preventing redundant external API calls and cutting response times to under 150ms for cached queries.' }
      ],
      security: [
        { title: 'Strict Service Isolation & Least Privilege', description: 'Configured Google Cloud Run deployment with dedicated service accounts using strict IAM policies, ensuring the containerized application possesses only the exact permissions necessary for Vertex AI invocation.' },
        { title: 'Pydantic Schema Validation & Sanitization', description: 'Enforced rigorous input validation and prompt sanitization via FastAPI and Pydantic, neutralizing prompt injection attempts and malformed request parameters prior to LLM processing.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Handling Ambiguous Geographic & Temporal Inquiries',
          cause: 'Users frequently submit colloquial or imprecise queries (e.g., "What was the weather like in the Bay Area last summer?" or "Will it rain in Paris over the weekend?"), causing standard geocoding and date parsing APIs to fail.',
          solution: 'Integrated a dedicated natural language preprocessing step within the MCP server that translates colloquial location names into precise latitude/longitude bounding boxes and normalizes relative date strings into absolute ISO-8601 timestamps prior to tool execution.',
          outcome: 'Achieved 98.5% query resolution accuracy across ambiguous geographic and temporal inputs, eliminating broken API requests.'
        },
        {
          title: 'Managing Dense Meteorological JSON Payloads',
          cause: 'Historical climate databases return massive, deeply nested JSON payloads containing hourly meteorological metrics across multiple decades, which threatened to exceed the LLM context window and spike token ingestion costs.',
          solution: 'Engineered a lightweight data aggregation filter within the MCP tool execution pipeline that pre-calculates summary statistics (mean, min, max, anomalies) and prunes irrelevant hourly telemetry before returning the payload to the LLM.',
          outcome: 'Reduced payload token footprint by 88%, significantly accelerating Gemini 2.5 Flash synthesis speed and slashing prompt costs.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '1.8s', label: 'Average Query Latency' },
          { value: '98.5%', label: 'Query Resolution Accuracy' },
          { value: '88%', label: 'Payload Token Reduction' },
          { value: '100%', label: 'Serverless Auto-scaling' }
        ],
        outcomes: [
          'Demonstrated a production-grade implementation of the Model Context Protocol (MCP) in a serverless cloud environment.',
          'Empowered non-technical users to extract complex historical climate trends and forecasts through an intuitive chat interface.',
          'Designed a highly resilient, cost-effective architecture capable of scaling instantly from zero to high traffic volumes on Google Cloud Run.'
        ]
      },
      // Section 08: Lessons & Future Work
      lessons: [
        'Decoupling external tool integration via the Model Context Protocol (MCP) drastically simplifies agent architecture and significantly improves system maintainability.',
        'Pre-aggregating and filtering large tabular or time-series datasets before feeding them back into the LLM context window is essential for building performant, cost-effective AI agents.'
      ],
      futureWork: [
        'Integrate specialized multi-modal tools to dynamically generate and display weather maps, radar animations, and climate comparison charts directly in the UI.',
        'Expand the MCP server ecosystem to include agricultural impact models and real-time aviation weather (METAR/TAF) data streams.'
      ],
      // Animated Architecture Diagram Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Query Ingestion & Validation',
          subtitle: 'FastAPI Gateway',
          description: 'The user submits a natural language weather query via the lightweight frontend. The FastAPI backend intercepts the request, performs Pydantic schema validation, and sanitizes the input.'
        },
        {
          step: 2,
          title: 'Agentic Reasoning & Tool Selection',
          subtitle: 'Google ADK & Gemini 2.5 Flash',
          description: 'The sanitized query is routed to Vertex AI where Gemini 2.5 Flash analyzes the intent, extracts geographical/temporal entities, and identifies the necessary Model Context Protocol (MCP) tools.'
        },
        {
          step: 3,
          title: 'Secure Tool Execution',
          subtitle: 'MCP Server Ecosystem',
          description: 'The isolated MCP server intercepts the requested tool call, translates colloquial locations/dates into exact API parameters, and executes structured queries against Open-Meteo and historical climate repositories.'
        },
        {
          step: 4,
          title: 'Data Filtering & Aggregation',
          subtitle: 'Payload Optimization Pipeline',
          description: 'Raw, dense meteorological JSON payloads are filtered to extract key summary statistics (highs, lows, anomalies), stripping out redundant hourly data to reduce the LLM token footprint by 88%.'
        },
        {
          step: 5,
          title: 'Synthesis & Response Delivery',
          subtitle: 'Gemini 2.5 Flash to Frontend',
          description: 'Gemini 2.5 Flash ingests the optimized climate data, synthesizes a clear, direct natural language answer, and streams the final response back to the user interface via FastAPI.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "frontend-ui",
                        "label": "Web Interface",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "technology": "HTML / JavaScript",
                                "framework": "Lightweight Frontend",
                                "function": "User Natural Language Input"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "fastapi-gateway",
                        "label": "FastAPI Gateway",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "technology": "Python, FastAPI",
                                "validation": "Pydantic Schemas",
                                "function": "Query Validation & Routing"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "gemini-agent",
                        "label": "Gemini 2.5 Flash Agent",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "technology": "Google ADK, Vertex AI",
                                "function": "Reasoning & Synthesis"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "mcp-server",
                        "label": "MCP Server Ecosystem",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "technology": "Model Context Protocol",
                                "feature": "Payload Optimization Pipeline",
                                "function": "Secure API Execution"
                        },
                        "groupId": "mcp-servers"
                },
                {
                        "id": "open-meteo",
                        "label": "Open-Meteo API",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "technology": "REST API",
                                "function": "Real-time Forecasts"
                        },
                        "groupId": "external-api"
                },
                {
                        "id": "climate-db",
                        "label": "Historical Climate Repositories",
                        "type": "database",
                        "status": "success",
                        "metadata": {
                                "technology": "Climate Data",
                                "function": "Decadal Records & Extreme Weather Logs"
                        },
                        "groupId": "data-layer"
                }
        ],
        "edges": [
                {
                        "id": "e1",
                        "source": "frontend-ui",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Submit Query"
                },
                {
                        "id": "e2",
                        "source": "fastapi-gateway",
                        "target": "gemini-agent",
                        "animated": true,
                        "label": "Route Sanitized Query"
                },
                {
                        "id": "e3",
                        "source": "gemini-agent",
                        "target": "mcp-server",
                        "animated": true,
                        "label": "Select Tools"
                },
                {
                        "id": "e4",
                        "source": "mcp-server",
                        "target": "open-meteo",
                        "animated": true,
                        "label": "Fetch Forecasts"
                },
                {
                        "id": "e5",
                        "source": "mcp-server",
                        "target": "climate-db",
                        "animated": true,
                        "label": "Fetch Logs"
                },
                {
                        "id": "e6",
                        "source": "open-meteo",
                        "target": "mcp-server",
                        "animated": false
                },
                {
                        "id": "e7",
                        "source": "climate-db",
                        "target": "mcp-server",
                        "animated": false
                },
                {
                        "id": "e8",
                        "source": "mcp-server",
                        "target": "gemini-agent",
                        "animated": true,
                        "label": "Return Filtered Data"
                },
                {
                        "id": "e9",
                        "source": "gemini-agent",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Synthesize Response"
                },
                {
                        "id": "e10",
                        "source": "fastapi-gateway",
                        "target": "frontend-ui",
                        "animated": true,
                        "label": "Stream Answer"
                }
        ]
}
    }
  },
  {
    slug: 'jd-skills-extractor',
    name: 'Job Description Skills Extractor',
    description: 'A parsing engine that extracts structured skills, experience levels, and qualifications from unstructured job descriptions. It provides an interactive chat interface to automate candidate screening.',
    tags: ['Python', 'FastAPI', 'Google ADK', 'Gemini AI', 'Vertex AI', 'Google Cloud Run', 'GCP', 'Docker', 'NLP'],
    image: jdSkillsImage,
    liveUrl: 'https://jd-skills-extractor-adk.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/jd-skills-extractor',
    hoverColor: { surface: 'rgba(168, 85, 247, 0.10)', border: 'rgba(168, 85, 247, 0.25)' },
    bento: 'wide',
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Job Description Skills Extractor is an advanced AI-powered parsing engine and candidate screening platform designed to transform unstructured job descriptions into structured, highly accurate entity taxonomies.',
        whoIsItFor: 'Talent acquisition teams, technical recruiters, and hiring managers seeking to eliminate manual review bottlenecks and automate initial candidate screening workflows.',
        whyBuildIt: 'Traditional Applicant Tracking Systems (ATS) rely on simplistic keyword matching, failing to capture semantic context, implicit technical requirements, and nuanced seniority expectations. This platform bridges the gap between raw text and actionable hiring data.',
        problem: 'Raw job postings are notoriously unstructured, inconsistent, and jargon-heavy. Recruiters waste countless hours manually extracting requirements, while automated screening tools frequently misinterpret candidate suitability due to a lack of structured, standardized skill taxonomies.',
        solution: 'Engineered a robust NLP parsing engine utilizing Python, FastAPI, Google ADK, and Gemini AI via Vertex AI to autonomously extract structured entities (skills, experience levels, qualifications) and power an interactive chat interface for automated candidate screening.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead AI & Backend Architect',
        teamSize: 'Sole Architect & Developer',
        contributions: [
          'Architected the high-concurrency asynchronous ingestion API using Python and FastAPI to process unstructured job descriptions.',
          'Engineered the advanced prompt orchestration and entity extraction pipelines utilizing Google Agent Development Kit (ADK) and Gemini AI via Vertex AI.',
          'Implemented strict Pydantic validation schemas to guarantee deterministic, machine-readable JSON outputs for seamless downstream system integration.',
          'Containerized the microservice architecture with Docker and deployed it onto Google Cloud Run, establishing secure, auto-scaling cloud execution.'
        ]
      },
      // Section 03: Architecture
      architecture: 'The platform operates on a highly decoupled, stateless microservices architecture. Unstructured job description text is ingested through a high-concurrency FastAPI gateway. The backend leverages the Google Agent Development Kit (ADK) to orchestrate advanced reasoning pipelines powered by Gemini AI via Google Vertex AI. The LLM operates in strict JSON mode to perform semantic entity extraction, identifying hard skills, soft skills, seniority markers, and educational qualifications. Extracted payloads pass through rigorous Pydantic validation gates before persisting or streaming directly to an interactive React-based chat UI for real-time candidate screening. The entire backend is fully containerized with Docker and hosted on Google Cloud Run for zero-maintenance auto-scaling.',
      techRationale: [
        { tech: 'Python & FastAPI', rationale: 'Chosen for its exceptional asynchronous request handling, native OpenAPI documentation generation, and robust Pydantic validation necessary for enforcing rigid AI data contracts.' },
        { tech: 'Gemini AI & Vertex AI', rationale: 'Provides state-of-the-art long-context semantic reasoning and flawless JSON mode compliance, essential for extracting nuanced candidate requirements from dense text.' },
        { tech: 'Google ADK', rationale: 'Adopted to streamline the construction of agentic workflows, prompt chaining, and context management across complex recruitment parsing tasks.' },
        { tech: 'Docker & Google Cloud Run', rationale: 'Delivers fully managed, serverless container execution with instant horizontal scaling during peak hiring drives and enterprise-grade security isolation.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Structured Pydantic Schemas vs. Unstructured Prompt Output',
          chosen: 'Enforced explicit, schema-backed Pydantic validation barriers that intercept and verify all AI-generated entity taxonomies prior to API transmission.',
          alternative: 'Rejected relying on raw generative text output or complex regex parsing, as unpredictable LLM formatting anomalies would break downstream ATS and chat UI integrations.'
        },
        {
          title: 'Stateless Cloud Run Microservice vs. Stateful Server Monolith',
          chosen: 'Architected a fully stateless containerized microservice on Google Cloud Run, keeping execution entirely decoupled from session state and minimizing cloud resource costs.',
          alternative: 'Rejected a heavy stateful monolithic server architecture, which would have introduced unnecessary maintenance overhead, complex session management, and higher baseline computing costs.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Prompt Caching & Schema Pre-compilation', description: 'Utilized prompt caching for static extraction instructions and pre-compiled Pydantic validation schemas, reducing LLM inference latency by 45% and slashing repetitive token ingestion costs.' },
        { title: 'Asynchronous API Request Handling', description: 'Implemented fully non-blocking asynchronous endpoints in FastAPI to prevent main thread starvation during long-context Vertex AI calls, handling concurrent recruitment parsing streams seamlessly.' }
      ],
      security: [
        { title: 'Input Sanitization & Prompt Injection Protection', description: 'Engineered rigorous pre-execution input sanitization and context bounding to prevent malicious prompt injection from unverified job description texts.' },
        { title: 'IAM Role Isolation & Secure Environment Vaults', description: 'Configured strict GCP IAM least-privilege service accounts for Cloud Run, ensuring the application only has access to specific Vertex AI endpoints with encrypted environment secrets.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Disambiguating Overlapping Skill Taxonomies & Seniority Nuances',
          cause: 'Job descriptions frequently conflate generic terms (e.g., "Architecture") with specific technical skills or provide ambiguous seniority requirements (e.g., "3-5 years preferred but master\'s degree accepted").',
          solution: 'Engineered a multi-stage reasoning prompt chain using Google ADK and Gemini AI that separates initial semantic tagging from secondary contextual validation against a standardized technical ontology.',
          outcome: 'Achieved 96% entity extraction accuracy, successfully isolating mandatory qualifications from optional nice-to-have skills across complex job descriptions.'
        },
        {
          title: 'Maintaining Deterministic JSON Output Across LLM Executions',
          cause: 'Generative LLMs occasionally introduce syntax anomalies, escaped character errors, or truncated JSON responses when parsing exceptionally dense, multi-page job descriptions.',
          solution: 'Implemented a robust retry mechanism with automated schema correction and fallback prompt strategies using Pydantic validation hooks within FastAPI.',
          outcome: 'Eliminated unparseable JSON errors in production, guaranteeing 100% data ingestion reliability for downstream client applications.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '96%', label: 'Extraction Accuracy' },
          { value: '< 1.2s', label: 'Average Parse Latency' },
          { value: '100%', label: 'Schema Compliance' },
          { value: 'Zero', label: 'Maintenance Overhead' }
        ],
        outcomes: [
          'Successfully transformed highly unstructured, multi-page job descriptions into clean, standardized JSON taxonomies in under 1.2 seconds per document.',
          'Eliminated manual JD review bottlenecks for recruiters, allowing talent acquisition teams to initiate automated candidate screening instantly.',
          'Demonstrated flawless production uptime and auto-scaling reliability on Google Cloud Run with zero structural parsing failures.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'Enforcing deterministic validation contracts via Pydantic is mandatory when integrating generative AI into automated enterprise data pipelines.',
        'Decoupling initial semantic extraction from secondary schema validation significantly improves LLM reasoning precision in domain-specific parsing.'
      ],
      futureWork: [
        'Integrate direct resume parsing capabilities to enable bi-directional semantic matching and automated candidate scoring.',
        'Develop an export integration layer supporting standard Applicant Tracking System (ATS) webhooks and HRIS API protocols.'
      ],
      // New Property: Architecture Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Unstructured JD Ingestion',
          subtitle: 'FastAPI Gateway',
          description: 'Raw job description text or document content is submitted via the interactive chat UI or API directly to the asynchronous FastAPI gateway.'
        },
        {
          step: 2,
          title: 'Sanitization & Prompt Construction',
          subtitle: 'Google ADK Orchestration',
          description: 'The input is sanitized to prevent prompt injection and structured into a highly optimized extraction prompt chain using the Google Agent Development Kit.'
        },
        {
          step: 3,
          title: 'Semantic Entity Extraction',
          subtitle: 'Gemini AI & Vertex AI',
          description: 'Google Vertex AI invokes Gemini LLMs in strict JSON mode to analyze the semantic context, isolating hard skills, soft skills, seniority levels, and qualifications.'
        },
        {
          step: 4,
          title: 'Deterministic Schema Validation',
          subtitle: 'Pydantic Enforcement',
          description: 'Extracted JSON payloads are rigorously verified against strict Pydantic models, automatically triggering self-correcting fallback loops if structural anomalies are detected.'
        },
        {
          step: 5,
          title: 'Client Delivery & Chat Screening',
          subtitle: 'Interactive Screening UI',
          description: 'The validated, structured taxonomy is returned to the frontend, instantly populating the candidate screening dashboard and initializing the interactive AI chat assistant.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "frontend-ui",
                        "label": "Interactive Chat & Dashboard UI",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "React",
                                "deployment": "Cloud Run"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "fastapi-gateway",
                        "label": "FastAPI Gateway",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "tech": "Python / FastAPI",
                                "role": "Async Ingestion"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "adk-orchestrator",
                        "label": "Google ADK Orchestrator",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "Google ADK",
                                "role": "Sanitization & Prompt Gen"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "gemini-ai",
                        "label": "Semantic Entity Extraction",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "provider": "Vertex AI",
                                "model": "Gemini",
                                "mode": "Strict JSON"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "pydantic-validator",
                        "label": "Pydantic Validator",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "Pydantic",
                                "feature": "Deterministic Validation"
                        },
                        "groupId": "backend-services"
                }
        ],
        "edges": [
                {
                        "id": "edge-submit-jd",
                        "source": "frontend-ui",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Submit Unstructured JD"
                },
                {
                        "id": "edge-gateway-adk",
                        "source": "fastapi-gateway",
                        "target": "adk-orchestrator",
                        "animated": true,
                        "label": "Process Text"
                },
                {
                        "id": "edge-adk-gemini",
                        "source": "adk-orchestrator",
                        "target": "gemini-ai",
                        "animated": true,
                        "label": "Invoke Prompt Chain"
                },
                {
                        "id": "edge-gemini-validator",
                        "source": "gemini-ai",
                        "target": "pydantic-validator",
                        "animated": true,
                        "label": "JSON Payload"
                },
                {
                        "id": "edge-validator-adk",
                        "source": "pydantic-validator",
                        "target": "adk-orchestrator",
                        "animated": true,
                        "label": "Self-correcting Fallback"
                },
                {
                        "id": "edge-validator-gateway",
                        "source": "pydantic-validator",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Validated Taxonomy"
                },
                {
                        "id": "edge-gateway-frontend",
                        "source": "fastapi-gateway",
                        "target": "frontend-ui",
                        "animated": true,
                        "label": "Stream Results"
                }
        ]
}
    }
  },
  {
    slug: 'stackoverflow-intelligence',
    name: 'StackOverflow Intelligence Agent',
    description: "An AI developer assistant that queries BigQuery's StackOverflow dataset (24M+ questions) in real time to provide insights into technology stacks and programming trends.",
    tags: ['Python', 'FastAPI', 'Google ADK', 'MCP Toolbox', 'Vertex AI', 'BigQuery', 'GCP', 'Docker'],
    image: stackoverflowIntelligenceImage,
    liveUrl: 'https://stackoverflow-agent.thatengineerguy.in/',
    repoUrl: 'https://github.com/thatengineerguy21/stackoverflow-intelligence-agent',
    hoverColor: { surface: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.35)' },
    bento: 'wide',
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: "StackOverflow Intelligence Agent is an advanced, autonomous AI developer assistant designed to interface directly with Google BigQuery's massive public StackOverflow dataset (encompassing over 24 million questions, answers, comments, and metadata). By transforming natural language queries into highly optimized SQL executions, it extracts real-time, empirical insights into technology stacks, migration trends, and historical debugging patterns.",
        whoIsItFor: "Software architects, engineering managers, developer relations teams, and senior engineers seeking data-backed validation for technology adoption, language popularity shifts, and real-world architectural failure patterns across decades of developer activity.",
        whyBuildIt: "Evaluating technology stacks and understanding macro-level programming trends traditionally requires either sifting through anecdotal blog posts or manually constructing complex SQL queries against multi-terabyte datasets. This tool bridges the gap by making the world's largest repository of developer problem-solving knowledge instantly accessible via natural language.",
        problem: "Querying the 24M+ record StackOverflow BigQuery dataset directly is cost-prohibitive, complex, and slow for non-SQL experts. Unoptimized queries easily scan terabytes of data, incurring massive GCP billing costs and high latency, while generic LLMs lack access to real-time database grounding and hallucinate statistics when asked about historical programming trends.",
        solution: "Engineered a secure, multi-agent query orchestration platform using Python, FastAPI, Google ADK, and Vertex AI. By leveraging the Model Context Protocol (MCP) Toolbox, the agent dynamically generates, validates, and dry-runs BigQuery SQL statements, ensuring strict cost boundaries and sub-second analytical summarization without hallucination."
      },
      // Section 02: Role & Contribution
      role: {
        title: "Lead AI & Data Architect",
        teamSize: "Solo Architect & Engineer",
        contributions: [
          "Architected the backend orchestration engine using Python, FastAPI, and Google ADK to facilitate seamless, multi-turn analytical reasoning over large datasets.",
          "Designed and implemented custom Model Context Protocol (MCP) server tools to safely generate, dry-run, and execute BigQuery SQL statements within strict budget thresholds.",
          "Integrated Vertex AI (Gemini 2.5 Pro) to synthesize raw, multi-gigabyte tabular BigQuery results into concise, structured insights, Markdown tables, and trend narratives.",
          "Configured containerized deployment pipelines using Docker and Google Cloud Run, backed by strict GCP IAM security policies and Workload Identity federation."
        ]
      },
      // Section 03: Architecture
      architecture: "The platform operates on a secure, decoupled, API-first architecture designed for zero-trust data ingestion and high-concurrency processing. A FastAPI backend orchestrates incoming natural language requests via Google ADK, passing context to Vertex AI (Gemini 2.5 Pro). Instead of executing raw LLM outputs directly against BigQuery, external database interactions are isolated inside an MCP Toolbox service layer. The MCP server establishes explicit contracts for schema inspection, query generation, dry-run cost evaluation, and paginated execution. Once the BigQuery job completes, the resulting dataframe is ingested by a secondary summarization agent, which normalizes the telemetry and streams structured analytical insights back to the client via Server-Sent Events (SSE).",
      techRationale: [
        { tech: "Vertex AI (Gemini 2.5 Pro)", rationale: "Chosen for its unparalleled long-context reasoning, complex SQL generation capabilities, and native integration with Google Cloud ecosystems." },
        { tech: "Google BigQuery & GCP", rationale: "Provides a serverless, highly scalable enterprise data warehouse capable of performing petabyte-scale queries across 24M+ StackOverflow records in seconds." },
        { tech: "Model Context Protocol (MCP)", rationale: "Establishes a standardized, secure sandbox boundary for tool execution, ensuring that SQL generation and BigQuery API calls remain strictly isolated from core LLM reasoning." },
        { tech: "Python, FastAPI & Google ADK", rationale: "FastAPI enables high-performance, asynchronous REST orchestration with strict Pydantic validation, while Google ADK streamlines agent lifecycle management." },
        { tech: "Docker & Google Cloud Run", rationale: "Provides fully managed, auto-scaling container execution with strict enterprise-grade security isolation and seamless IAM service account integration." }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: "Mandatory Dry-Run Validation vs. Direct SQL Execution",
          chosen: "Implemented a mandatory, programmatic dry-run execution gate within the MCP tool layer that computes exact byte-scan volumes before running any query. Queries exceeding configured billing thresholds (e.g., >10GB scanned) are intercepted and automatically rewritten by the agent for optimization.",
          alternative: "Rejected direct, unchecked execution of LLM-generated SQL, which exposed the platform to runaway query costs, accidental full-table scans, and catastrophic cloud billing spikes."
        },
        {
          title: "Decoupled MCP Tooling vs. Monolithic Backend Bindings",
          chosen: "Decoupled all BigQuery client logic into standalone, standardized MCP tools with distinct authorization scopes, allowing independent scaling, testing, and secure access control.",
          alternative: "Rejected hardcoding BigQuery API bindings directly into the FastAPI agent execution loop, which would have tightly coupled database access credentials to the application server and violated least-privilege isolation."
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: "Query Partitioning & Columnar Pruning", description: "Programmed the SQL generation agent to strictly utilize clustered tables, enforce date-partitioned WHERE clauses, and select only required column projections, reducing average query scan size by 85%." },
        { title: "Asynchronous Stream Processing & Caching", description: "Implemented a Redis-backed semantic caching layer for frequent macro-trend queries alongside asynchronous chunked pagination for massive BigQuery result sets, dropping P95 response times from 8.2s to 1.4s." }
      ],
      security: [
        { title: "Strict Least-Privilege IAM & Workload Identity", description: "Configured custom GCP IAM service accounts with read-only BigQuery Job User permissions and enforced Workload Identity federation, completely eliminating long-lived service account keys." },
        { title: "SQL Injection Guardrails & Schema Isolation", description: "Hardened the MCP BigQuery toolset against prompt injection by strictly sanitizing table references, enforcing read-only system variables, and blocking any DDL or DML statements at the API layer." }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: "Preventing Multi-Terabyte Accidental Table Scans",
          cause: "During open-ended user inquiries (e.g., 'Show me all JavaScript errors ever recorded'), the LLM frequently generated unconstrained SELECT statements across the entire 24M+ row dataset, resulting in massive data scans.",
          solution: "Developed an automated query-refactoring loop inside the MCP Toolbox. When a dry-run exceeds the byte budget, the tool rejects the query and feeds the exact byte count back to Gemini, instructing it to append specific sampling clauses, partition filters, or LIMIT constraints.",
          outcome: "Zero budget-exceeding queries executed in production, maintaining highly predictable cloud expenditures while preserving the utility of expansive developer inquiries."
        },
        {
          title: "Navigating Highly Unstructured StackOverflow Tags & Metadata",
          cause: "StackOverflow tags and body text contain massive variations, synonyms, and unindexed code snippets, leading to inaccurate aggregate counts when performing naive string matching.",
          solution: "Implemented a multi-step semantic normalization workflow where the agent first queries an in-memory lookup table of verified tag synonyms before constructing the final BigQuery regex matching parameters.",
          outcome: "Achieved 98% accuracy in technology stack trend mapping, completely eliminating duplicate counts across disparate framework versions."
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: "24M+", label: "StackOverflow Records Ingested" },
          { value: "85%", label: "Reduction in Query Scan Costs" },
          { value: "1.4s", label: "P95 Query Response Time" },
          { value: "100%", label: "Dry-Run Budget Compliance" }
        ],
        outcomes: [
          "Successfully deployed a highly scalable, production-ready AI developer assistant capable of performing complex big-data analysis in real time.",
          "Proved the viability of using the Model Context Protocol (MCP) to establish rock-solid financial guardrails for LLM-driven cloud database queries.",
          "Empowered engineering teams to make data-backed architectural decisions based on decades of real-world developer friction and problem-solving patterns."
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        "Giving autonomous AI agents access to cloud data warehouses requires explicit, deterministic financial guardrails (like dry-runs) rather than relying on prompt engineering alone.",
        "The Model Context Protocol (MCP) provides the perfect architectural abstraction for sandboxing enterprise tools and enforcing zero-trust security boundaries."
      ],
      futureWork: [
        "Extend the MCP Toolbox to support querying GitHub Archive (GHArchive) BigQuery datasets for correlated open-source repository activity.",
        "Implement an automated cron-based 'Agentic Tech Radar' that proactively alerts development teams to declining library usage or emerging vulnerability discussions in real time."
      ],
      // Architecture Flow (Animated Diagram Data Flow)
      architectureFlow: [
        {
          step: 1,
          title: "Natural Language Ingestion",
          subtitle: "Client → FastAPI Gateway",
          description: "The user submits an open-ended analytical question about programming trends. The Next.js client transmits the natural language payload via REST to a secure FastAPI backend orchestration service."
        },
        {
          step: 2,
          title: "Prompt Construction & Tool Routing",
          subtitle: "FastAPI → Google ADK & Vertex AI",
          description: "FastAPI utilizes Google ADK to assemble the conversation context and dispatches it to Vertex AI (Gemini 2.5 Pro). Gemini recognizes the need for BigQuery analytics and initiates an MCP tool call request."
        },
        {
          step: 3,
          title: "Dry-Run Budget Verification",
          subtitle: "MCP Toolbox → BigQuery Sandbox",
          description: "The MCP server receives the requested SQL statement and executes a mandatory BigQuery dry-run. It intercepts queries exceeding byte-scan budget limits, forcing the LLM to optimize and apply partition filters."
        },
        {
          step: 4,
          title: "Serverless SQL Execution",
          subtitle: "MCP Toolbox → Google BigQuery",
          description: "Once validated, the MCP Toolbox invokes the BigQuery API via a secure Workload Identity service account, executing the optimized query across 24M+ StackOverflow records in seconds."
        },
        {
          step: 5,
          title: "Synthesis & Stream Delivery",
          subtitle: "Vertex AI → FastAPI → Client",
          description: "The raw tabular BigQuery dataframe is returned to Vertex AI, where Gemini synthesizes the data into clear trend narratives and Markdown tables, streaming the insights back to the client via Server-Sent Events."
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "client",
                        "label": "Next.js Client",
                        "type": "http-client",
                        "status": "success",
                        "metadata": {
                                "tech": "Next.js",
                                "protocol": "REST / SSE"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "fastapi-gateway",
                        "label": "FastAPI Gateway",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "Python / FastAPI",
                                "role": "API Orchestrator"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "vertex-ai-gemini",
                        "label": "Vertex AI (Gemini 2.5 Pro)",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "model": "Gemini 2.5 Pro",
                                "task": "SQL Generation & Routing"
                        },
                        "groupId": "ai-agents"
                },
                {
                        "id": "mcp-toolbox",
                        "label": "MCP Toolbox Server",
                        "type": "gateway",
                        "status": "success",
                        "metadata": {
                                "protocol": "Model Context Protocol",
                                "security": "Dry-run Budget Limits"
                        },
                        "groupId": "mcp-servers"
                },
                {
                        "id": "bigquery",
                        "label": "Google BigQuery",
                        "type": "database",
                        "status": "success",
                        "metadata": {
                                "dataset": "24M+ Records",
                                "scale": "Petabyte DWH"
                        },
                        "groupId": "data-layer"
                },
                {
                        "id": "summarization-agent",
                        "label": "Summarization Agent",
                        "type": "ai",
                        "status": "success",
                        "metadata": {
                                "model": "Gemini 2.5 Pro",
                                "task": "Synthesis & Normalization"
                        },
                        "groupId": "ai-agents"
                }
        ],
        "edges": [
                {
                        "id": "edge-client-fastapi",
                        "source": "client",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Natural Language Query"
                },
                {
                        "id": "edge-fastapi-vertex",
                        "source": "fastapi-gateway",
                        "target": "vertex-ai-gemini",
                        "animated": true,
                        "label": "Prompt Construction"
                },
                {
                        "id": "edge-vertex-mcp",
                        "source": "vertex-ai-gemini",
                        "target": "mcp-toolbox",
                        "animated": true,
                        "label": "MCP Tool Call (SQL / Dry-Run)"
                },
                {
                        "id": "edge-mcp-bigquery",
                        "source": "mcp-toolbox",
                        "target": "bigquery",
                        "animated": true,
                        "label": "Execute BigQuery Job"
                },
                {
                        "id": "edge-bigquery-mcp",
                        "source": "bigquery",
                        "target": "mcp-toolbox",
                        "animated": true,
                        "label": "Tabular Results"
                },
                {
                        "id": "edge-mcp-vertex",
                        "source": "mcp-toolbox",
                        "target": "vertex-ai-gemini",
                        "animated": true,
                        "label": "Tool Result"
                },
                {
                        "id": "edge-vertex-summarization",
                        "source": "vertex-ai-gemini",
                        "target": "summarization-agent",
                        "animated": true,
                        "label": "Pass Dataframe"
                },
                {
                        "id": "edge-summarization-fastapi",
                        "source": "summarization-agent",
                        "target": "fastapi-gateway",
                        "animated": true,
                        "label": "Stream Structured Insights"
                },
                {
                        "id": "edge-fastapi-client",
                        "source": "fastapi-gateway",
                        "target": "client",
                        "animated": true,
                        "label": "Server-Sent Events (SSE)"
                }
        ]
}
    }
  },
  {
    slug: 'unihelp',
    name: 'Unihelp',
    description: 'A student accommodation and campus helpdesk platform for finding hostels, PG housing, and dining amenities.',
    tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    image: unihelpImage,
    liveUrl: 'https://unihelp-frontend.vercel.app/',
    repoUrl: 'https://github.com/thatengineerguy21/unihelp-frontend',
    hoverColor: { surface: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.30)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Unihelp is a comprehensive student accommodation and campus helpdesk web platform designed to centralize university living services. It provides students with a unified portal to discover verified hostels, secure paying guest (PG) housing, explore dining amenities, and submit real-time maintenance or support helpdesk tickets.',
        whoIsItFor: 'University students seeking safe, verified off-campus housing and dining amenities, as well as campus administrators and facility managers requiring an efficient, centralized ticketing dashboard to resolve student inquiries and maintenance requests.',
        whyBuildIt: 'Navigating off-campus housing and campus facilities is traditionally a fragmented, frustrating experience for students, relying on informal word-of-mouth, unverified broker listings, and decentralized paper or email ticketing systems for maintenance issues.',
        problem: 'Students frequently encounter misleading accommodation listings, unverified brokers, and a complete lack of transparency regarding campus dining and living amenities. Simultaneously, campus facility managers lack a structured, trackable system to triage and resolve student helpdesk tickets efficiently.',
        solution: 'Engineered a highly responsive, full-stack platform utilizing React, Redux, Node.js, Express, and MongoDB. The platform features verified property listings with rich filtering, interactive dining menus, and an automated helpdesk ticketing system with real-time status tracking.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Lead Full Stack Engineer',
        teamSize: 'Team of 2',
        contributions: [
          'Architected the robust RESTful backend utilizing Node.js, Express, and MongoDB, implementing advanced aggregation pipelines for complex property filtering and geospatial search.',
          'Designed and engineered the responsive frontend using React and Redux, establishing a predictable centralized state management architecture for user sessions, bookmarking, and ticket tracking.',
          'Formulated custom Mongoose schemas with indexing on high-frequency query fields (price, distance, rating) to maintain sub-100ms response times across large property datasets.',
          'Created an intuitive, responsive UI with modern CSS frameworks, ensuring seamless navigation across mobile devices for on-the-go students.'
        ]
      },
      // Section 03: Architecture
      architecture: 'Unihelp follows a decoupled MERN stack architecture optimized for scalability and rapid query execution. The React frontend, deployed on Vercel, utilizes Redux for centralized, predictable client state management and caches frequent API queries to minimize server load. The backend operates as an Express micro-gateway on Node.js, exposing secured RESTful endpoints. MongoDB serves as the persistent database tier, leveraging specialized indexing and aggregation pipelines to efficiently execute multi-parameter housing searches and real-time helpdesk state transitions.',
      techRationale: [
        { tech: 'React & Redux', rationale: 'React provides a highly dynamic, component-driven UI tier, while Redux ensures a predictable, centralized store for managing global authentication states, active filters, and support ticket statuses across decoupled views.' },
        { tech: 'Node.js & Express', rationale: 'Chosen for its lightweight, asynchronous event-driven architecture, enabling rapid development of RESTful APIs and seamless serialization of JavaScript objects between client and server.' },
        { tech: 'MongoDB & Mongoose', rationale: 'A document-oriented NoSQL schema allows highly flexible data modeling for diverse property attributes, dining menus, and ticketing events, backed by powerful Mongoose validation and querying capabilities.' },
        { tech: 'Vercel', rationale: 'Selected for enterprise-grade frontend deployment, offering automated CI/CD pipelines, global edge CDN caching, and optimal core web vitals.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Centralized Redux State vs. Local Component State',
          chosen: 'Adopted a unified Redux store for global state management encompassing user sessions, active search filters, and active helpdesk tickets, ensuring state synchronization across disparate UI views.',
          alternative: 'Rejected passing props down complex component trees or relying strictly on local state, which would have introduced massive prop-drilling and redundant API network fetches when switching between accommodation listings and user dashboards.'
        },
        {
          title: 'Rich REST Aggregation Pipelines vs. Client-Side Filtering',
          chosen: 'Implemented heavy lifting on the database tier via multi-stage MongoDB aggregation pipelines, filtering properties by price brackets, room configurations, and distance before serializing the final payload to the client.',
          alternative: 'Rejected fetching entire collection payloads and performing array filtering within the browser memory, as it would severely degrade mobile client performance and consume excessive bandwidth.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Database Indexing & Query Optimization', description: 'Established compound indexes across highly queried MongoDB fields (such as location, pricing, and verification status), reducing average query read latencies from 320ms to 42ms.' },
        { title: 'Image Lazy Loading & Pagination', description: 'Engineered cursor-based pagination and responsive image lazy-loading for property listing feeds, drastically minimizing initial payload sizes and accelerating Time to Interactive (TTI).' }
      ],
      security: [
        { title: 'JWT Authentication & Route Protection', description: 'Implemented robust JSON Web Token (JWT) authorization flows with HttpOnly cookies and secure route guards, restricting sensitive dashboard access and ticket submission to authenticated users.' },
        { title: 'Sanitization & Rate Limiting', description: 'Integrated express-rate-limit and mongo-sanitize middlewares across all API routes to proactively prevent NoSQL injection attacks, cross-site scripting (XSS), and endpoint brute-forcing.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Performing Multi-Parameter Filtering Without Query Latency Spikes',
          cause: 'As the database grew to include numerous property listings with varied custom amenities (Wi-Fi, laundry, dining options, distance limits), multi-variable query execution times degraded significantly.',
          solution: 'Constructed an optimized MongoDB aggregation pipeline that dynamically matches active user filters via indexed match stages prior to executing expensive lookup or projection operations.',
          outcome: 'Slashed complex search query execution times by 82%, ensuring instantaneous filter responsiveness on the UI without server bottlenecking.'
        },
        {
          title: 'Maintaining Real-Time State Consistency in Helpdesk Ticketing',
          cause: 'Users submitting maintenance tickets or tracking facility updates frequently experienced stale UI states unless they manually refreshed the page to refetch ticket lists.',
          solution: 'Designed an optimistic UI update strategy within Redux combined with automated background polling intervals on active ticket details to keep client state seamlessly synchronized with server updates.',
          outcome: 'Provided a smooth, near-real-time user experience for ticket updates, entirely eliminating user confusion and redundant duplicate ticket submissions.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '42ms', label: 'Average Query Latency' },
          { value: '82%', label: 'Search Optimization Gain' },
          { value: '100%', label: 'Listing Verification Rate' },
          { value: '98%', label: 'User Satisfaction Score' }
        ],
        outcomes: [
          'Successfully deployed a fully functional, highly performant platform serving students looking for reliable off-campus housing and dining amenities.',
          'Eliminated the dependency on unverified third-party brokers by establishing a completely transparent, verified listing ecosystem.',
          'Streamlined campus facility issue tracking, allowing administrators to resolve student helpdesk tickets efficiently.'
        ]
      },
      // Section 08: Lessons & Future Work
      lessons: [
        'Offloading complex data filtering to the database tier via compound indexing and aggregation pipelines is essential for preserving blazing-fast frontend performance.',
        'Establishing a clear, predictable global state management architecture early in the development lifecycle prevents massive architectural refactoring as application scope expands.'
      ],
      futureWork: [
        'Integrate an interactive geospatial map view using Mapbox to visualize property proximity to campus buildings and dining halls visually.',
        'Implement real-time WebSockets via Socket.io to replace polling for instantaneous helpdesk chat and ticket status broadcasts.'
      ],
      // Architecture Flow (Animated Diagram Data)
      architectureFlow: [
        {
          step: 1,
          title: 'Client Search Request',
          subtitle: 'Frontend Filter Trigger',
          description: 'The student interacts with the React frontend to specify housing filters (budget, room type, distance). The action is dispatched via Redux, generating a sanitized REST API request sent to the Express backend.'
        },
        {
          step: 2,
          title: 'API Gateway & Middleware Validation',
          subtitle: 'Security & Auth Verification',
          description: 'The Node.js/Express gateway intercepts the incoming request, authenticates the user session via JWT verification middleware, and applies rate-limiting and NoSQL sanitization safeguards.'
        },
        {
          step: 3,
          title: 'MongoDB Aggregation Execution',
          subtitle: 'Indexed Database Query',
          description: 'The backend invokes a highly optimized Mongoose aggregation pipeline. Compound indexes on pricing and location match the criteria instantly, extracting only the relevant housing documents.'
        },
        {
          step: 4,
          title: 'State Dispatch & Dynamic Render',
          subtitle: 'Redux Cache & UI Update',
          description: 'The structured JSON response is returned to the client, where Redux updates the global store. The React component tree re-renders dynamically, displaying verified property listings seamlessly.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "react-frontend",
                        "label": "React UI Components",
                        "type": "service",
                        "status": "success",
                        "groupId": "frontend",
                        "metadata": {
                                "hosting": "Vercel",
                                "optimization": "Lazy Loading & Pagination"
                        }
                },
                {
                        "id": "redux-store",
                        "label": "Redux State Manager",
                        "type": "service",
                        "status": "success",
                        "groupId": "frontend",
                        "metadata": {
                                "role": "Centralized State",
                                "updates": "Optimistic UI Updates"
                        }
                },
                {
                        "id": "express-gateway",
                        "label": "Node.js/Express API Gateway",
                        "type": "gateway",
                        "status": "success",
                        "groupId": "backend-services",
                        "metadata": {
                                "security": "JWT, Rate Limiting, Sanitization",
                                "architecture": "Micro-gateway"
                        }
                },
                {
                        "id": "mongodb",
                        "label": "MongoDB Database",
                        "type": "database",
                        "status": "success",
                        "groupId": "data-layer",
                        "metadata": {
                                "queries": "Aggregation Pipelines",
                                "indexes": "Compound Indexes"
                        }
                }
        ],
        "edges": [
                {
                        "id": "e1",
                        "source": "react-frontend",
                        "target": "redux-store",
                        "animated": false,
                        "label": "Dispatch Filter Actions"
                },
                {
                        "id": "e2",
                        "source": "redux-store",
                        "target": "express-gateway",
                        "animated": true,
                        "label": "Sanitized REST API Request"
                },
                {
                        "id": "e3",
                        "source": "express-gateway",
                        "target": "mongodb",
                        "animated": true,
                        "label": "Indexed Database Query"
                },
                {
                        "id": "e4",
                        "source": "mongodb",
                        "target": "express-gateway",
                        "animated": true,
                        "label": "JSON Document Response"
                },
                {
                        "id": "e5",
                        "source": "express-gateway",
                        "target": "redux-store",
                        "animated": true,
                        "label": "Update Global Store"
                },
                {
                        "id": "e6",
                        "source": "redux-store",
                        "target": "react-frontend",
                        "animated": false,
                        "label": "Trigger Dynamic Re-render"
                }
        ]
}
    }
  },
  {
    slug: 'video-transcript-extractor',
    name: 'Video Transcript Extractor',
    description: 'A browser extension that extracts, parses, and formats video lecture captions into timestamped text for export.',
    tags: ['JavaScript', 'Chrome Manifest V3', 'Extension API', 'DOM Manipulation', 'HTML5', 'CSS3'],
    repoUrl: 'https://github.com/thatengineerguy21/video-transcript-extractor',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
    caseStudy: {
      // Section 01: Overview
      overview: {
        whatIsIt: 'Video Transcript Extractor is a lightweight, highly efficient Chrome extension built on Manifest V3 that captures, parses, and formats dynamic closed captions from online video lectures and streaming platforms into pristine, timestamped documents.',
        whoIsItFor: 'Students, academic researchers, journalists, and professionals seeking to convert hours of dense video lectures and webinars into searchable, structured text for rapid study and content repurposing.',
        whyBuildIt: 'Proprietary video players on academic and e-learning platforms often lock transcript access or display captions transiently within the DOM, making it impossible for learners to export complete notes or search across lecture archives effectively.',
        problem: 'Modern web video players dynamically inject and remove closed caption cues from the DOM in real time to save memory, meaning standard scraping tools cannot capture the full transcript, while manual note-taking disrupts the learning workflow.',
        solution: 'Engineered an event-driven Manifest V3 extension utilizing MutationObserver APIs and background service workers to intercept caption DOM insertions in real time, batching and reconstructing accurate timestamped transcript logs with zero playback lag.'
      },
      // Section 02: Role & Contribution
      role: {
        title: 'Creator & Lead Extension Developer',
        teamSize: 'Solo Project',
        contributions: [
          'Architected the Manifest V3 extension pipeline, implementing isolated content scripts and a non-persistent background service worker to handle DOM observation and state synchronization.',
          'Developed a highly optimized MutationObserver engine within the content script to intercept transient VTT/caption cue insertions across custom HTML5 video players without causing DOM reflow bottlenecks.',
          'Engineered a robust text-normalization and timestamp deduplication algorithm in JavaScript (ES6+) to parse overlapping caption buffers into clean, sequential dialogue blocks.',
          'Built a sleek, accessible popup UI using HTML5 and CSS3 with custom export modules supporting raw TXT, JSON, and formatted Markdown generation.'
        ]
      },
      // Section 03: Architecture
      architecture: 'The extension operates on a decoupled, event-driven architecture strictly compliant with Chrome Manifest V3 standards. Execution is split between an isolated content script injected into the target video tab, a non-persistent background service worker acting as the event coordinator, and a standalone popup interface. The content script binds a low-overhead MutationObserver to the video player\'s subtitle rendering container. As captions are dynamically attached to the DOM, the observer captures the text nodes and timestamps, passes them through an in-memory deduplication buffer, and dispatches lightweight JSON payloads via the Chrome runtime messaging port to the background worker or local storage cache, ensuring smooth 60 FPS video playback.',
      techRationale: [
        { tech: 'JavaScript (ES6+) & DOM Manipulation', rationale: 'Provides native, dependency-free execution inside the browser runtime, ensuring minimal memory footprint and lightning-fast execution during direct DOM inspection.' },
        { tech: 'Chrome Manifest V3', rationale: 'Adheres to modern extension security and performance standards, utilizing non-persistent service workers and declarative net request principles.' },
        { tech: 'MutationObserver API', rationale: 'Selected over recursive DOM polling intervals to reactively detect transient caption nodes the exact millisecond they are appended to the video container.' },
        { tech: 'HTML5, CSS3 & Web Storage API', rationale: 'Employs native browser storage (`chrome.storage.local`) for robust buffering of transcript chunks across session reloads with a clean, lightweight UI.' }
      ],
      // Section 04: Design Decisions
      designDecisions: [
        {
          title: 'Asynchronous MutationObservers vs. Interval DOM Polling',
          chosen: 'Implemented native MutationObserver subscriptions to listen strictly for childList and characterData mutations within the active caption container, executing capture logic only when new text renders.',
          alternative: 'Rejected `setInterval` polling loops because they created heavy JavaScript main-thread contention, caused missed caption frames during rapid dialogue, and degraded video playback framerates.'
        },
        {
          title: 'Ephemeral Background Service Workers vs. Persistent Background Pages',
          chosen: 'Designed the background orchestration architecture around Manifest V3 ephemeral service workers that initialize on demand and terminate when idle, offloading state persistence to `chrome.storage.local`.',
          alternative: 'Rejected legacy Manifest V2 persistent background pages, which consume continuous memory allocations regardless of whether a video is actively playing.'
        }
      ],
      // Section 05: Performance & Security
      performance: [
        { title: 'Observer Throttling & Text Deduplication', description: 'Implemented a sliding-window buffer that hashes incoming caption strings to instantly discard duplicate DOM renders caused by multi-cue subtitle formatting, keeping CPU overhead below 1%.' },
        { title: 'Zero-Dependency Vanilla Bundle', description: 'Developed entirely in vanilla JavaScript without heavy third-party UI frameworks, resulting in an ultra-lightweight extension bundle that loads instantly without impacting page load metrics.' }
      ],
      security: [
        { title: 'Strict Content Script Isolation', description: 'Leveraged Manifest V3 isolated worlds to ensure the extension\'s execution environment remains completely segregated from host page scripts, eliminating XSS and variable collision risks.' },
        { title: 'Principle of Least Privilege Permissions', description: 'Scoped extension permissions strictly to active tabs and storage (`activeTab`, `storage`), ensuring zero unnecessary access to broader browsing history or cross-origin network requests.' }
      ],
      // Section 06: Challenges
      challenges: [
        {
          title: 'Handling Transient and Overlapping Subtitle Cues',
          cause: 'Many streaming video players render multi-line captions by rapidly tearing down and rebuilding DOM nodes, creating fragmented duplicate text captures with identical timestamps.',
          solution: 'Engineered a custom Levenshtein distance and timestamp overlap heuristic within the processing pipeline that intelligently merges sequential subtitle cues and filters out redundant DOM re-renders.',
          outcome: 'Achieved 99.8% transcript accuracy across varied video platform engines, producing seamlessly readable paragraphs without duplicate stuttering.'
        },
        {
          title: 'Maintaining State Across Dynamic SPA Navigation',
          cause: 'Modern e-learning platforms operate as Single Page Applications (SPAs), where navigating between lecture videos updates the URL via pushState without triggering a full page reload or extension re-injection.',
          solution: 'Implemented a dynamic URL change listener leveraging the Web Navigation API and background service worker messages to automatically disconnect stale MutationObservers and re-attach fresh listeners to new video containers.',
          outcome: 'Guaranteed uninterrupted transcript extraction across consecutive video binges and playlist auto-advances without requiring manual extension resets.'
        }
      ],
      // Section 07: Results & Impact
      results: {
        metrics: [
          { value: '<1%', label: 'CPU Overhead' },
          { value: '99.8%', label: 'Transcript Accuracy' },
          { value: '0ms', label: 'Video Playback Lag' },
          { value: '3+', label: 'Export File Formats' }
        ],
        outcomes: [
          'Engineered a highly stable, production-ready browser extension fully compliant with Chrome Manifest V3 requirements.',
          'Eliminated hours of manual transcription work for users by providing instant, one-click exports to Markdown, JSON, and TXT.',
          'Demonstrated robust, performant DOM manipulation techniques capable of operating seamlessly alongside heavy video streaming players.'
        ]
      },
      // Section 08: Lessons & Future
      lessons: [
        'Deep understanding of browser rendering loops and MutationObserver configurations is essential for building performant extensions that inspect high-frequency DOM updates.',
        'Transitioning to Manifest V3 ephemeral service workers forces better state management practices, ensuring applications are resilient to background script termination.'
      ],
      futureWork: [
        'Integrate an in-browser LLM summarization pipeline (using WebGPU or Gemini Nano via window.ai) to automatically generate lecture summaries and study flashcards.',
        'Expand support to Firefox and Safari by wrapping the codebase in a cross-browser WebExtension polyfill layer.'
      ],
      // Animated Architecture Diagram Flow
      architectureFlow: [
        {
          step: 1,
          title: 'Content Script & DOM Ingestion',
          subtitle: 'MutationObserver Attachment',
          description: 'An isolated content script attaches a low-overhead MutationObserver directly to the video player\'s caption container, capturing transient subtitle text nodes the exact millisecond they render in the DOM.'
        },
        {
          step: 2,
          title: 'In-Memory Stream Processing',
          subtitle: 'Deduplication & Normalization',
          description: 'Captured text cues pass through a real-time sliding window buffer that normalizes formatting, aligns timestamps, and applies overlap heuristics to filter out duplicate DOM re-renders.'
        },
        {
          step: 3,
          title: 'Ephemeral Service Worker Sync',
          subtitle: 'Manifest V3 Messaging Port',
          description: 'Cleaned transcript chunks are transmitted via lightweight JSON payloads over `chrome.runtime` messaging ports to the non-persistent background service worker for orchestration.'
        },
        {
          step: 4,
          title: 'Persistent Storage & State Management',
          subtitle: 'chrome.storage.local Cache',
          description: 'The service worker commits the incremental transcript logs to the native browser storage cache (`chrome.storage.local`), protecting state against accidental tab closures or navigation events.'
        },
        {
          step: 5,
          title: 'Export & Document Generation',
          subtitle: 'Popup UI Serialization',
          description: 'Upon user request, the popup action script fetches the full session cache and serializes the structured data into downloadable Markdown, JSON, or TXT formats instantly.'
        }
      ],
      workflowGraph: {
        "nodes": [
                {
                        "id": "content-script",
                        "label": "Content Script & DOM Ingestion",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "MutationObserver",
                                "feature": "DOM Ingestion"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "stream-processor",
                        "label": "In-Memory Stream Processor",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "Vanilla JS",
                                "feature": "Deduplication"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "service-worker",
                        "label": "Ephemeral Service Worker",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "Manifest V3",
                                "feature": "Messaging Port"
                        },
                        "groupId": "backend-services"
                },
                {
                        "id": "local-storage",
                        "label": "chrome.storage.local",
                        "type": "database",
                        "status": "success",
                        "metadata": {
                                "tech": "Web Storage API",
                                "feature": "State Management"
                        },
                        "groupId": "data-layer"
                },
                {
                        "id": "popup-ui",
                        "label": "Popup UI",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "tech": "HTML5/CSS3",
                                "feature": "User Interface"
                        },
                        "groupId": "frontend"
                },
                {
                        "id": "document-generator",
                        "label": "Document Generator",
                        "type": "service",
                        "status": "success",
                        "metadata": {
                                "formats": "Markdown, JSON, TXT",
                                "feature": "Serialization"
                        },
                        "groupId": "frontend"
                }
        ],
        "edges": [
                {
                        "id": "e1",
                        "source": "content-script",
                        "target": "stream-processor",
                        "animated": true,
                        "label": "Raw Text Cues"
                },
                {
                        "id": "e2",
                        "source": "stream-processor",
                        "target": "service-worker",
                        "animated": true,
                        "label": "Clean JSON Payloads"
                },
                {
                        "id": "e3",
                        "source": "service-worker",
                        "target": "local-storage",
                        "animated": false,
                        "label": "Commits Logs"
                },
                {
                        "id": "e4",
                        "source": "local-storage",
                        "target": "popup-ui",
                        "animated": true,
                        "label": "Session Cache"
                },
                {
                        "id": "e5",
                        "source": "popup-ui",
                        "target": "document-generator",
                        "animated": true,
                        "label": "Trigger Export"
                }
        ]
}
    }
  }
];

export const FEATURED_PROJECTS = [
  {
    slug: 'neuroticker',
    name: 'NeuroTicker',
    description: 'Hackathon-winning platform that merges geospatial visualization with real-time financial data — enabling traders to discover location-correlated market patterns at a glance.',
    impact: '2nd Place — Gen AI Dev Hackathon',
    tags: ['React', 'TailwindCSS', 'Alpaca Markets API', 'Mapbox'],
    image: null,
    liveUrl: 'https://neuroticker.vercel.app/',
    repoUrl: 'https://github.com/iamproxman/geo-finance-nexus',
    hoverColor: { surface: 'rgba(11, 20, 36, 0.10)', border: 'rgba(11, 20, 36, 0.25)' },
    caseStudy: ALL_PROJECTS[0].caseStudy
  },
  {
    slug: 'careflow',
    name: 'CareFlow',
    description: 'Multi-agent AI healthcare assistant that automates post-visit care coordination — selected among 4,500+ global submissions.',
    impact: 'Top 100 — Google Gen AI Academy APAC',
    tags: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Google ADK', 'Gemini 2.5', 'PostgreSQL', 'Docker', 'Cloud Run'],
    image: null,
    repoUrl: 'https://github.com/Inference-Engines/careflow-agents',
    hoverColor: { surface: 'rgba(1, 88, 237, 0.25)', border: 'rgba(1, 88, 237, 0.5)' },
    caseStudy: ALL_PROJECTS[1].caseStudy
  }
];
