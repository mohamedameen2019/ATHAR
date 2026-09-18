import { schemaTypes } from "./sanity/schemas";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8c99js9j",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "أثر | ATHAR Documentary Studio",
  apiVersion: "2024-03-01",
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
};

export default sanityConfig;
