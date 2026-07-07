import { defineType, defineField } from 'sanity';

export const blogType = defineType({
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
        defineField({ name: 'author', title: 'Author', type: 'reference', to: { type: 'author' } }),
        defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
        defineField({
            name: 'categories',
            title: 'Blog Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
        defineField({ name: 'isLatest', title: 'Mark as Latest', type: 'boolean', initialValue: false }),
        defineField({ name: 'body', title: 'Body Content', type: 'blockContent' }),
    ],
});