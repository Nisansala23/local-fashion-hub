"use client"; // <--- Add this directive at the absolute top!

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: '/studio',
  name: "default",
  title: "Bazaar Admin",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [structureTool(), visionTool()],
  schema: schema,
});