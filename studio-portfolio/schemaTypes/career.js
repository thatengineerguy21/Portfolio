// studio/schemaTypes/career.js
export default {
  name: 'career',
  title: 'Career Entry',
  type: 'document',
  fields: [
    { name: 'role', type: 'string', title: 'Role / Position',
      validation: (Rule) => Rule.required() },
    { name: 'company', type: 'string', title: 'Company' },
    { name: 'date', type: 'string', title: 'Date Range' },
    { name: 'description', type: 'array', title: 'Description Points',
      of: [{ type: 'text' }] },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'hoverColor', type: 'object', title: 'Hover Colors', fields: [
      { name: 'surface', type: 'string', title: 'Surface' },
      { name: 'border', type: 'string', title: 'Border' },
    ]},
  ],
  preview: {
    select: { title: 'role', subtitle: 'company' },
  },
};
