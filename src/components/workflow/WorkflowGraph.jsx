import { useState, useCallback, useMemo } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { 
  Search, 
  Workflow, 
  Activity, 
  Maximize2, 
  X, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import ReactFlowRenderer from './ReactFlowRenderer';
import { adaptWorkflowData } from './dataAdapter';
import { WorkflowThemeProvider, useWorkflowTheme } from './WorkflowThemeContext';
import './WorkflowTheme.css';

const getStatusBadge = (status = 'idle') => {
  switch (status.toLowerCase()) {
    case 'running':
      return (
        <span className="workflow-node-status status-running" style={{ display: 'inline-flex' }}>
          <Loader2 size={12} className="animate-spin" />
          Running
        </span>
      );
    case 'success':
      return (
        <span className="workflow-node-status status-success" style={{ display: 'inline-flex' }}>
          <CheckCircle2 size={12} />
          Success
        </span>
      );
    case 'failed':
    case 'error':
      return (
        <span className="workflow-node-status status-failed" style={{ display: 'inline-flex' }}>
          <AlertCircle size={12} />
          Failed
        </span>
      );
    case 'idle':
    default:
      return (
        <span className="workflow-node-status status-idle" style={{ display: 'inline-flex' }}>
          <Clock size={12} />
          Idle
        </span>
      );
  }
};

const WorkflowGraphContent = ({ nodes = [], edges = [], flowSteps = [] }) => {
  const { theme, toggleTheme } = useWorkflowTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutDirection, setLayoutDirection] = useState('TB');
  const [simulateExecution, setSimulateExecution] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [fitViewTrigger, setFitViewTrigger] = useState(0);

  // Toggle group collapse state
  const handleToggleCollapse = useCallback((groupId) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  }, []);

  // Adapt clean API data to React Flow elements
  const { initialNodes, initialEdges } = useMemo(() => {
    return adaptWorkflowData(nodes, edges, flowSteps, {
      searchQuery,
      layoutDirection,
      simulateExecution,
      collapsedGroups,
      selectedNodeId: selectedNode?.data?.id || null,
      onToggleCollapse: handleToggleCollapse,
    });
  }, [nodes, edges, flowSteps, searchQuery, layoutDirection, simulateExecution, collapsedGroups, selectedNode, handleToggleCollapse]);

  const handleNodeSelect = useCallback((node) => {
    if (node.type === 'groupNode') return;
    setSelectedNode(node);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className={`workflow-graph-wrapper theme-${theme}`}>
      {/* Top Toolbar */}
      <div className="workflow-toolbar" style={{ justifyContent: 'flex-end' }}>


        {/* Right: Feature Toggles & Controls */}
        <div className="workflow-toolbar-group">
          <button 
            className={`workflow-btn ${layoutDirection === 'LR' ? 'active' : ''}`}
            onClick={() => setLayoutDirection(prev => prev === 'TB' ? 'LR' : 'TB')}
            title="Toggle Layout Direction (TB / LR)"
            data-cursor-hover
          >
            <Workflow size={15} />
            <span>{layoutDirection === 'TB' ? 'Vertical' : 'Horizontal'}</span>
          </button>

          <button 
            className={`workflow-btn ${simulateExecution ? 'active' : ''}`}
            onClick={() => setSimulateExecution(prev => !prev)}
            title="Simulate Active Execution Flow"
            data-cursor-hover
          >
            <Activity size={15} />
            <span>Simulate Flow</span>
          </button>

          <button 
            className="workflow-btn" 
            onClick={() => setFitViewTrigger(prev => prev + 1)}
            title="Fit View to Screen"
            data-cursor-hover
          >
            <Maximize2 size={15} />
            <span>Fit View</span>
          </button>
        </div>
      </div>

      {/* React Flow Inner Canvas */}
      <ReactFlowProvider>
        <ReactFlowRenderer 
          initialNodes={initialNodes} 
          initialEdges={initialEdges}
          onNodeSelect={handleNodeSelect}
          onPaneClick={handlePaneClick}
          layoutDirection={layoutDirection}
          fitViewTrigger={fitViewTrigger}
        />
      </ReactFlowProvider>

      {/* Right Metadata Side Panel (Prefect Inspired) */}
      <div className={`workflow-metadata-panel ${selectedNode ? 'open' : ''}`}>
        {selectedNode && (
          <>
            <div className="workflow-panel-header">
              <div className="workflow-panel-title">
                {selectedNode.data?.label || 'Node Metadata'}
              </div>
              <button 
                className="workflow-panel-close" 
                onClick={() => setSelectedNode(null)}
                title="Close Panel"
                data-cursor-hover
              >
                <X size={18} />
              </button>
            </div>

            <div className="workflow-panel-body">
              <div className="workflow-panel-section">
                <span className="workflow-panel-label">Execution Status</span>
                <div>{getStatusBadge(selectedNode.data?.status)}</div>
              </div>

              <div className="workflow-panel-section">
                <span className="workflow-panel-label">Node Type</span>
                <span className="workflow-panel-value" style={{ textTransform: 'capitalize', fontWeight: '600' }}>
                  {selectedNode.data?.type || 'Standard'}
                </span>
              </div>

              <div className="workflow-panel-section">
                <span className="workflow-panel-label">Node ID</span>
                <span className="workflow-panel-value" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {selectedNode.data?.id}
                </span>
              </div>

              <div className="workflow-panel-section">
                <span className="workflow-panel-label">Metadata Payload</span>
                <pre className="workflow-metadata-json">
                  {JSON.stringify(selectedNode.data?.metadata || {}, null, 2)}
                </pre>
              </div>

              {selectedNode.data?.metadata?.description && (
                <div className="workflow-panel-section">
                  <span className="workflow-panel-label">Description</span>
                  <span className="workflow-panel-value" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {selectedNode.data.metadata.description}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WorkflowGraph = ({ nodes = [], edges = [], flowSteps = [] }) => {
  return (
    <WorkflowThemeProvider>
      <WorkflowGraphContent nodes={nodes} edges={edges} flowSteps={flowSteps} />
    </WorkflowThemeProvider>
  );
};

export default WorkflowGraph;
