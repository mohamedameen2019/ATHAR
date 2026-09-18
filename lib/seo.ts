import { Article, Author } from "@/types";
import { siteConfig } from "@/site.config";

export function generateArticleJsonLd(article: Article, siteUrl: string) {
  const url = `${siteUrl}/articles/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.title || article.author.role,
      url: `${siteUrl}/author/${article.author.slug}`,
      image: article.author.avatar,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.nameArabic,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    articleSection: article.category.title,
    keywords: article.tags.join(", "),
    inLanguage: "ar",
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.nameArabic,
    alternateName: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  };
}

export function generateAuthorJsonLd(author: Author, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.avatar,
    url: `${siteUrl}/author/${author.slug}`,
    sameAs: author.socialLinks ? Object.values(author.socialLinks).filter(Boolean) : [],
  };
}
