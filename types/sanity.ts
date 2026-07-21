// types/sanity.ts
// ✅ Reusable Sanity types

export interface SanityImage {
    _key?: string
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
    alt?: string
}

export interface SanitySlug {
    _type: 'slug'
    current: string
}

export interface Category {
    _id: string
    title: string
    slug: SanitySlug
}

export interface Product {
    _id: string
    name: string
    slug: SanitySlug
    description: string
    price: number
    discount?: number
    stock: number
    images: SanityImage[]
    categoryTitle?: string
    sku?: string
    discountPercentage?: number
    imageUrl?: string
    category?: {
        title: string
    }
}