import { ReactElement } from 'react';

export type NodeStatus = "idle" | "running" | "success" | "failed";

export interface WorkflowNode {
  id: string;
  label: string;
  type: string;
  status?: NodeStatus;
  metadata?: Record<string, any>;
  groupId?: string;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface WorkflowGraphProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

/**
 * A reusable workflow visualization component inspired by Prefect's flow graph.
 * Supports structured JSON data (nodes, edges, metadata), automatic DAG layout,
 * zoom/pan, metadata inspection panels, expand/collapse groups, execution path highlighting,
 * status indicator badges, animated edges, and light/dark themes.
 */
declare function WorkflowGraph(props: WorkflowGraphProps): ReactElement;

export default WorkflowGraph;
