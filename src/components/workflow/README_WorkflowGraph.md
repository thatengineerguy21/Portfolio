# WorkflowGraph — Reusable Workflow Visualization Component

A highly reusable, enterprise-grade workflow visualization component inspired by Prefect's flow graph. Designed to accept structured JSON data (`nodes`, `edges`, `metadata`) and dynamically render interactive execution graphs, request lifecycles, and system architectures across any React application.

---

## 🏗 Architecture

The project is decoupled into 6 distinct modular layers to ensure maintainability, scalability, and independence from specific business logic:

1. **Graph Component (`WorkflowGraph.jsx` / `WorkflowGraph.d.ts`)**: The clean, top-level API container. Manages active selection state, toolbar inputs (search, layout toggling, simulation), and renders the metadata side panel.
2. **Layout Engine (`layoutEngine.js`)**: Leverages `dagre` to automatically calculate optimal DAG positioning for top-to-bottom (`TB`) and left-to-right (`LR`) workflows.
3. **Data Adapter (`dataAdapter.js`)**: Converts clean public API data models into underlying React Flow structures, managing real-time search highlights, execution path tracking, simulation animations, and group node collapse mechanics.
4. **Renderer (`ReactFlowRenderer.jsx`)**: The abstract visualization canvas layer. Currently wraps React Flow (`@xyflow/react`) with custom Controls, Background, and MiniMap. Can be cleanly swapped for other rendering engines (e.g., Mermaid) in the future.
5. **Theme System (`WorkflowThemeContext.jsx`, `WorkflowTheme.css`)**: Implements premium glassmorphism styling, custom status indicator animations, and seamless Light/Dark theme switching.
6. **Custom Node Components (`WorkflowNode.jsx`, `WorkflowGroupNode.jsx`)**: Bespoke renderers featuring rich Lucide icons, status badges (`idle`, `running`, `success`, `failed`), and interactive handles.

---

## 📦 Clean Data Model (TypeScript Supported)

The component exposes a highly intuitive, structured API contract:

```ts
type NodeStatus = "idle" | "running" | "success" | "failed";

type Node = {
  id: string;
  label: string;
  type: string; // e.g., 'service', 'database', 'queue', 'gateway', 'agent', 'auth'
  status?: NodeStatus;
  metadata?: Record<string, any>;
  groupId?: string; // Optional ID for expand/collapse group containers
};

type Edge = {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
};

<WorkflowGraph nodes={nodes} edges={edges} />
```

---

## 🚀 Supported Use Cases

The component is agnostic to underlying business logic, natively supporting:
* **HTTP Request Lifecycle**: Inspecting headers, middleware validation, and controllers.
* **API Gateway → Services → Database**: Tracing multi-tier microservice routing and database queries.
* **Microservice Communication**: Visualizing asynchronous publish/subscribe events.
* **Authentication & Authorization Flow**: Detailing JWT exchange, OAuth verification, and identity assertion.
* **Event-Driven Architectures**: Mapping event buses, dead-letter queues, and lambda consumers.
* **Queue / Worker Pipelines**: Monitoring Celery, BullMQ, or Kafka producer/consumer ingestion.
* **AI Agent Workflows**: Tracing multi-agent orchestration, MCP server tools, and LLM synthesis loops.
* **ETL Pipelines**: Structuring data extraction, transformation rules, and warehouse loading.
* **Generic DAGs**: Arbitrary execution dependency trees.

---

## ✨ Enterprise Features

* **Interactive Graph**: Smooth click, drag, zoom, and pan mechanics.
* **Automatic Graph Layout**: Dynamically computes node positions via Dagre (Vertical or Horizontal).
* **Clickable Nodes with Metadata Panel**: A beautiful sliding side panel presenting execution status, node IDs, and fully inspectable JSON metadata payloads.
* **Expand / Collapse Groups**: Folders of nodes can be instantly collapsed to unclutter massive system diagrams.
* **Highlight Execution Path**: Clicking any node highlights its connected upstream and downstream edges with vibrant glowing paths.
* **Node Status Indicators**: Immersive badges (`idle`, `running`, `success`, `failed`) featuring custom CSS keyframe pulse animations.
* **Animated Edges**: Toggle "Simulate Flow" to visualize live data packet propagation across the entire graph.
* **Light / Dark Themes**: Fully synchronized with global application themes or toggleable standalone.
* **Search Nodes**: Instant real-time filtering and highlighting matching node titles, types, or status.
* **Mini-map**: Hardware-accelerated navigation mini-map for expansive graphs.

---

## 🔄 Swapping the Rendering Engine

Because `WorkflowGraph.jsx` delegates rendering entirely to `ReactFlowRenderer.jsx`, swapping the underlying visualization engine (e.g., to Mermaid or D3) is completely frictionless:
1. Create a new renderer component (e.g., `MermaidRenderer.jsx`).
2. Have `MermaidRenderer` receive `initialNodes` and `initialEdges` from `dataAdapter.js`.
3. Update `WorkflowGraph.jsx` to render `<MermaidRenderer />` instead of `<ReactFlowRenderer />`. The clean public API (`nodes`, `edges`) remains 100% unchanged!
