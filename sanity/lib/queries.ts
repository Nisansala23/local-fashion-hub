import { defineQuery } from "next-sanity";

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" || _type == "products"] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    stock,
    "imageUrl": images[0].asset->url,
    category-> {
      title,
      "slug": slug.current
    }
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[slug.current == $slug][0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    price,
    description,
    stock,
    "imageUrl": images[0].asset->url,
    "fallbackImageUrl": image.asset->url, 
    category-> {
      title
    }
  }
`);