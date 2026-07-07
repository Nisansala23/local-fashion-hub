import { type SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { product } from "./product";
import { brandType } from "./brandType";
import { addressType } from "./addressType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { blogType } from "./blogType";
import { orderType } from "./orderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    category,
    product,
    brandType,
    addressType,
    authorType,
    blockContentType,
    blogType,
    orderType
  ], // Registering all e-commerce and blog schemas globally for Sanity Studio
};