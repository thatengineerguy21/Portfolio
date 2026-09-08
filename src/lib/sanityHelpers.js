/**
 * Utility functions for transforming Sanity CMS data back to the
 * format expected by existing React components.
 */

/**
 * Convert a Sanity key-value array back to a plain object.
 * Sanity stores workflow node metadata as [{key, value}] because
 * it can't have freeform object keys. This reverses that.
 *
 * @param {Array<{key: string, value: string}>} entries
 * @returns {Object}
 */
export function kvToObject(entries = []) {
  return Object.fromEntries(entries.map(({ key, value }) => [key, value]))
}

/**
 * Fix workflow graph data from Sanity format to the format expected
 * by the WorkflowGraph component. Converts metadata entries arrays
 * back to plain objects on each node.
 *
 * @param {Object} graph - { nodes: [], edges: [] }
 * @returns {Object} - Graph with metadata restored to object format
 */
export function fixWorkflowMetadata(graph) {
  if (!graph) return graph
  return {
    ...graph,
    nodes: (graph.nodes || []).map((node) => ({
      ...node,
      metadata: node.metadata?.entries
        ? kvToObject(node.metadata.entries)
        : node.metadata || {},
    })),
  }
}

/**
 * Fix all workflow flows in a project's case study.
 * Handles workflowGraph and workflows[].flow.
 *
 * @param {Object} project - Full project document from Sanity
 * @returns {Object} - Project with all workflow metadata fixed
 */
export function fixProjectWorkflows(project) {
  if (!project) return project

  const fixed = { ...project }

  // Fix top-level or caseStudy workflowGraph
  if (fixed.workflowGraph) {
    fixed.workflowGraph = fixWorkflowMetadata(fixed.workflowGraph)
  }
  if (fixed.caseStudy?.workflowGraph) {
    fixed.caseStudy = {
      ...fixed.caseStudy,
      workflowGraph: fixWorkflowMetadata(fixed.caseStudy.workflowGraph)
    }
  }

  // Fix top-level or caseStudy workflows
  if (fixed.workflows) {
    fixed.workflows = fixed.workflows.map((wf) => ({
      ...wf,
      flow: fixWorkflowMetadata(wf.flow),
    }))
  }
  if (fixed.caseStudy?.workflows) {
    fixed.caseStudy = {
      ...fixed.caseStudy,
      workflows: fixed.caseStudy.workflows.map((wf) => ({
        ...wf,
        flow: fixWorkflowMetadata(wf.flow),
      }))
    }
  }

  return fixed
}
