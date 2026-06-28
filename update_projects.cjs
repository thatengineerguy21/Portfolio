const fs = require('fs');

const graphs = {
  "portfolio": {
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
  },
  "weather-intelligence": {
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
  },
  "unihelp": {
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
  },
  "video-transcript-extractor": {
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
  },
  "careflow": {
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
  },
  "jal-sanket": {
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
  },
  "off-duty": {
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
  },
  "stackoverflow-intelligence": {
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
  },
  "jd-skills-extractor": {
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
  },
  "neuroticker": {
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
};

let content = fs.readFileSync('D:/Code/Portfolio/Portfolio/src/data/projects.js', 'utf-8');

for (const [slug, graph] of Object.entries(graphs)) {
  const slugPattern = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?architectureFlow:\\s*\\[[\\s\\S]*?\\])(,?)`);
  
  if (content.match(slugPattern)) {
    const replacement = `$1,\n      workflowGraph: ${JSON.stringify(graph, null, 8)}`;
    content = content.replace(slugPattern, replacement);
  } else {
    console.log("Could not find slug match for " + slug);
  }
}

fs.writeFileSync('D:/Code/Portfolio/Portfolio/src/data/projects.js', content, 'utf-8');
console.log("Updated projects.js with available graphs");
