import dagre from 'dagre';

// These MUST match the fixed node box size defined in WorkflowTheme.css
// (.workflow-node { width: 300px; ... }). Nodes are a fixed size rather than
// content-sized specifically so the layout engine can reserve exact, correct
// space for every node — mismatched sizes here are what caused nodes and
// edges to visually overlap.
const NODE_WIDTH = 300;
const NODE_HEIGHT = 76;

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
    // Generous separation so edge labels (which sit mid-edge) and the
    // sibling-edge fan-out in AnimatedPacketEdge always have clear room
    // and never collide with neighboring nodes or edges.
    nodesep: 90,
    ranksep: 170,
    align: 'UL',
  });

  // Filter out layer cards for individual child layout computation
  const childNodes = nodes.filter(node => node.type !== 'layerCard');

  // Set nodes in dagre graph
  childNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // Set edges in dagre graph with label dimensions for collision avoidance and detour routing
  edges.forEach((edge) => {
    if (!edge.hidden) {
      const label = edge.label || edge.data?.label || '';
      const labelWidth = label ? Math.max(90, Math.min(260, label.length * 8 + 24)) : 0;
      const labelHeight = label ? 32 : 0;

      dagreGraph.setEdge(
        edge.source,
        edge.target,
        {
          weight: 1,
          width: labelWidth,
          height: labelHeight,
          labelpos: 'c',
        },
        edge.id
      );
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

    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: nodeWithPosition.y - NODE_HEIGHT / 2,
      },
    };
  });

  // Group edges to find siblings between the same source and target (bidirectional-aware)
  const edgeGroups = {};
  edges.forEach((edge) => {
    if (!edge.hidden) {
      const key = [edge.source, edge.target].sort().join('-');
      if (!edgeGroups[key]) edgeGroups[key] = [];
      edgeGroups[key].push(edge);
    }
  });

  const layoutedEdges = edges.map((edge) => {
    if (!edge.hidden) {
      const key = [edge.source, edge.target].sort().join('-');
      const group = edgeGroups[key] || [];
      const siblingIndex = group.findIndex(e => e.id === edge.id);

      const edgeData = dagreGraph.edge(edge.source, edge.target, edge.id);
      const points = edgeData?.points || [];
      const labelX = edgeData?.x;
      const labelY = edgeData?.y;
      
      return {
        ...edge,
        data: {
          ...edge.data,
          siblingIndex: siblingIndex >= 0 ? siblingIndex : 0,
          totalSiblings: group.length || 1,
          points,
          labelX,
          labelY,
        },
      };
    }
    return edge;
  });

  // Pass 2: Collision safety check for edge labels to guarantee no overlaps with nodes or other labels
  const placedLabels = [];
  layoutedEdges.forEach((edge) => {
    if (!edge.hidden && edge.data?.label && edge.data?.labelX != null && edge.data?.labelY != null) {
      let lx = edge.data.labelX;
      let ly = edge.data.labelY;
      const label = edge.data.label;
      const w = Math.max(90, Math.min(260, label.length * 8 + 24));
      const h = 32;

      let changed = true;
      let iterations = 0;
      while (changed && iterations < 5) {
        changed = false;
        iterations++;

        // 1. Ensure no overlap with any node bounding box
        for (const node of layoutedNodes) {
          if (node.type === 'layerCard') continue;
          const nx = node.position.x + NODE_WIDTH / 2;
          const ny = node.position.y + NODE_HEIGHT / 2;
          if (Math.abs(lx - nx) < (w + NODE_WIDTH) / 2 + 10 && Math.abs(ly - ny) < (h + NODE_HEIGHT) / 2 + 10) {
            if (direction === 'TB') {
              const shiftDir = lx >= nx ? 1 : -1;
              lx = nx + shiftDir * ((w + NODE_WIDTH) / 2 + 16);
            } else {
              const shiftDir = ly >= ny ? 1 : -1;
              ly = ny + shiftDir * ((h + NODE_HEIGHT) / 2 + 16);
            }
            changed = true;
          }
        }

        // 2. Ensure no overlap with previously placed labels
        for (const placed of placedLabels) {
          if (Math.abs(lx - placed.x) < (w + placed.w) / 2 + 8 && Math.abs(ly - placed.y) < (h + placed.h) / 2 + 8) {
            if (direction === 'TB') {
              lx += (w / 2 + 16) * (lx >= placed.x ? 1 : -1);
            } else {
              ly += (h / 2 + 12) * (ly >= placed.y ? 1 : -1);
            }
            changed = true;
          }
        }
      }

      edge.data.labelX = lx;
      edge.data.labelY = ly;
      placedLabels.push({ x: lx, y: ly, w, h });
    }
  });

  return { nodes: layoutedNodes, edges: layoutedEdges };
};
