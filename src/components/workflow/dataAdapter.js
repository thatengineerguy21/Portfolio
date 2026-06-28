/**
 * Adapts clean WorkflowGraph API nodes and edges into React Flow format,
 * handling search highlighting, execution paths, simulation animation, and group toggling.
 *
 * @param {Array} rawNodes - Clean API nodes { id, label, type, status, metadata, groupId }
 * @param {Array} rawEdges - Clean API edges { from, to, label, animated }
 * @param {Array} flowSteps - Optional array of linear steps
 * @param {Object} options - { searchQuery, layoutDirection, simulateExecution, collapsedGroups, selectedNodeId, onToggleCollapse }
 * @returns {Object} { initialNodes, initialEdges }
 */
export const adaptWorkflowData = (rawNodes = [], rawEdges = [], flowSteps = [], options = {}) => {
  const {
    searchQuery = '',
    layoutDirection = 'TB',
    simulateExecution = false,
    collapsedGroups = {},
    selectedNodeId = null,
    onToggleCollapse = () => {},
  } = options;

  const initialNodes = [];
  const initialEdges = [];

  const query = searchQuery.toLowerCase().trim();

  // 0. Auto-generate linear flow if flowSteps provided but no rawNodes
  let finalRawNodes = [...rawNodes];
  let finalRawEdges = [...rawEdges];

  if (finalRawNodes.length === 0 && flowSteps.length > 0) {
    flowSteps.forEach((step, i) => {
      // Basic type inference
      let type = 'service';
      const text = `${step.title} ${step.subtitle}`.toLowerCase();
      if (text.includes('database') || text.includes('supabase') || text.includes('cache')) type = 'database';
      else if (text.includes('gateway') || text.includes('ingestion') || text.includes('client') || text.includes('api')) type = 'gateway';
      else if (text.includes('ai') || text.includes('groq') || text.includes('llama') || text.includes('gemini') || text.includes('agent')) type = 'ai';
      else if (text.includes('queue') || text.includes('kafka') || text.includes('sqs')) type = 'queue';
      else if (text.includes('auth') || text.includes('security') || text.includes('mcp')) type = 'auth';
      else if (text.includes('output') || text.includes('receipt') || text.includes('result')) type = 'output';

      finalRawNodes.push({
        id: `step-${i}`,
        label: step.title,
        type: type,
        metadata: {
          description: step.description,
          subtitle: step.subtitle,
          stepIndex: step.step || (i + 1)
        }
      });

      if (i > 0) {
        finalRawEdges.push({
          from: `step-${i - 1}`,
          to: `step-${i}`,
          animated: true
        });
      }
    });
  }

  // 1. First pass: Identify layers
  const layers = new Set();
  finalRawNodes.forEach(node => {
    if (node.groupId) {
      layers.add(node.groupId);
    }
  });

  // Create layer cards
  layers.forEach(layerId => {
    initialNodes.push({
      id: `layer-${layerId}`,
      type: 'layerCard',
      position: { x: 0, y: 0 },
      data: {
        id: layerId,
        label: layerId.replace('-', ' ').toUpperCase(),
      },
      style: {
        zIndex: -1, // Keep behind workflow nodes
      },
      selectable: false, // Prevents user from selecting it instead of nodes
      draggable: false, // Prevents accidental dragging of the background
    });
  });
  // 2. Second pass: Adapt all standard nodes
  finalRawNodes.forEach((node) => {
    // Check if node matches search query
    let searchHighlight = false;
    if (query) {
      const labelMatch = (node.label || '').toLowerCase().includes(query);
      const typeMatch = (node.type || '').toLowerCase().includes(query);
      const statusMatch = (node.status || '').toLowerCase().includes(query);
      searchHighlight = labelMatch || typeMatch || statusMatch;
    }

    // Check if node belongs to a collapsed group
    const isChildOfCollapsedGroup = node.groupId && collapsedGroups[node.groupId];

    if (node.type === 'groupNode') {
      return;
    } else {
      // Standard workflow custom node
      initialNodes.push({
        id: node.id,
        type: 'workflowNode',
        position: { x: 0, y: 0 }, // Handled by dagre layout engine
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          status: node.status || 'idle',
          metadata: node.metadata || {},
          searchHighlight,
          layoutDirection,
          layer: node.groupId || null, // Pass layer reference to node data
        },
      });
    }
  });

  // 3. Adapt all edges
  finalRawEdges.forEach((edge, index) => {
    const fromId = edge.from || edge.source;
    const toId = edge.to || edge.target;
    const edgeId = edge.id || `e-${fromId}-${toId}-${index}`;
    
    const sourceNode = finalRawNodes.find(n => n.id === fromId);
    const targetNode = finalRawNodes.find(n => n.id === toId);

    // No collapsed groups, so no edges are hidden
    const isHidden = false;

    // Check if edge is part of highlighted execution path (connected to selectedNodeId)
    const isExecutionPath = selectedNodeId && (fromId === selectedNodeId || toId === selectedNodeId);

    // Determine animation
    const isAnimated = simulateExecution || edge.animated || (sourceNode && sourceNode.status === 'running') || isExecutionPath;

    // Default vs Highlighted styling
    let strokeColor = 'rgba(148, 163, 184, 0.4)';
    let strokeWidth = 1.5;
    let filter = 'none';

    if (isExecutionPath) {
      strokeColor = '#3b82f6';
      strokeWidth = 2.5;
      filter = 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))';
    } else if (simulateExecution) {
      strokeColor = '#10b981';
      strokeWidth = 2;
      filter = 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))';
    }

    initialEdges.push({
      id: edgeId,
      source: fromId,
      target: toId,
      type: 'animatedPacket',
      label: edge.label || '',
      hidden: isHidden,
      animated: isAnimated,
      style: {
        stroke: strokeColor,
        strokeWidth,
        filter,
      },
      labelStyle: {
        fill: 'var(--text-main, #f8fafc)',
        fontSize: 11,
        fontWeight: 600,
      },
      data: {
        label: edge.label || '',
        isAnimated,
        packetColor: (sourceNode?.status === 'running' || isExecutionPath || simulateExecution) ? '#3b82f6' : '#00e68a'
      }
    });
  });

  return { initialNodes, initialEdges };
};
