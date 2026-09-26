/**
 * ATHAR (أثر) - Articles & Content Data Access Layer
 * Powered by Supabase PostgreSQL backend
 */

export {
  getAllArticles,
  getFeaturedArticle,
  getEditorsPicks,
  getLatestArticles,
  getLongformArticles,
  getMostReadArticles,
  getArticleBySlug,
  getRelatedArticles,
  getArticlesByCategory,
  getArticlesByAuthor,
  searchArticles,
} from "./data/articles";

export { getAllCategories, getCategoryBySlug } from "./data/categories";
export { getAllAuthors, getAuthorBySlug } from "./data/authors";
export { getAllTags } from "./data/tags";
