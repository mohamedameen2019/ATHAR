import { Article } from "@/types";
import { SupabaseArticleRow } from "@/lib/supabase/types";
import {
  mapSupabaseArticleToArticle,
  parseArticleIdFromSlug,
  generateArticleSlug,
  slugifyArabic,
} from "@/lib/supabase/mapper";
import { demoArticles } from "./demoArticles";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const BASE_HEADERS: Record<string, string> = {
  apikey: supabaseAnonKey || "",
  Authorization: `Bearer ${supabaseAnonKey || ""}`,
  "Content-Type": "application/json",
};

// Reusable fetcher with Next.js ISR cache options
async function supabaseFetch<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    revalidate?: number | false;
    tags?: string[];
  } = {}
): Promise<{ data: T | null; error: any }> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: new Error("Missing Supabase configuration") };
  }

  try {
    const url = `${supabaseUrl}/rest/v1/${endpoint}`;
    const nextOptions: any = {};
    if (options.revalidate !== undefined) {
      nextOptions.revalidate = options.revalidate;
    } else {
      nextOptions.revalidate = 60; // 60s default ISR cache
    }
    if (options.tags) {
      nextOptions.tags = options.tags;
    }

    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        ...BASE_HEADERS,
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      next: nextOptions,
    });

    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: new Error(`Supabase query error (${res.status}): ${errText}`) };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

const LISTING_COLUMNS = "id,title,info,category,created_at,poster,views,reading_time,writter_id,sub_category,region";

export async function getAllArticles(limit = 100): Promise<Article[]> {
  const query = `articles?select=${LISTING_COLUMNS}&order=created_at.desc&limit=${limit}`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles"],
  });

  if (error || !data || data.length === 0) {
    if (error) console.warn("Supabase getAllArticles failed, fallback to archive:", error);
    return demoArticles;
  }

  return data.map((row) => mapSupabaseArticleToArticle(row));
}

export async function getFeaturedArticle(): Promise<Article> {
  // Try to find an article marked with "اختيار المحررين" or high views
  const query = `articles?select=${LISTING_COLUMNS}&category=ilike.*اختيار المحررين*&order=views.desc&limit=1`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles", "featured"],
  });

  if (!error && data && data.length > 0) {
    return mapSupabaseArticleToArticle(data[0]);
  }

  const all = await getAllArticles();
  return all.find((a) => a.isFeatured) || all[0];
}

export async function getEditorsPicks(limit = 4): Promise<Article[]> {
  const query = `articles?select=${LISTING_COLUMNS}&category=ilike.*اختيار المحررين*&order=created_at.desc&limit=${limit}`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles", "editors-picks"],
  });

  if (!error && data && data.length > 0) {
    return data.map((row) => mapSupabaseArticleToArticle(row));
  }

  const all = await getAllArticles();
  const picks = all.filter((a) => a.isEditorPick);
  return picks.length > 0 ? picks.slice(0, limit) : all.slice(1, 1 + limit);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  const query = `articles?select=${LISTING_COLUMNS}&order=created_at.desc&limit=${limit}`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles", "latest"],
  });

  if (!error && data && data.length > 0) {
    return data.map((row) => mapSupabaseArticleToArticle(row));
  }

  const all = await getAllArticles();
  return [...all]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getLongformArticles(limit = 3): Promise<Article[]> {
  // Query articles with long reading time
  const query = `articles?select=${LISTING_COLUMNS}&reading_time=gte.15&order=created_at.desc&limit=${limit}`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles", "longform"],
  });

  if (!error && data && data.length > 0) {
    return data.map((row) => mapSupabaseArticleToArticle(row));
  }

  const all = await getAllArticles();
  const longforms = all.filter((a) => a.isLongform);
  return longforms.length > 0 ? longforms.slice(0, limit) : all.slice(0, limit);
}

