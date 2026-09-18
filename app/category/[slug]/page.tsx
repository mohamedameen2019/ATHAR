import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getCategoryBySlug,
  getAllCategories,
  getArticlesByCategory,
} from "@/lib/articles";
import { siteConfig } from "@/site.config";
import { formatArabicDate } from "@/lib/utils";
import { Clock, Calendar, ChevronLeft, Layers } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "القسم غير موجود" };
  }

  return {
    title: `قسم ${category.title}`,
    description: category.description,
    openGraph: {
      title: `${category.title} | ${siteConfig.nameArabic}`,
      description: category.description,
      images: [{ url: category.coverImage }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      {/* Breadcrumbs */}
      <nav aria-label="مسار التصفح" className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
        <Link href="/" className="hover:text-charcoal-900 dark:hover:text-white transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
        <span className="text-charcoal-400">الأقسام التحريرية</span>
        <ChevronLeft className="w-3.5 h-3.5 text-charcoal-400" />
        <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">
          {category.title}
        </span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 border border-ivory-200 dark:border-charcoal-800 bg-charcoal-950 text-white min-h-[260px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10 shadow-lg">
        <Image
          src={category.coverImage}
          alt={category.title}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-500/20 text-bronze-300 text-xs font-semibold mb-3 border border-bronze-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>ملف التحقيقات المتخصصة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            {category.title}
          </h1>

          <p className="text-sm sm:text-base text-charcoal-300 leading-relaxed">
            {category.description}
          </p>

          <div className="mt-4 text-xs text-charcoal-400">
            يتضمن {articles.length} تحقيقاً موثقاً بالمصادر
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-ivory-300 dark:border-charcoal-800">
          <p className="text-charcoal-500">لا توجد مقالات منشورة في هذا القسم حالياً.</p>
        </div>
      ) : (
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
                  {item.isLongform && (
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded bg-charcoal-950/80 backdrop-blur-sm text-bronze-400 text-[11px] font-semibold border border-bronze-500/30">
                      وثائقي مطوّل
                    </div>
                  )}
                </Link>

                <div className="p-6">
                  <h2 className="font-bold text-lg text-charcoal-950 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors">
                    <Link href={`/articles/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 line-clamp-3 mt-2.5 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-ivory-200/50 dark:border-charcoal-800/50 flex items-center justify-between text-xs text-charcoal-500">
                <Link
                  href={`/author/${item.author.slug}`}
                  className="font-medium hover:text-bronze-500 transition-colors"
                >
                  {item.author.name}
                </Link>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-bronze-500" />
                    {formatArabicDate(item.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {item.readingTimeMinutes} د
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
