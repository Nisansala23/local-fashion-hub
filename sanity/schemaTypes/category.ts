import { defineType, defineField } from "sanity";

export const category = defineType({
    name: "category",
    title: "Product Categories",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Category Title",
            type: "string",
            validation: (Rule) => Rule.required().error("Category title is required"),
        }),
        defineField({
            name: "slug",
            title: "URL Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Category Image",
            type: "image",
            options: {
                hotspot: true, // Allows cropping images inside the admin dashboard
            },
        }),
    ],
});