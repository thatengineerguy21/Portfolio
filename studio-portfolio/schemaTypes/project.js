// studio/schemaTypes/project.js
// Schema for portfolio projects with full case study support

const workflowNodeFields = [
  { name: 'id', type: 'string', title: 'Node ID' },
  { name: 'label', type: 'string', title: 'Label' },
  { name: 'type', type: 'string', title: 'Node Type',
    options: { list: ['service', 'database', 'http-client', 'ai', 'gateway', 'agent', 'client', 'auth', 'queue', 'storage'] } },
  { name: 'status', type: 'string', title: 'Status',
    options: { list: ['success', 'running', 'error', 'idle'] } },
  { name: 'metadata', type: 'object', title: 'Metadata',
    fields: [
      { name: 'entries', type: 'array', title: 'Key-Value Pairs', of: [
        { type: 'object', fields: [
          { name: 'key', type: 'string', title: 'Key' },
          { name: 'value', type: 'string', title: 'Value' },
        ]}
      ]}
    ]
  },
  { name: 'groupId', type: 'string', title: 'Group ID' },
];

const workflowEdgeFields = [
  { name: 'id', type: 'string', title: 'Edge ID' },
  { name: 'source', type: 'string', title: 'Source Node ID' },
  { name: 'target', type: 'string', title: 'Target Node ID' },
  { name: 'animated', type: 'boolean', title: 'Animated?' },
  { name: 'label', type: 'string', title: 'Edge Label' },
];

