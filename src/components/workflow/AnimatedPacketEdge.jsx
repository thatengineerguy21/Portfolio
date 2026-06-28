import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';

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
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate duration based on distance to make speed roughly constant
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.max(1, distance / 100); // 1 second per 100px

  const packetColor = data?.packetColor || '#00e68a';
  const isAnimated = data?.isAnimated ?? true;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      
      {isAnimated && (
        <>
          {/* We use standard SVG elements for the edge packet animation.
              A circle acts as the packet, and animateMotion moves it along the edgePath. */}
          <circle r="4" fill={packetColor} filter="drop-shadow(0 0 4px rgba(0,230,138,0.8))">
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

      {/* Optional Edge Label */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceX + dx/2}px,${sourceY + dy/2}px)`,
              background: 'var(--bg-panel, #121928)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--text-main, #f8fafc)',
              border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
              pointerEvents: 'none',
            }}
            className="nodrag nopan"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default AnimatedPacketEdge;
