import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { formatArabicDate } from "@/lib/utils";

interface HeroFeaturedProps {
  article: Article;
}

export function HeroFeatured({ article }: HeroFeaturedProps) {
  if (!article) return null;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden my-6 md:my-10 border border-ivory-200 dark:border-charcoal-800 bg-charcoal-950 text-white shadow-xl">
      {/* Background Image with Dark Vignette */}
      <div className="relative w-full h-[520px] md:h-[620px] lg:h-[680px]">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          priority
          className="object-cover object-center opacity-75 transition-transform duration-1000 scale-100 hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/20" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-charcoal-950/50" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 z-10 max-w-4xl">
        {/* Category & Badge */}
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/category/${article.category.slug}`}
            className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-bronze-500/90 text-charcoal-950 hover:bg-bronze-400 transition-colors shadow-sm"
          >
            {article.category.title}
          </Link>
          <span className="text-xs font-semibold text-bronze-300 tracking-widest uppercase">
            التحقيق الوثائقي البارز
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight sm:leading-tight text-white mb-4 tracking-tight drop-shadow-md">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:text-bronze-300 transition-colors"
          >
            {article.title}
          </Link>
        </h1>

        {/* Excerpt */}
        <p className="text-sm sm:text-base lg:text-lg text-charcoal-200 leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3 max-w-3xl drop-shadow">
          {article.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-charcoal-700/60">
          <div className="flex items-center gap-3">
            <Link
              href={`/author/${article.author.slug}`}
              className="relative w-10 h-10 rounded-full overflow-hidden border border-bronze-500/50 flex-shrink-0"
            >
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/author/${article.author.slug}`}
                className="text-sm font-semibold text-white hover:text-bronze-300 transition-colors"
              >
                {article.author.name}
              </Link>
              <span className="text-xs text-charcoal-300">
                {article.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-charcoal-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-bronze-400" />
              {formatArabicDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-bronze-400" />
              {article.readingTimeMinutes} دقائق قراءة
            </span>
            <Link
              href={`/articles/${article.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ivory-50 text-charcoal-950 font-bold hover:bg-bronze-400 transition-all text-xs"
            >
              <span>قراءة التحقيق</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
