import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticles,
  getRelatedArticles,
} from "@/lib/articles";
import { siteConfig } from "@/site.config";
import { formatArabicDate } from "@/lib/utils";
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { TableOfContents, TocItem } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/article/ShareButtons";
import { BookmarkButton } from "@/components/article/BookmarkButton";
import { QuickFacts } from "@/components/article/QuickFacts";
import { Timeline } from "@/components/article/Timeline";
import { SourcesList } from "@/components/article/SourcesList";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { BackToTop } from "@/components/article/BackToTop";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { NewsletterBox } from "@/components/home/NewsletterBox";
import { Clock, Calendar, ChevronLeft, ShieldCheck } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "المقال غير موجود",
    };
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${siteConfig.url}/articles/${article.slug}`;

  return {
    title,
    description,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      section: article.category.title,
      tags: article.tags,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.category.slug,
    3
  );

  // Extract headings for Table of Contents
  const tocItems: TocItem[] = [];
  article.contentBlocks.forEach((block, index) => {
    if (block.type === "heading2" && block.text) {
      tocItems.push({
        id: `heading-${index}`,
        text: block.text,
        level: 2,
      });
    } else if (block.type === "heading3" && block.text) {
      tocItems.push({
        id: `heading-${index}`,
        text: block.text,
        level: 3,
      });
    }
  });

  const articleJsonLd = generateArticleJsonLd(article, siteConfig.url);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "الرئيسية", url: siteConfig.url },
    { name: article.category.title, url: `${siteConfig.url}/category/${article.category.slug}` },
    { name: article.title, url: `${siteConfig.url}/articles/${article.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* 1. Breadcrumbs */}
        <nav aria-label="مسار التصفح" className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900 dark:hover:text-white transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
          <Link
            href={`/category/${article.category.slug}`}
            className="hover:text-charcoal-900 dark:hover:text-white transition-colors"
          >
            {article.category.title}
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="text-charcoal-400 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header (Editorial) */}
        <header className="max-w-4xl mx-auto mb-10 text-center lg:text-right">
          {/* Category Tag & Reading Time Badge */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
            <Link
              href={`/category/${article.category.slug}`}
              className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-bronze-500/15 text-bronze-700 dark:text-bronze-300 border border-bronze-500/30"
            >
              {article.category.title}
            </Link>
            {article.isLongform && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950">
                وثائقي مطوّل
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-charcoal-500">
              <Clock className="w-3.5 h-3.5 text-bronze-500" />
              {article.readingTimeMinutes} دقائق قراءة
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950 dark:text-ivory-50 leading-tight sm:leading-tight tracking-tight mb-5">
            {article.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {article.subtitle && (
            <p className="text-base sm:text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-3xl mb-6 font-normal">
              {article.subtitle}
            </p>
          )}

          {/* Author info, dates and Bookmark action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ivory-200 dark:border-charcoal-800">
            <div className="flex items-center gap-3">
              <Link
                href={`/author/${article.author.slug}`}
                className="relative w-12 h-12 rounded-full overflow-hidden border border-bronze-500/40 flex-shrink-0"
              >
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </Link>
              <div className="text-right">
                <Link
                  href={`/author/${article.author.slug}`}
                  className="font-bold text-sm sm:text-base text-charcoal-950 dark:text-ivory-50 hover:text-bronze-500 transition-colors block"
                >
                  {article.author.name}
                </Link>
                <span className="text-xs text-charcoal-500 block">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-charcoal-500">
              <div className="flex flex-col text-left sm:text-right">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-bronze-500" />
                  نشر في: {formatArabicDate(article.publishedAt)}
                </span>
                {article.updatedAt && (
                  <span className="text-[11px] text-charcoal-400 mt-0.5">
                    آخر مراجعة: {formatArabicDate(article.updatedAt)}
                  </span>
                )}
              </div>

              {/* Bookmark Save Button */}
              <BookmarkButton
                slug={article.slug}
                title={article.title}
                categoryTitle={article.category.title}
                showText={true}
              />
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="max-w-5xl mx-auto mb-12">
          <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 shadow-md">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="text-center text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-3 px-4 italic">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Main Content Layout with Sticky Share Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto relative">
          {/* Desktop Left Sticky Share Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <ShareButtons title={article.title} slug={article.slug} />
          </aside>

          {/* Article Main Body (680-780px measure) */}
          <article className="lg:col-span-10 max-w-[760px] mx-auto w-full">
            {/* Table of Contents for Longform */}
            {tocItems.length > 0 && <TableOfContents items={tocItems} />}

            {/* Quick Facts Card */}
            {article.quickFacts && <QuickFacts facts={article.quickFacts} />}

            {/* Content Blocks */}
            <div className="prose-editorial">
              {article.contentBlocks.map((block, index) => {
                if (block.type === "paragraph" && block.text) {
                  return (
                    <p key={index} className="text-charcoal-800 dark:text-charcoal-200">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "heading2" && block.text) {
                  return (
                    <h2
                      key={index}
                      id={`heading-${index}`}
                      className="text-charcoal-950 dark:text-ivory-50 scroll-mt-24 border-r-4 border-bronze-500 pr-3"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "heading3" && block.text) {
                  return (
                    <h3
                      key={index}
                      id={`heading-${index}`}
                      className="text-charcoal-900 dark:text-ivory-100 scroll-mt-24"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "quote" && block.text) {
                  return (
                    <blockquote
                      key={index}
                      className="text-charcoal-900 dark:text-ivory-100 border-r-4 border-bronze-500 bg-bronze-500/5 dark:bg-bronze-500/10"
                    >
                      <p className="mb-2 italic font-editorial text-lg sm:text-xl">
                        &ldquo;{block.text}&rdquo;
                      </p>
                      {block.author && (
                        <cite className="block text-xs font-semibold text-bronze-600 dark:text-bronze-400 not-italic">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                }

                if (block.type === "callout" && block.text) {
                  return (
                    <div
                      key={index}
                      className="my-8 p-5 rounded-xl border border-bronze-500/30 bg-ivory-100/70 dark:bg-charcoal-900/70 flex gap-3.5 items-start text-sm leading-relaxed"
                    >
                      <ShieldCheck className="w-5 h-5 text-bronze-500 flex-shrink-0 mt-0.5" />
                      <p className="text-charcoal-800 dark:text-charcoal-200">
                        {block.text}
                      </p>
                    </div>
                  );
                }

                if (block.type === "table" && block.tableData) {
                  return (
                    <div key={index} className="my-10 overflow-x-auto rounded-xl border border-ivory-200 dark:border-charcoal-800">
                      <table className="w-full text-right text-xs sm:text-sm">
                        <thead className="bg-ivory-200/60 dark:bg-charcoal-800/60 text-charcoal-950 dark:text-ivory-50 font-bold">
                          <tr>
                            {block.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 border-b border-ivory-200 dark:border-charcoal-700">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ivory-200/60 dark:divide-charcoal-800/60">
                          {block.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-ivory-100/40 dark:hover:bg-charcoal-850/40">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3.5 text-charcoal-700 dark:text-charcoal-300">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* In-article contextual ad slot */}
            <InArticleAd />

            {/* Timeline Component */}
            {article.timeline && <Timeline events={article.timeline} />}

            {/* Sources & References List */}
            {article.sources && <SourcesList sources={article.sources} />}

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="pt-6 border-t border-ivory-200 dark:border-charcoal-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-charcoal-500">
                  الوسوم:
                </span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-full text-xs bg-ivory-200/50 dark:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-300 hover:bg-bronze-500/10 hover:text-bronze-500 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        </div>

        {/* Related Articles Section */}
        <div className="max-w-5xl mx-auto">
          <RelatedArticles articles={relatedArticles} />
        </div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto">
          <NewsletterBox />
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Mobile Bottom Share Bar */}
      <ShareButtons title={article.title} slug={article.slug} isBottomBar={true} />
    </>
  );
}
