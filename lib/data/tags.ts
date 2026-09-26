import { getAllArticles } from "./articles";

export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles(150);
  const tagSet = new Set<string>();
  articles.forEach((a) => {
    a.tags.forEach((t) => tagSet.add(t));
  });
  return Array.from(tagSet);
}
