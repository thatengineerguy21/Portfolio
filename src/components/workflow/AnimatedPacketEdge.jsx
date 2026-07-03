import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';

const getEdgeColor = (idString) => {
  let hash = 0;
  for (let i = 0; i < idString.length; i++) {
    hash = idString.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 85%, 65%)`;
};

const getOffsetPosition = (x, y, position, offset) => {
  switch (position) {
    case 'bottom': return { x, y: y + offset };
    case 'top': return { x, y: y - offset };
    case 'right': return { x: x + offset, y };
    case 'left': return { x: x - offset, y };
    default: return { x, y };
  }
};

const AnimatedPacketEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const siblingIndex = data?.siblingIndex || 0;
  const totalSiblings = data?.totalSiblings || 1;
  
  // Separation between sibling edges (px)
  const offsetDistance = 30; 
  const siblingOffset = (siblingIndex - (totalSiblings - 1) / 2) * offsetDistance;

  let shiftedSourceX = sourceX;
  let shiftedSourceY = sourceY;
  let shiftedTargetX = targetX;
  let shiftedTargetY = targetY;

  if (sourcePosition === 'left' || sourcePosition === 'right') {
    shiftedSourceY += siblingOffset;
    shiftedTargetY += siblingOffset;
  } else {
    shiftedSourceX += siblingOffset;
    shiftedTargetX += siblingOffset;
  }

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: shiftedSourceX,
    sourceY: shiftedSourceY,
    sourcePosition,
    targetX: shiftedTargetX,
    targetY: shiftedTargetY,
    targetPosition,
    borderRadius: 8,
  });

  // Calculate duration based on distance to make speed roughly constant
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.max(1, distance / 100);

  const edgeColor = getEdgeColor(id);
  const packetColor = edgeColor;
  const isAnimated = data?.isAnimated ?? true;
  
  const finalStyle = {
    ...style,
    stroke: edgeColor,
    strokeWidth: 2,
  };

  // Node distance offset to prevent start/end labels from overlapping nodes
  const nodeOffset = 45; 
  const startPos = getOffsetPosition(shiftedSourceX, shiftedSourceY, sourcePosition, nodeOffset);
  const endPos = getOffsetPosition(shiftedTargetX, shiftedTargetY, targetPosition, nodeOffset);

  // Apply collision-avoidance shift to the main central label
  let finalLabelX = labelX;
  let finalLabelY = labelY;

  if (data?.labelShift) {
    // 60 pixels shift per collision
    const shiftPx = data.labelShift * 60; 
    const isVerticalLayout = sourcePosition === 'bottom' || sourcePosition === 'top';
    
    if (isVerticalLayout) {
      // Middle segment is horizontal, shift X
      const maxShift = Math.max(0, (Math.abs(targetX - sourceX) / 2) - 20);
      if (maxShift > 0) {
        finalLabelX += Math.max(-maxShift, Math.min(maxShift, shiftPx));
      } else {
        // Fallback: line is perfectly vertical, shift Y
        finalLabelY += shiftPx;
      }
    } else {
      // Horizontal layout (LR), middle segment is vertical, shift Y
      const maxShift = Math.max(0, (Math.abs(targetY - sourceY) / 2) - 20);
      if (maxShift > 0) {
        finalLabelY += Math.max(-maxShift, Math.min(maxShift, shiftPx));
      } else {
        finalLabelX += shiftPx;
      }
    }
  }

  const renderLabel = (text, x, y) => (
    <div
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
        background: edgeColor.replace('hsl', 'hsla').replace(')', ', 0.1)'),
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 700,
        color: edgeColor,
        border: `1px solid ${edgeColor}`,
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
        boxShadow: `0 2px 8px ${edgeColor.replace('hsl', 'hsla').replace(')', ', 0.15)')}`,
      }}
      className="nodrag nopan"
    >
      {text}
    </div>
  );

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={finalStyle} />
      
      {isAnimated && (
        <>
          <circle r="4" fill={packetColor} filter={`drop-shadow(0 0 4px ${packetColor})`}>
            <animateMotion 
              dur={`${duration}s`} 
              repeatCount="indefinite" 
              path={edgePath} 
            />
          </circle>
          <circle r="2" fill="#ffffff" filter="drop-shadow(0 0 2px rgba(255,255,255,1))">
            <animateMotion 
              dur={`${duration}s`} 
              begin={`${duration * 0.15}s`}
              repeatCount="indefinite" 
              path={edgePath} 
            />
          </circle>
        </>
      )}

      {/* Render Labels conditionally */}
      {(data?.label || data?.startLabel || data?.endLabel) && (
        <EdgeLabelRenderer>
          {data.startLabel && renderLabel(data.startLabel, startPos.x, startPos.y)}
          {data.endLabel && renderLabel(data.endLabel, endPos.x, endPos.y)}
          {data.label && renderLabel(data.label, finalLabelX, finalLabelY)}
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default AnimatedPacketEdge;
