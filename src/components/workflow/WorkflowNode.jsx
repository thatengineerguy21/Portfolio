import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Database, 
  Server, 
  Globe, 
  Cpu, 
  Layers, 
  Box, 
  Key, 
  Clock, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { detectTechnology } from '../../utils/iconDetection';

const getTypeIcon = (type = '') => {
  const normalized = type.toLowerCase();
  if (normalized.includes('database') || normalized.includes('db') || normalized.includes('storage')) {
    return <Database size={16} />;
  }
  if (normalized.includes('service') || normalized.includes('worker') || normalized.includes('microservice')) {
    return <Server size={16} />;
  }
  if (normalized.includes('gateway') || normalized.includes('http') || normalized.includes('client') || normalized.includes('api')) {
    return <Globe size={16} />;
  }
  if (normalized.includes('agent') || normalized.includes('ai') || normalized.includes('llm') || normalized.includes('model')) {
    return <Cpu size={16} />;
  }
  if (normalized.includes('queue') || normalized.includes('topic') || normalized.includes('kafka') || normalized.includes('pipeline') || normalized.includes('etl')) {
    return <Layers size={16} />;
  }
  if (normalized.includes('auth') || normalized.includes('token') || normalized.includes('security') || normalized.includes('login')) {
    return <Key size={16} />;
  }
  return <Box size={16} />;
};

const getStatusBadge = (status = 'idle') => {
  switch (status.toLowerCase()) {
    case 'running':
      return (
        <span className="workflow-node-status status-running">
          <Loader2 size={12} className="animate-spin" />
          Running
        </span>
      );
    case 'success':
      return (
        <span className="workflow-node-status status-success">
          <CheckCircle2 size={12} />
          Success
        </span>
      );
    case 'failed':
    case 'error':
      return (
        <span className="workflow-node-status status-failed">
          <AlertCircle size={12} />
          Failed
        </span>
      );
    case 'idle':
    default:
      return (
        <span className="workflow-node-status status-idle">
          <Clock size={12} />
          Idle
        </span>
      );
  }
};

const WorkflowNode = ({ data, selected }) => {
  const { label, type, status, searchHighlight, metadata = {}, layoutDirection = 'TB' } = data;

  const targetPosition = layoutDirection === 'LR' ? Position.Left : Position.Top;
  const sourcePosition = layoutDirection === 'LR' ? Position.Right : Position.Bottom;

  let techMatch = detectTechnology(label);

  // Fallback to searching description and metadata entries if label has no recognizable tech
  if (!techMatch.technology && metadata) {
    if (metadata.description) {
      const descMatch = detectTechnology(metadata.description);
      if (descMatch.technology) techMatch = descMatch;
    }
    
    if (!techMatch.technology && metadata.entries && Array.isArray(metadata.entries)) {
      for (const entry of metadata.entries) {
        // We check both key and value just in case, but usually value holds the tech name
        const entryMatch = detectTechnology(`${entry.key} ${entry.value}`);
        if (entryMatch.technology) {
          techMatch = entryMatch;
          break;
        }
      }
    }
  }

  const renderIcon = () => {
    if (techMatch.iconLibrary === 'simple-icons' && techMatch.iconName) {
      return (
        <img 
          src={`https://cdn.simpleicons.org/${techMatch.iconName}`} 
          alt={techMatch.normalizedName} 
          style={{ width: 16, height: 16, objectFit: 'contain' }} 
        />
      );
    }
    return getTypeIcon(type);
  };

  return (
    <div 
      className={`workflow-node ${selected ? 'selected' : ''} ${searchHighlight ? 'search-highlight' : ''}`}
      data-cursor-hover
    >
      {/* Target Handle (Input) */}
      <Handle 
        type="target" 
        position={targetPosition} 
        isConnectable={false}
      />

      {/* Node Header */}
      <div className="workflow-node-header">
        <div className="workflow-node-title-group">
          <div className="workflow-node-icon">
            {renderIcon()}
          </div>
          <div className="workflow-node-label" title={label}>
            {label}
          </div>
        </div>
        {getStatusBadge(status)}
      </div>
      
      {/* Node Content */}
      <div className="workflow-node-type">
        {type || 'Custom Node'}
      </div>

      {/* Source Handle (Output) */}
      <Handle 
        type="source" 
        position={sourcePosition} 
        isConnectable={false}
      />
    </div>
  );
};

export default memo(WorkflowNode);
