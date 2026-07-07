import { defineField, defineType } from "sanity";
import { TrolleyIcon } from "@sanity/icons";

export const product = defineType({
    name: "product",
    title: "Products Inventory",
    type: "document",
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "URL Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "images",
            title: "Product Images Gallery",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "description",
            title: "Product Description",
            type: "text",
        }),
        defineField({
            name: "price",
            title: "Retail Price (USD)",
            type: "number",
            validation: (Rule) => Rule.min(0).required(),
        }),
        defineField({
            name: "stock",
            title: "Current Stock Inventory",
            type: "number",
            validation: (Rule) => Rule.min(0).required(),
        }),
        defineField({
            name: "category",
            title: "Associated Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        }),

        /* --- NEW CORE FEATURE: HOT DEALS / FLASH SALE CONFIGURATIONS --- */
        defineField({
            name: "isHotDeal",
            title: "Mark as Hot Deal / Flash Sale",
            description: "Toggle true to automatically push this garment look into the Limited Flash Sale showcase module.",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "discountPercentage",
            title: "Discount Percentage (%)",
            description: "Specify the markup price adjustment factor value.",
            type: "number",
            validation: (Rule) => Rule.min(1).max(99),
            // Explicitly hides this box field unless 'isHotDeal' is actively toggled true
            hidden: ({ parent }) => !parent?.isHotDeal,
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "images.0",
            subtitle: "price",
            hotDeal: "isHotDeal", // Gather hot deal value state context
        },
        prepare({ title, media, subtitle, hotDeal }) {
            return {
                title,
                media,
                // Appends a subtle indicator string in your document dashboard list view 
                subtitle: `${subtitle ? `$${subtitle}` : ""} ${hotDeal ? "🔥 [FLASH SALE]" : ""}`.trim(),
            };
        },
    },
});