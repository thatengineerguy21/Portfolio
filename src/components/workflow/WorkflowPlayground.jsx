import { useState, useEffect } from 'react';
import WorkflowGraph from './WorkflowGraph';
import * as LucideIcons from 'lucide-react';
import { 
  restRequestFlow, 
  microservicesFlow, 
  aiAgentFlow, 
  queueProcessingFlow, 
  authFlow 
} from './workflowExamples';

const PREDEFINED_EXAMPLES = {
  'rest': { id: 'rest', label: 'REST Request Lifecycle', icon: 'Globe', flow: restRequestFlow, desc: 'HTTP request journey through DNS, Load Balancers, API Gateways, Auth Middlewares, and Cache/DB tiers.' },
  'microservices': { id: 'microservices', label: 'Microservices (Event-Driven)', icon: 'Server', flow: microservicesFlow, desc: 'Asynchronous event publishing and downstream consumers communicating over a Kafka Event Bus.' },
  'ai-agent': { id: 'ai-agent', label: 'AI Agent Workflow', icon: 'Cpu', flow: aiAgentFlow, desc: 'Agent squad orchestration, tool calling via MCP servers, Vector DB RAG retrieval, and artifact synthesis.' },
  'queue': { id: 'queue', label: 'Queue / Worker Pipelines', icon: 'Layers', flow: queueProcessingFlow, desc: 'AWS SQS background worker processing, error handling, Dead Letter Queue (DLQ) routing, and S3 persistence.' },
  'auth': { id: 'auth', label: 'Authentication & Authorization', icon: 'Key', flow: authFlow, desc: 'Secure JWT exchange, multi-factor Identity Provider authentication, backchannel token minting, and session store.' },
};

const WorkflowPlayground = ({ workflows = [] }) => {
  const displayWorkflows = workflows.map(wf => {
    if (typeof wf === 'string') {
      return PREDEFINED_EXAMPLES[wf] || null;
    }
    return wf;
  }).filter(Boolean);

  const [activeTab, setActiveTab] = useState(displayWorkflows.length > 0 ? displayWorkflows[0].id : null);

  useEffect(() => {
    if (displayWorkflows.length > 0 && !displayWorkflows.find(w => w.id === activeTab)) {
      setActiveTab(displayWorkflows[0].id);
    }
  }, [workflows, activeTab]);

  if (!displayWorkflows || displayWorkflows.length === 0) return null;

  const selectedExample = displayWorkflows.find(ex => ex.id === activeTab) || displayWorkflows[0];

  return (
    <div className="workflow-playground-container" style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="workflow-playground-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.1))', paddingBottom: '1rem' }}>
        {displayWorkflows.map((ex) => {
          const Icon = LucideIcons[ex.icon] || LucideIcons.Layers;
          const isActive = ex.id === activeTab;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveTab(ex.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                border: isActive ? '1px solid var(--accent, #3b82f6)' : '1px solid var(--border-color, rgba(255,255,255,0.1))',
                background: isActive ? 'var(--bg-active, rgba(59, 130, 246, 0.15))' : 'var(--bg-surface, rgba(255,255,255,0.05))',
                color: isActive ? 'var(--accent, #3b82f6)' : 'var(--text-main, #f8fafc)',
                fontWeight: isActive ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem',
              }}
              data-cursor-hover
            >
              <Icon size={16} />
              <span>{ex.label}</span>
            </button>
          );
        })}
      </div>

      {selectedExample.desc && (
        <div className="workflow-playground-desc" style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.95rem', fontStyle: 'italic', padding: '0 0.5rem' }}>
          {selectedExample.desc}
        </div>
      )}

      <div style={{ height: '650px', width: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <WorkflowGraph 
          nodes={selectedExample.flow?.nodes || selectedExample.nodes} 
          edges={selectedExample.flow?.edges || selectedExample.edges} 
          flowSteps={selectedExample.flowSteps}
        />
      </div>
    </div>
  );
};

export default WorkflowPlayground;
