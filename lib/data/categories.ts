import { Category } from "@/types";
import { demoCategories } from "./demoCategories";

export async function getAllCategories(): Promise<Category[]> {
  return demoCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const found = demoCategories.find((c) => c.slug === slug);
  return found || null;
}
