import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';

/**
 * Converts an array of Dagre waypoints [{ x, y }] into a smooth rounded SVG path string.
 * Uses quadratic bezier curves at bends for organic, clean corners.
 */
export function pointsToSvgPath(points, r = 12) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const dPrev = Math.hypot(curr.x - prev.x, curr.y - prev.y);
    const dNext = Math.hypot(next.x - curr.x, next.y - curr.y);

    const cross = (curr.x - prev.x) * (next.y - curr.y) - (curr.y - prev.y) * (next.x - curr.x);
    // Collinear or degenerate segment: keep straight line
    if (Math.abs(cross) < 1e-2 || dPrev < 1 || dNext < 1) {
      d += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    const radius = Math.min(r, dPrev / 2, dNext / 2);
    const beforeX = curr.x + ((prev.x - curr.x) / dPrev) * radius;
    const beforeY = curr.y + ((prev.y - curr.y) / dPrev) * radius;

    const afterX = curr.x + ((next.x - curr.x) / dNext) * radius;
    const afterY = curr.y + ((next.y - curr.y) / dNext) * radius;

    d += ` L ${beforeX} ${beforeY} Q ${curr.x} ${curr.y} ${afterX} ${afterY}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

const getPolylineLength = (points) => {
  if (!points || points.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
};

const getEdgeColor = (idString) => {
  let hash = 0;
  for (let i = 0; i < idString.length; i++) {
    hash = idString.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 85%, 65%)`;
};

const colorWithAlpha = (color, alpha = 0.15) => {
  if (!color) return `rgba(255, 255, 255, ${alpha})`;
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (color.startsWith('hsl')) {
    return color.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }
  return color;
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
  const hasPoints = Array.isArray(data?.points) && data.points.length >= 2;

  let edgePath = '';
  let finalLabelX = data?.labelX;
  let finalLabelY = data?.labelY;

  if (hasPoints) {
    // Route cleanly through Dagre's obstacle-avoiding waypoints
    edgePath = pointsToSvgPath(data.points, 12);
    if (finalLabelX == null || finalLabelY == null) {
      const midIdx = Math.floor(data.points.length / 2);
      finalLabelX = data.points[midIdx].x;
      finalLabelY = data.points[midIdx].y;
    }
  } else {
    // Fallback if points are not present (e.g. unlayouted dynamic state)
    const siblingIndex = data?.siblingIndex || 0;
    const totalSiblings = data?.totalSiblings || 1;
    const offsetDistance = 42; 
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

    const [fallbackPath, fallbackLabelX, fallbackLabelY] = getSmoothStepPath({
      sourceX: shiftedSourceX,
      sourceY: shiftedSourceY,
      sourcePosition,
      targetX: shiftedTargetX,
      targetY: shiftedTargetY,
      targetPosition,
      borderRadius: 12,
    });
    edgePath = fallbackPath;
    if (finalLabelX == null) finalLabelX = fallbackLabelX;
    if (finalLabelY == null) finalLabelY = fallbackLabelY;
  }

  // Calculate packet speed from actual polyline distance for uniform velocity
  const pathDistance = hasPoints
    ? getPolylineLength(data.points)
    : Math.hypot(targetX - sourceX, targetY - sourceY);
  const duration = Math.max(1.2, pathDistance / 120);

  // Status color (execution highlight / simulation) takes priority over hash color
  const edgeColor = data?.statusColor || getEdgeColor(id);
  const packetColor = edgeColor;
  const isAnimated = data?.isAnimated ?? true;
  
  const finalStyle = {
    ...style,
    stroke: edgeColor,
    strokeWidth: style.strokeWidth || 2,
  };

  // Node distance offset to prevent start/end labels from overlapping nodes
  const nodeOffset = 56;
  const startPos = hasPoints
    ? {
        x: data.points[0].x + (data.points[1].x - data.points[0].x) * 0.3,
        y: data.points[0].y + (data.points[1].y - data.points[0].y) * 0.3,
      }
    : getOffsetPosition(sourceX, sourceY, sourcePosition, nodeOffset);

  const lastIdx = hasPoints ? data.points.length - 1 : 0;
  const endPos = hasPoints
    ? {
        x: data.points[lastIdx].x + (data.points[lastIdx - 1].x - data.points[lastIdx].x) * 0.3,
        y: data.points[lastIdx].y + (data.points[lastIdx - 1].y - data.points[lastIdx].y) * 0.3,
      }
    : getOffsetPosition(targetX, targetY, targetPosition, nodeOffset);

  const renderLabel = (text, x, y) => (
    <div
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${x}px,${y}px)`,
        background: '#0a0d14',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 600,
        color: edgeColor,
        border: `1px solid ${edgeColor}`,
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
        boxShadow: `0 2px 10px rgba(0, 0, 0, 0.6), 0 0 8px ${colorWithAlpha(edgeColor, 0.25)}`,
        whiteSpace: 'nowrap',
        zIndex: 10,
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
