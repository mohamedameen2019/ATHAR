import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo_project_id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  if (!source || !source.asset) {
    return "";
  }
  return imageBuilder.image(source).auto("format").fit("max").url();
};
