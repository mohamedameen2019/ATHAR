export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "imageCaption": featuredImage.caption,
    category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    author->{
      _id,
      name,
      role,
      "slug": slug.current,
      "avatar": avatar.asset->url
    },
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    editorPick,
    isLongform,
    tags[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "imageCaption": featuredImage.caption,
    category->{
      _id,
      title,
      "slug": slug.current,
      color
    },
    author->{
      _id,
      name,
      role,
      title,
      bio,
      credentials,
      "slug": slug.current,
      "avatar": avatar.asset->url,
      socialLinks
    },
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    editorPick,
    isLongform,
    quickFacts,
    timeline,
    content,
    sources,
    seoTitle,
    seoDescription,
    "ogImage": ogImage.asset->url,
    "relatedArticles": *[_type == "article" && category._ref == ^.category._ref && _id != ^._id][0...3] {
      _id,
      title,
      "slug": slug.current,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      readingTime
    }
  }
`;

export const categoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    color
  }
`;

export const authorsQuery = `
  *[_type == "author"] {
    _id,
    name,
    role,
    title,
    "slug": slug.current,
    "avatar": avatar.asset->url,
    bio,
    credentials,
    socialLinks
  }
`;
