// studio/schemaTypes/education.js
export default {
  name: 'education',
  title: 'Education Entry',
  type: 'document',
  fields: [
    { name: 'degree', type: 'string', title: 'Degree',
      validation: (Rule) => Rule.required() },
    { name: 'institution', type: 'string', title: 'Institution' },
    { name: 'date', type: 'string', title: 'Date Range' },
    { name: 'grade', type: 'string', title: 'Grade / CGPA' },
    { name: 'description', type: 'text', title: 'Relevant Coursework' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'hoverColor', type: 'object', title: 'Hover Colors', fields: [
      { name: 'surface', type: 'string', title: 'Surface' },
      { name: 'border', type: 'string', title: 'Border' },
    ]},
  ],
  preview: {
    select: { title: 'degree', subtitle: 'institution' },
  },
};
