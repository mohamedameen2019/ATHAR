import { Author } from "@/types";
import { demoAuthors } from "./demoAuthors";

export async function getAllAuthors(): Promise<Author[]> {
  return demoAuthors;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const found = demoAuthors.find((a) => a.slug === slug);
  return found || null;
}
