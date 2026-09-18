import { Article, Author, Category } from "@/types";
import { demoArticles } from "./data/demoArticles";
import { demoCategories } from "./data/demoCategories";
import { demoAuthors } from "./data/demoAuthors";
import { sanityClient, isSanityConfigured } from "@/sanity/lib/client";
import { articlesQuery, articleBySlugQuery } from "@/sanity/lib/queries";

export async function getAllArticles(): Promise<Article[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const sanityData = await sanityClient.fetch(articlesQuery);
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        // Map sanity raw data to Article interface if needed
        return sanityData.map((item: any) => ({
          ...item,
          readingTimeMinutes: item.readingTime || 8,
          contentBlocks: item.content || [],
          tags: item.tags?.map((t: any) => t.title) || [],
          sources: item.sources || [],
        }));
      }
    } catch (err) {
      console.warn("Sanity fetch failed or returned empty, falling back to documentary archive:", err);
    }
  }
  return demoArticles;
}

export async function getFeaturedArticle(): Promise<Article> {
  const articles = await getAllArticles();
  const featured = articles.find((a) => a.isFeatured);
  return featured || articles[0];
}

export async function getEditorsPicks(limit = 4): Promise<Article[]> {
  const articles = await getAllArticles();
  const picks = articles.filter((a) => a.isEditorPick);
  if (picks.length > 0) {
    return picks.slice(0, limit);
  }
  return articles.slice(1, 1 + limit);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  const articles = await getAllArticles();
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getLongformArticles(limit = 3): Promise<Article[]> {
  const articles = await getAllArticles();
  const longforms = articles.filter((a) => a.isLongform);
  return longforms.slice(0, limit);
}

export async function getMostReadArticles(limit = 5): Promise<Article[]> {
  const articles = await getAllArticles();
  return [...articles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const data = await sanityClient.fetch(articleBySlugQuery, { slug });
      if (data) {
        return {
          ...data,
          readingTimeMinutes: data.readingTime || 8,
          contentBlocks: data.content || [],
          tags: data.tags?.map((t: any) => t.title) || [],
          sources: data.sources || [],
        };
      }
    } catch (err) {
      console.warn("Sanity fetch by slug failed, falling back to documentary archive:", err);
    }
  }

  const found = demoArticles.find((a) => a.slug === slug);
  return found || null;
}

export async function getRelatedArticles(currentSlug: string, categorySlug: string, limit = 3): Promise<Article[]> {
  const current = await getArticleBySlug(currentSlug);
  const articles = await getAllArticles();

  if (current?.relatedSlugs && current.relatedSlugs.length > 0) {
    const related = articles.filter((a) => current.relatedSlugs?.includes(a.slug));
    if (related.length >= limit) {
      return related.slice(0, limit);
    }
  }

  return articles
    .filter((a) => a.slug !== currentSlug && a.category.slug === categorySlug)
    .slice(0, limit);
}

export async function getAllCategories(): Promise<Category[]> {
  return demoCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const found = demoCategories.find((c) => c.slug === slug);
  return found || null;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.category.slug === categorySlug);
}

export async function getAllAuthors(): Promise<Author[]> {
  return demoAuthors;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const found = demoAuthors.find((a) => a.slug === slug);
  return found || null;
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.author.slug === authorSlug);
}

export async function searchArticles(query: string, categorySlug?: string): Promise<Article[]> {
  const articles = await getAllArticles();
  const q = query.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory = !categorySlug || article.category.slug === categorySlug;
    if (!matchesCategory) return false;

    if (!q) return true;

    const inTitle = article.title.toLowerCase().includes(q);
    const inSubtitle = article.subtitle?.toLowerCase().includes(q);
    const inExcerpt = article.excerpt.toLowerCase().includes(q);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
    const inAuthor = article.author.name.toLowerCase().includes(q);

    return inTitle || inSubtitle || inExcerpt || inTags || inAuthor;
  });
}
