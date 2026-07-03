// studio/schemaTypes/skillCategory.js
export default {
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    { name: 'label', type: 'string', title: 'Category Label',
      validation: (Rule) => Rule.required() },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'skills', type: 'array', title: 'Skills',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string', title: 'Skill Name' },
        { name: 'icon', type: 'image', title: 'Skill Icon (SVG)',
          description: 'Upload the SVG icon file here.' },
        { name: 'hoverColor', type: 'string', title: 'Hover Color (hex/rgba)' },
      ]}]
    },
  ],
  preview: {
    select: { title: 'label' },
  },
};
