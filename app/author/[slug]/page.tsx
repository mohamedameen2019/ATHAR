import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAuthorBySlug,
  getAllAuthors,
  getArticlesByAuthor,
} from "@/lib/articles";
import { siteConfig } from "@/site.config";
import { formatArabicDate } from "@/lib/utils";
import { generateAuthorJsonLd } from "@/lib/seo";
import { Clock, Calendar, ChevronLeft, Award, Globe } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: "المؤلف غير موجود" };
  }

  return {
    title: `${author.name} | باحث وكاتب في ${siteConfig.nameArabic}`,
    description: author.bio,
    openGraph: {
      title: `${author.name} | ${siteConfig.nameArabic}`,
      description: author.bio,
      images: [{ url: author.avatar }],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const articles = await getArticlesByAuthor(author.slug);
  const authorJsonLd = generateAuthorJsonLd(author, siteConfig.url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Breadcrumbs */}
        <nav aria-label="مسار التصفح" className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-8">
          <Link href="/" className="hover:text-charcoal-900 dark:hover:text-white transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
          <Link href="/about#team" className="hover:text-charcoal-900 dark:hover:text-white transition-colors">
            هيئة التحرير والباحثون
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">
            {author.name}
          </span>
        </nav>

        {/* Author Bio Header Card */}
        <div className="rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-100/50 dark:bg-charcoal-900/50 p-6 sm:p-10 mb-12 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-bronze-500/40 flex-shrink-0 shadow-md">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                priority
                className="object-cover"
                sizes="150px"
              />
            </div>

            <div className="flex-1 text-center sm:text-right">
              <span className="text-xs font-bold text-bronze-600 dark:text-bronze-400 tracking-wider uppercase">
                {author.role}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-ivory-50 mt-1 mb-2">
                {author.name}
              </h1>
              {author.title && (
                <p className="text-sm font-medium text-charcoal-600 dark:text-charcoal-300 mb-4">
                  {author.title}
                </p>
              )}

              <p className="text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed max-w-2xl">
                {author.bio}
              </p>

              {/* Credentials / Affiliations */}
              {author.credentials && author.credentials.length > 0 && (
                <div className="mt-4 pt-4 border-t border-ivory-200/60 dark:border-charcoal-800/60 space-y-1.5">
                  <span className="text-xs font-bold text-charcoal-500 flex items-center justify-center sm:justify-start gap-1">
                    <Award className="w-3.5 h-3.5 text-bronze-500" />
                    <span>الاعتمادات والمؤلفات:</span>
                  </span>
                  <ul className="text-xs text-charcoal-600 dark:text-charcoal-400 space-y-1">
                    {author.credentials.map((cred, idx) => (
                      <li key={idx} className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Links */}
              {author.socialLinks && (
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-4 pt-2">
                  {author.socialLinks.x && (
                    <a
                      href={author.socialLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-charcoal-500 hover:text-bronze-500 transition-colors"
                    >
                      حساب X
                    </a>
                  )}
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-charcoal-500 hover:text-bronze-500 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Authored Articles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-ivory-200 dark:border-charcoal-800">
            <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50">
              أبحاث وتحقيقات {author.name} ({articles.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <article
                key={item.slug}
                className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm hover:border-bronze-500/40 transition-all duration-300"
              >
                <div>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="relative w-full h-52 overflow-hidden block"
                  >
                    <Image
                      src={item.featuredImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded bg-charcoal-950/80 backdrop-blur-sm text-ivory-50 text-[11px] font-semibold">
                      {item.category.title}
                    </div>
                  </Link>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-charcoal-950 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors">
                      <Link href={`/articles/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 line-clamp-3 mt-2.5 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-ivory-200/50 dark:border-charcoal-800/50 flex items-center justify-between text-xs text-charcoal-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-bronze-500" />
                    {formatArabicDate(item.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {item.readingTimeMinutes} د
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
