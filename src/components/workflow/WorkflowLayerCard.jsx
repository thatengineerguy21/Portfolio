import { memo, useEffect } from 'react';
import { useNodes, useReactFlow } from '@xyflow/react';
import { Layers } from 'lucide-react';

const PADDING = 40;

const WorkflowLayerCard = ({ id, data }) => {
  const nodes = useNodes();
  const { setNodes } = useReactFlow();
  
  // Find all standard nodes that belong to this layer
  const layerNodes = nodes.filter(n => n.data?.layer === data.id && n.id !== id && !n.hidden);
  
  // If no nodes, we just render empty with 0 size (or default)
  if (layerNodes.length === 0) return null;
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  layerNodes.forEach(child => {
    const x = child.position.x;
    const y = child.position.y;
    // Fallbacks if not yet measured
    const w = child.measured?.width || 260;
    const h = child.measured?.height || 60;
    
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + w);
    maxY = Math.max(maxY, y + h);
  });
  
  const targetX = minX - PADDING;
  const targetY = minY - PADDING;
  const targetW = (maxX - minX) + PADDING * 2;
  const targetH = (maxY - minY) + PADDING * 2;
  
  // Dynamically update this node's bounds in the React Flow store
  useEffect(() => {
    if (minX === Infinity) return;
    
    setNodes(nds => {
      let changed = false;
      const updatedNodes = nds.map(n => {
        if (n.id === id) {
          const currentX = n.position.x;
          const currentY = n.position.y;
          const currentW = n.style?.width;
          const currentH = n.style?.height;
          
          if (
            Math.abs(currentX - targetX) > 1 || 
            Math.abs(currentY - targetY) > 1 || 
            currentW !== targetW || 
            currentH !== targetH
          ) {
            changed = true;
            return {
              ...n,
              position: { x: targetX, y: targetY },
              style: { ...n.style, width: targetW, height: targetH }
            };
          }
        }
        return n;
      });
      return changed ? updatedNodes : nds;
    });
  }, [targetX, targetY, targetW, targetH, id, setNodes, minX]);

  // Premium colors mapping
  const colors = {
    'frontend': 'rgba(59, 130, 246, 0.05)',
    'backend-services': 'rgba(16, 185, 129, 0.05)',
    'data-layer': 'rgba(139, 92, 246, 0.05)',
    'ai-agents': 'rgba(245, 158, 11, 0.05)',
    'external-api': 'rgba(236, 72, 153, 0.05)',
    'mcp-servers': 'rgba(236, 72, 153, 0.05)',
  };
  
  const borderColors = {
    'frontend': 'rgba(59, 130, 246, 0.4)',
    'backend-services': 'rgba(16, 185, 129, 0.4)',
    'data-layer': 'rgba(139, 92, 246, 0.4)',
    'ai-agents': 'rgba(245, 158, 11, 0.4)',
    'external-api': 'rgba(236, 72, 153, 0.4)',
    'mcp-servers': 'rgba(236, 72, 153, 0.4)',
  };

  const textColors = {
    'frontend': 'rgba(96, 165, 250, 1)',
    'backend-services': 'rgba(52, 211, 153, 1)',
    'data-layer': 'rgba(167, 139, 250, 1)',
    'ai-agents': 'rgba(251, 191, 36, 1)',
    'external-api': 'rgba(244, 114, 182, 1)',
    'mcp-servers': 'rgba(244, 114, 182, 1)',
  };

  const bg = colors[data.id] || 'rgba(100, 116, 139, 0.05)';
  const border = borderColors[data.id] || 'rgba(148, 163, 184, 0.4)';
  const textColor = textColors[data.id] || 'rgba(203, 213, 225, 1)';

  return (
    <div 
      className="workflow-layer-card" 
      style={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: bg,
        borderColor: border,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '16px',
        boxSizing: 'border-box',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
    >
      <div 
        className="workflow-layer-header" 
        style={{ 
          position: 'absolute',
          top: '-32px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.25rem 1rem',
          backgroundColor: '#000000',
          border: '1px solid',
          borderColor: border,
          borderBottom: 'none',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          color: textColor,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
        }}
      >
        <Layers size={14} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {data.label}
        </span>
      </div>
    </div>
  );
};

export default memo(WorkflowLayerCard);