export async function getMostReadArticles(limit = 5): Promise<Article[]> {
  const query = `articles?select=${LISTING_COLUMNS}&order=views.desc&limit=${limit}`;
  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
    tags: ["articles", "most-read"],
  });

  if (!error && data && data.length > 0) {
    return data.map((row) => mapSupabaseArticleToArticle(row));
  }

  const all = await getAllArticles();
  return [...all]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug) return null;

  // 1. Direct index lookup if ID is in the slug
  const articleId = parseArticleIdFromSlug(slug);
  if (articleId !== null) {
    const query = `articles?id=eq.${articleId}&select=*&limit=1`;
    const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(query, {
      revalidate: 60,
      tags: [`article-${articleId}`],
    });

    if (!error && data && data.length > 0) {
      return mapSupabaseArticleToArticle(data[0]);
    }
  }

  // 2. Check fallback demo articles (e.g. "the-fall-of-pompeii")
  const demoFound = demoArticles.find((a) => a.slug === slug);
  if (demoFound) return demoFound;

  // 3. Match against title slug
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
  const allArticles = await getAllArticles(100);
  const foundBySlug = allArticles.find(
    (a) => a.slug === decodedSlug || a.slug.includes(decodedSlug) || decodedSlug.includes(a.slug)
  );

  if (foundBySlug) {
    // Fetch full article with content blocks
    const fullQuery = `articles?id=eq.${foundBySlug.id}&select=*&limit=1`;
    const { data } = await supabaseFetch<SupabaseArticleRow[]>(fullQuery, {
      revalidate: 60,
    });
    if (data && data.length > 0) {
      return mapSupabaseArticleToArticle(data[0]);
    }
    return foundBySlug;
  }

  return null;
}

export async function getRelatedArticles(
  currentSlug: string,
  categorySlug: string,
  limit = 3
): Promise<Article[]> {
  const currentId = parseArticleIdFromSlug(currentSlug);
  const excludeFilter = currentId ? `&id=neq.${currentId}` : "";
  const query = `articles?select=${LISTING_COLUMNS}${excludeFilter}&order=created_at.desc&limit=${limit * 2}`;
  
  const { data } = await supabaseFetch<SupabaseArticleRow[]>(query);
  if (data && data.length > 0) {
    const mapped = data.map((r) => mapSupabaseArticleToArticle(r));
    const matching = mapped.filter((a) => a.category.slug === categorySlug);
    if (matching.length >= limit) {
      return matching.slice(0, limit);
    }
    return mapped.slice(0, limit);
  }

  const all = await getAllArticles();
  return all
    .filter((a) => a.slug !== currentSlug && a.category.slug === categorySlug)
    .slice(0, limit);
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const all = await getAllArticles(150);
  return all.filter((a) => a.category.slug === categorySlug);
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  const all = await getAllArticles(150);
  return all.filter((a) => a.author.slug === authorSlug);
}

export async function searchArticles(query: string, categorySlug?: string): Promise<Article[]> {
  const q = query.trim();
  if (!q) {
    return categorySlug ? getArticlesByCategory(categorySlug) : getAllArticles(20);
  }

  const cleanQuery = encodeURIComponent(`%${q}%`);
  // PostgreSQL ilike query across title, info, and sub_category
  const supabaseQuery = `articles?select=${LISTING_COLUMNS}&or=(title.ilike.${cleanQuery},info.ilike.${cleanQuery},sub_category.ilike.${cleanQuery})&order=created_at.desc&limit=30`;

  const { data, error } = await supabaseFetch<SupabaseArticleRow[]>(supabaseQuery, {
    revalidate: 15,
  });

  if (!error && data && data.length > 0) {
    const mapped = data.map((r) => mapSupabaseArticleToArticle(r));
    if (categorySlug) {
      return mapped.filter((a) => a.category.slug === categorySlug);
    }
    return mapped;
  }

  // Fallback memory search
  const all = await getAllArticles(100);
  const qLower = q.toLowerCase();
  return all.filter((article) => {
    const matchesCategory = !categorySlug || article.category.slug === categorySlug;
    if (!matchesCategory) return false;

    const inTitle = article.title.toLowerCase().includes(qLower);
    const inSubtitle = article.subtitle?.toLowerCase().includes(qLower);
    const inExcerpt = article.excerpt.toLowerCase().includes(qLower);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(qLower));

    return inTitle || inSubtitle || inExcerpt || inTags;
  });
}
