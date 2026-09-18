export interface Category {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  coverImage: string;
  color?: string;
  articleCount?: number;
}
