import { defineType, defineField } from 'sanity';

export const brandType = defineType({
    name: 'brand',
    title: 'Brand',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Brand Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Brand Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
});