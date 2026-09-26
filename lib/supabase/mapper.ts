import { Article, ArticleContentBlock, Category, Author, SourceReference, QuickFact } from "@/types";
import { SupabaseArticleRow, SupabaseContentTopic } from "./types";
import { demoCategories } from "@/lib/data/demoCategories";
import { demoAuthors } from "@/lib/data/demoAuthors";

export function slugifyArabic(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\u0621-\u064A\u0660-\u0669a-zA-Z0-9\s-]/g, "") // Keep Arabic, English, numbers, spaces, hyphens
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Collapse multiple -
    .replace(/^-+|-+$/g, ""); // Trim -
}

export function generateArticleSlug(row: SupabaseArticleRow): string {
  if (row.slug && row.slug.trim()) {
    return row.slug.trim();
  }
  const cleanTitleSlug = slugifyArabic(row.title);
  if (row.id) {
    return cleanTitleSlug ? `${row.id}-${cleanTitleSlug}` : `${row.id}`;
  }
  return cleanTitleSlug || "article";
}

export function parseArticleIdFromSlug(slug: string): number | null {
  if (!slug) return null;
  // If slug is pure number: "172"
  if (/^\d+$/.test(slug)) {
    return parseInt(slug, 10);
  }
  // If slug starts with number: "172-article-title"
  const startMatch = slug.match(/^(\d+)-/);
  if (startMatch) {
    return parseInt(startMatch[1], 10);
  }
  // If slug ends with number: "article-title-172"
  const endMatch = slug.match(/-(\d+)$/);
  if (endMatch) {
    return parseInt(endMatch[1], 10);
  }
  return null;
}

const CATEGORY_MAP: Record<string, { slug: string; color: string; titleEn: string }> = {
  "التاريخ": { slug: "history", color: "#C5A880", titleEn: "History" },
  "الحضارات": { slug: "civilizations", color: "#D5B88D", titleEn: "Civilizations" },
  "العلوم": { slug: "science", color: "#9298A8", titleEn: "Science" },
  "الفضاء": { slug: "space", color: "#A98B60", titleEn: "Space" },
  "التكنولوجيا": { slug: "technology", color: "#C5A880", titleEn: "Technology" },
  "الطبيعة": { slug: "nature", color: "#866D46", titleEn: "Nature" },
  "الحروب": { slug: "wars", color: "#A98B60", titleEn: "Wars" },
  "ملفات وثائقية": { slug: "history", color: "#C5A880", titleEn: "Documentaries" },
  "دول العالم": { slug: "civilizations", color: "#D5B88D", titleEn: "World Nations" },
  "الديانات والمعتقدات": { slug: "history", color: "#C5A880", titleEn: "Religions & Beliefs" },
  "ما وراء الواقع": { slug: "science", color: "#9298A8", titleEn: "Beyond Reality" },
};

export function mapCategory(categoryString: string | null): Category {
  if (!categoryString) {
    return demoCategories[0]; // fallback to History
  }

  const parts = categoryString.split(",").map((s) => s.trim()).filter(Boolean);
  // Find first category that matches one of our known categories, avoiding utility tags like "الفيديوهات" / "اختيار المحررين"
  const preferred = parts.find((p) => p !== "الفيديوهات" && p !== "اختيار المحررين") || parts[0] || "التاريخ";

  // Check if it matches existing demoCategories directly
  const existing = demoCategories.find(
    (c) => c.title === preferred || c.slug.toLowerCase() === preferred.toLowerCase()
  );
  if (existing) return existing;

  const mapping = CATEGORY_MAP[preferred];
  if (mapping) {
    return {
      id: `cat-${mapping.slug}`,
      slug: mapping.slug,
      title: preferred,
      titleEn: mapping.titleEn,
      color: mapping.color,
      coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=80",
      description: `مقالات وتحقيقات استقصائية موثقة في قسم ${preferred}.`,
    };
  }

  const generatedSlug = slugifyArabic(preferred) || "general";
  return {
    id: `cat-${generatedSlug}`,
    slug: generatedSlug,
    title: preferred,
    titleEn: preferred,
    color: "#C5A880",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80",
    description: `أرشيف مقالات قسم ${preferred}.`,
  };
}

export function mapAuthor(writterId?: number | string | null): Author {
  // If writter matches an index or ID in demoAuthors
  if (writterId) {
    const idStr = String(writterId);
    const found = demoAuthors.find((a) => a.id === idStr || a.slug === idStr);
    if (found) return found;
  }
  // Default to senior editorial team author
  return demoAuthors[0];
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return "المصدر التوثيقي";
  }
}

