import { useEffect, useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls,
  ControlButton,
  Background, 
  useNodesState, 
  useEdgesState, 
  useReactFlow 
} from '@xyflow/react';
import { Maximize } from 'lucide-react';
import WorkflowNode from './WorkflowNode';
import WorkflowGroupNode from './WorkflowGroupNode';
import WorkflowLayerCard from './WorkflowLayerCard';
import AnimatedPacketEdge from './AnimatedPacketEdge';
import { getLayoutedElements } from './layoutEngine';
import '@xyflow/react/dist/style.css';

// Memoized nodeTypes to prevent re-rendering issues in React Flow
const nodeTypes = {
  workflowNode: WorkflowNode,
  groupNode: WorkflowGroupNode,
  layerCard: WorkflowLayerCard,
};

const edgeTypes = {
  animatedPacket: AnimatedPacketEdge,
};

const ReactFlowInner = ({ 
  initialNodes = [], 
  initialEdges = [], 
  onNodeSelect = () => {}, 
  onPaneClick = () => {},
  layoutDirection = 'TB',
  fitViewTrigger = 0 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  // Re-calculate layout when initial nodes, edges, or layout direction changes
  useEffect(() => {
    if (initialNodes.length === 0) return;
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes, 
      initialEdges, 
      layoutDirection
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Fit view after layout computation
    setTimeout(() => {
      fitView({ padding: 0.25, duration: 800 });
    }, 100);
  }, [initialNodes, initialEdges, layoutDirection, setNodes, setEdges, fitView]);

  // Trigger fit view externally via toolbar button
  useEffect(() => {
    if (fitViewTrigger > 0) {
      fitView({ padding: 0.25, duration: 800 });
    }
  }, [fitViewTrigger, fitView]);

  // Toggle native full screen mode for the entire workflow graph
  const handleFullScreen = useCallback((e) => {
    const elem = e.currentTarget.closest('.workflow-graph-wrapper');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(event, node) => onNodeSelect(node)}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      minZoom={0.1}
      maxZoom={4}
      proOptions={{ hideAttribution: true }}
      // Nodes are positioned entirely by the dagre layout engine. Letting
      // people drag them around broke the layer-card bounding boxes and
      // made the diagram look randomly scattered, so dragging/connecting
      // is disabled — the graph stays exactly as laid out, always readable.
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={true}
      panOnDrag={true}
    >
      <Background color="var(--border-color, #ffffff)" gap={24} size={1.5} />
      <Controls showInteractive={false} showFitView={false}>
        <ControlButton onClick={handleFullScreen} title="Toggle Full Screen">
          <Maximize size={16} />
        </ControlButton>
      </Controls>
      <MiniMap 
        nodeStrokeColor="var(--border-color, rgba(255,255,255,0.2))"
        nodeColor={(node) => {
          if (node.type === 'groupNode') return 'rgba(15, 23, 42, 0.5)';
          if (node.data?.status === 'running') return '#3b82f6';
          if (node.data?.status === 'success') return '#10b981';
          if (node.data?.status === 'failed') return '#ef4444';
          return 'rgba(148, 163, 184, 0.5)';
        }}
        nodeBorderRadius={8}
      />
    </ReactFlow>
  );
};

export default ReactFlowInner;
