import { Author } from "./author";
import { Category } from "./category";
import { TimelineEvent } from "./timeline";

export interface QuickFact {
  label: string;
  value: string;
}

export interface SourceReference {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  yearOrDate?: string;
}

export interface ArticleContentBlock {
  type: "paragraph" | "heading2" | "heading3" | "quote" | "callout" | "image" | "gallery" | "table" | "videoEmbed" | "audioEmbed" | "mapEmbed";
  text?: string;
  subtext?: string;
  author?: string;
  src?: string;
  caption?: string;
  images?: Array<{ src: string; caption?: string }>;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  embedUrl?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  featuredImage: string;
  imageCaption?: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  isEditorPick?: boolean;
  isLongform?: boolean;
  viewCount?: number;
  tags: string[];
  quickFacts?: QuickFact[];
  timeline?: TimelineEvent[];
  contentBlocks: ArticleContentBlock[];
  rawPortableText?: any;
  sources: SourceReference[];
  relatedSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
}