const workflowGraphFields = [
  { name: 'nodes', type: 'array', title: 'Nodes',
    of: [{ type: 'object', fields: workflowNodeFields }] },
  { name: 'edges', type: 'array', title: 'Edges',
    of: [{ type: 'object', fields: workflowEdgeFields }] },
];

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'caseStudy', title: 'Case Study' },
    { name: 'architecture', title: 'Architecture & Flows' },
  ],
  fields: [
    // ── Basic Info ──
    { name: 'name', type: 'string', title: 'Project Name', group: 'basic',
      validation: (Rule) => Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', group: 'basic',
      options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'description', type: 'text', title: 'Description', group: 'basic' },
    { name: 'impact', type: 'string', title: 'Impact / Award', group: 'basic' },
    { name: 'tags', type: 'array', title: 'Tags', group: 'basic',
      of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'image', type: 'image', title: 'Project Image', group: 'basic',
      options: { hotspot: true } },
    { name: 'liveUrl', type: 'url', title: 'Live Demo URL', group: 'basic' },
    { name: 'repoUrl', type: 'url', title: 'GitHub Repo URL', group: 'basic' },
    { name: 'youtubeDemoUrl', type: 'url', title: 'YouTube Demo URL', group: 'basic' },
    { name: 'hackathonUrl', type: 'url', title: 'Hackathon URL', group: 'basic' },
    { name: 'bento', type: 'string', title: 'Bento Grid Size', group: 'basic',
      options: { list: ['wide', 'square', 'tall'] } },
    { name: 'isFeatured', type: 'boolean', title: 'Featured on Homepage?', group: 'basic',
      description: 'Toggle ON for projects that should appear in the homepage Featured Projects section.',
      initialValue: false },
    { name: 'featuredDescription', type: 'text', title: 'Featured Description (short)', group: 'basic',
      description: 'Shorter description used on the homepage card. Falls back to main description if empty.' },
    { name: 'featuredTags', type: 'array', title: 'Featured Tags (subset)', group: 'basic',
      of: [{ type: 'string' }], options: { layout: 'tags' },
      description: 'Shorter tag list for the homepage card. Falls back to full tags if empty.' },
    { name: 'hoverColor', type: 'object', title: 'Hover Colors', group: 'basic',
      fields: [
        { name: 'surface', type: 'string', title: 'Surface Color (rgba)' },
        { name: 'border', type: 'string', title: 'Border Color (rgba)' },
      ]},
    { name: 'sortOrder', type: 'number', title: 'Sort Order', group: 'basic',
      description: 'Lower numbers appear first. Use this to control display order.' },

    // ── Case Study ──
    { name: 'caseStudy', type: 'object', title: 'Case Study', group: 'caseStudy',
      fields: [
        // Overview
        { name: 'overview', type: 'object', title: 'Overview', fields: [
          { name: 'whatIsIt', type: 'text', title: 'What is it?' },
          { name: 'whoIsItFor', type: 'text', title: 'Who is it for?' },
          { name: 'whyBuildIt', type: 'text', title: 'Why build it?' },
          { name: 'problem', type: 'text', title: 'The Problem' },
          { name: 'solution', type: 'text', title: 'The Engineering Solution' },
        ]},
        // Role
        { name: 'role', type: 'object', title: 'Role & Contribution', fields: [
          { name: 'title', type: 'string', title: 'Role Title' },
          { name: 'teamSize', type: 'string', title: 'Team Size' },
          { name: 'contributions', type: 'array', title: 'Key Contributions',
            of: [{ type: 'string' }] },
        ]},
        // Architecture
        { name: 'architecture', type: 'text', title: 'Architecture Description' },
        // Tech Rationale
        { name: 'techRationale', type: 'array', title: 'Tech Stack Rationale',
          of: [{ type: 'object', fields: [
            { name: 'tech', type: 'string', title: 'Technology' },
            { name: 'rationale', type: 'text', title: 'Rationale' },
          ]}]},
        // Design Decisions
        { name: 'designDecisions', type: 'array', title: 'Design Decisions',
          of: [{ type: 'object', fields: [
            { name: 'title', type: 'string', title: 'Decision Title' },
            { name: 'chosen', type: 'text', title: 'Why Chosen' },
            { name: 'alternative', type: 'text', title: 'Alternative Rejected' },
          ]}]},
        // Performance
        { name: 'performance', type: 'array', title: 'Performance Optimizations',
          of: [{ type: 'object', fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ]}]},
        // Security
        { name: 'security', type: 'array', title: 'Security Controls',
          of: [{ type: 'object', fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ]}]},
        // Challenges
        { name: 'challenges', type: 'array', title: 'Engineering Challenges',
          of: [{ type: 'object', fields: [
            { name: 'title', type: 'string', title: 'Challenge Title' },
            { name: 'cause', type: 'text', title: 'Why It Happened' },
            { name: 'solution', type: 'text', title: 'Engineering Solution' },
            { name: 'outcome', type: 'text', title: 'Outcome' },
          ]}]},
        // Results
        { name: 'results', type: 'object', title: 'Results & Impact', fields: [
          { name: 'metrics', type: 'array', title: 'Metrics',
            of: [{ type: 'object', fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' },
            ]}]},
          { name: 'outcomes', type: 'array', title: 'Key Outcomes',
            of: [{ type: 'string' }] },
        ]},
        // Lessons & Future
        { name: 'lessons', type: 'array', title: 'Lessons Learned',
          of: [{ type: 'string' }] },
        { name: 'futureWork', type: 'array', title: 'Future Roadmap',
          of: [{ type: 'string' }] },
        
        // ── Architecture Visualizations ──
        { name: 'architectureFlow', type: 'array', title: 'Architecture Flow Steps',
          of: [{ type: 'object', fields: [
            { name: 'step', type: 'number', title: 'Step Number' },
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'description', type: 'text', title: 'Description' },
          ]}]},
        { name: 'workflowGraph', type: 'object', title: 'Main Workflow Graph',
          fields: workflowGraphFields },
        { name: 'workflows', type: 'array', title: 'Additional Architecture Views',
          of: [{ type: 'object', fields: [
            { name: 'id', type: 'string', title: 'Workflow ID' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'desc', type: 'string', title: 'Description' },
            { name: 'flow', type: 'object', title: 'Flow Data',
              fields: workflowGraphFields },
          ]}]},
      ]
    },

  ],
  preview: {
    select: { title: 'name', subtitle: 'impact', media: 'image' },
  },
};
