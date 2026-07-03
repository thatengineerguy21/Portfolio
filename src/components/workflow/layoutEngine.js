import dagre from 'dagre';

/**
 * Automatically calculates positions for nodes using Dagre DAG layout engine.
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @param {string} direction - 'TB' (Top-to-Bottom) or 'LR' (Left-to-Right)
 * @returns {Object} { nodes, edges } with updated positions
 */
export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph({ multigraph: true });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ 
    rankdir: direction, 
    nodesep: 60, 
    ranksep: 100, 
    align: 'UL' 
  });

  // Filter out layer cards for individual child layout computation
  const childNodes = nodes.filter(node => node.type !== 'layerCard');

  // Set nodes in dagre graph
  childNodes.forEach((node) => {
    const width = 260;
    const height = 60;
    dagreGraph.setNode(node.id, { width, height });
  });

  // Set edges in dagre graph
  edges.forEach((edge) => {
    if (!edge.hidden) {
      dagreGraph.setEdge(edge.source, edge.target, { weight: 1 }, edge.id);
    }
  });

  // Execute layout calculation
  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    if (node.type === 'layerCard') {
      return node;
    }

    const nodeWithPosition = dagreGraph.node(node.id);
    if (!nodeWithPosition) return node;

    const width = 260;
    const height = 60;

    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  // Group edges to find siblings between the same source and target
  const edgeGroups = {};
  edges.forEach((edge) => {
    if (!edge.hidden) {
      // Create a unique key for the edge's direction (or bidirectional)
      // If you want bidirectional edges to also separate, you can sort source and target:
      // const key = [edge.source, edge.target].sort().join('-');
      const key = `${edge.source}-${edge.target}`;
      if (!edgeGroups[key]) edgeGroups[key] = [];
      edgeGroups[key].push(edge);
    }
  });

  const layoutedEdges = edges.map((edge) => {
    if (!edge.hidden) {
      const key = `${edge.source}-${edge.target}`;
      const group = edgeGroups[key] || [];
      const siblingIndex = group.findIndex(e => e.id === edge.id);
      
      return {
        ...edge,
        data: {
          ...edge.data,
          siblingIndex: siblingIndex >= 0 ? siblingIndex : 0,
          totalSiblings: group.length || 1,
        },
      };
    }
    return edge;
  });

  // Pass 2: Detect median collisions (non-sibling edges crossing at same midpoint)
  const edgeMidpoints = layoutedEdges.map(edge => {
    const sNode = layoutedNodes.find(n => n.id === edge.source);
    const tNode = layoutedNodes.find(n => n.id === edge.target);
    if (!sNode || !tNode) return null;
    return {
      edge,
      midX: (sNode.position.x + tNode.position.x) / 2,
      midY: (sNode.position.y + tNode.position.y) / 2
    };
  }).filter(Boolean);

  edgeMidpoints.forEach((curr, i) => {
    let overlapCount = 0;
    for (let j = 0; j < i; j++) {
      const other = edgeMidpoints[j];
      // Check for overlap in a 30px radius. (Ignore if they are siblings, as siblings are handled by Fan-Out)
      const isSibling = curr.edge.source === other.edge.source && curr.edge.target === other.edge.target;
      if (!isSibling && Math.abs(curr.midX - other.midX) < 30 && Math.abs(curr.midY - other.midY) < 30) {
        overlapCount++;
      }
    }
    
    // Assign labelShift (0, 1, -1, 2, -2...)
    if (overlapCount > 0) {
       const shiftMag = Math.ceil(overlapCount / 2);
       const shiftSign = overlapCount % 2 === 1 ? 1 : -1;
       curr.edge.data.labelShift = shiftMag * shiftSign;
    } else {
       curr.edge.data.labelShift = 0;
    }
  });

  return { nodes: layoutedNodes, edges: layoutedEdges };
};
