import dagre from 'dagre';

/**
 * Automatically calculates positions for nodes using Dagre DAG layout engine.
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @param {string} direction - 'TB' (Top-to-Bottom) or 'LR' (Left-to-Right)
 * @returns {Object} { nodes, edges } with updated positions
 */
export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
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
      dagreGraph.setEdge(edge.source, edge.target);
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

  return { nodes: layoutedNodes, edges };
};
