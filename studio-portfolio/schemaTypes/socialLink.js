// studio/schemaTypes/socialLink.js
export default {
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Platform Name',
      validation: (Rule) => Rule.required() },
    { name: 'link', type: 'url', title: 'Profile URL' },
    { name: 'icon', type: 'image', title: 'Platform Icon (SVG)' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'hoverColor', type: 'object', title: 'Hover Colors', fields: [
      { name: 'surface', type: 'string', title: 'Surface' },
      { name: 'border', type: 'string', title: 'Border' },
    ]},
  ],
  preview: {
    select: { title: 'name', subtitle: 'link' },
  },
};
