// studio/schemaTypes/por.js
export default {
  name: 'por',
  title: 'Position of Responsibility',
  type: 'document',
  fields: [
    { name: 'role', type: 'string', title: 'Role',
      validation: (Rule) => Rule.required() },
    { name: 'organization', type: 'string', title: 'Organization' },
    { name: 'date', type: 'string', title: 'Date Range' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'hoverColor', type: 'object', title: 'Hover Colors', fields: [
      { name: 'surface', type: 'string', title: 'Surface' },
      { name: 'border', type: 'string', title: 'Border' },
    ]},
  ],
  preview: {
    select: { title: 'role', subtitle: 'organization' },
  },
};
