import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Clock, Calendar, Compass } from "lucide-react";
import { formatArabicDate } from "@/lib/utils";

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-14 lg:my-20">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ivory-200 dark:border-charcoal-800 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 flex items-center justify-center">
            <Compass className="w-4 h-4 text-bronze-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
              أحدث المقالات والتحقيقات
            </h2>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              إصدارات جديدة تضاف دورياً إلى الأرشيف الوثائقي
            </p>
          </div>
        </div>

        <Link
          href="/search"
          className="text-xs font-semibold text-bronze-600 dark:text-bronze-400 hover:underline"
        >
          استعراض الأرشيف الكامل ←
        </Link>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item) => (
          <article
            key={item.slug}
            className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm hover:border-bronze-500/40 transition-all duration-300"
          >
            <div>
              {/* Card Image */}
              <Link
                href={`/articles/${item.slug}`}
                className="relative w-full h-52 overflow-hidden block"
              >
                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-charcoal-950/80 backdrop-blur-sm text-ivory-50 text-[11px] font-semibold">
                  {item.category.title}
                </div>
              </Link>

              {/* Body */}
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

            {/* Meta Footer */}
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
    </section>
  );
}