export function mapSupabaseArticleToArticle(row: SupabaseArticleRow): Article {
  const slug = generateArticleSlug(row);
  const category = mapCategory(row.category);
  const author = mapAuthor(row.writter_id);

  // Extract tags from sub_category and category
  const tagsSet = new Set<string>();
  if (row.sub_category) {
    row.sub_category
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => tagsSet.add(t));
  }
  if (row.category) {
    row.category
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => {
        if (t !== "الفيديوهات" && t !== "اختيار المحررين") {
          tagsSet.add(t);
        }
      });
  }
  const tags = Array.from(tagsSet);

  // Extract sources and content blocks
  const sources: SourceReference[] = [];
  const contentBlocks: ArticleContentBlock[] = [];
  const quickFacts: QuickFact[] = [];

  if (row.region) {
    quickFacts.push({ label: "المنطقة / الدولة", value: row.region });
  }
  if (row.reading_time) {
    quickFacts.push({ label: "مدة القراءة التقديرية", value: `${row.reading_time} دقائق` });
  }
  if (row.views) {
    quickFacts.push({
      label: "عدد القراءات التوثيقية",
      value: `${row.views.toLocaleString("ar-EG")} قراءة`,
    });
  }

  if (Array.isArray(row.content)) {
    row.content.forEach((topicObj: SupabaseContentTopic, topicIdx: number) => {
      // 1. Topic Heading
      if (topicObj.topic && topicObj.topic.trim()) {
        contentBlocks.push({
          type: "heading2",
          text: topicObj.topic.trim(),
        });
      }

      // 2. Topic Introduction
      if (topicObj.introduction && topicObj.introduction.trim()) {
        const cleanIntro = stripHtml(topicObj.introduction);
        if (cleanIntro) {
          // If introductory text starts with quotation or is prominent, render as callout
          contentBlocks.push({
            type: "callout",
            text: cleanIntro,
          });
        }
      }

      // 3. Topic Main Text
      if (topicObj.text && topicObj.text.trim()) {
        const paragraphs = topicObj.text
          .split("\n")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        paragraphs.forEach((para) => {
          contentBlocks.push({
            type: "paragraph",
            text: para,
          });
        });
      }

      // 4. Topic Images
      if (Array.isArray(topicObj.image) && topicObj.image.length > 0) {
        topicObj.image.forEach((img) => {
          const src = img.url || img.src;
          if (src) {
            contentBlocks.push({
              type: "image",
              src,
              caption: img.caption || topicObj.topic,
            });
          }
        });
      }

      // 5. Topic Conclusion
      if (topicObj.conclusion && topicObj.conclusion.trim()) {
        const cleanConclusion = stripHtml(topicObj.conclusion);
        if (cleanConclusion) {
          contentBlocks.push({
            type: "quote",
            text: cleanConclusion,
          });
        }
      }

      // 6. Topic Sources
      if (Array.isArray(topicObj.source)) {
        topicObj.source.forEach((srcObj) => {
          if (srcObj.src && srcObj.src.trim()) {
            const domain = extractDomain(srcObj.src);
            const exists = sources.some((s) => s.url === srcObj.src);
            if (!exists) {
              sources.push({
                id: `src-${sources.length + 1}`,
                title: srcObj.title || `توثيق من منصة ${domain}`,
                publisher: domain,
                url: srcObj.src.trim(),
              });
            }
          }
        });
      }
    });
  }

  // Fallback if no content blocks were found
  if (contentBlocks.length === 0 && row.info) {
    contentBlocks.push({
      type: "paragraph",
      text: row.info,
    });
  }

  const isEditorPick = Boolean(row.category?.includes("اختيار المحررين"));
  const isFeatured = Boolean(isEditorPick || (row.views && row.views > 1000));
  const isLongform = Boolean(
    (row.reading_time && row.reading_time > 15) ||
      (Array.isArray(row.content) && row.content.length > 4)
  );

  return {
    id: String(row.id),
    slug,
    title: row.title,
    subtitle: row.info && row.info.length > 180 ? row.info.slice(0, 180) + "..." : row.info || undefined,
    excerpt: row.info || row.title,
    featuredImage: row.poster || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=85",
    imageCaption: row.title,
    category,
    author,
    publishedAt: row.created_at || new Date().toISOString(),
    updatedAt: row.created_at,
    readingTimeMinutes: row.reading_time || Math.max(5, Math.ceil((row.info?.length || 400) / 80)),
    isFeatured,
    isEditorPick,
    isLongform,
    viewCount: row.views || 0,
    tags,
    quickFacts: quickFacts.length > 0 ? quickFacts : undefined,
    contentBlocks,
    sources,
    seoTitle: row.title,
    seoDescription: row.info ? row.info.slice(0, 160) : undefined,
  };
}
