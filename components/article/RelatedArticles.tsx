import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Clock } from "lucide-react";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section aria-label="تحقيقات ومقالات ذات صلة" className="my-14 pt-10 border-t border-ivory-200 dark:border-charcoal-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
          تحقيقات ووثائقيات ذات صلة
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item) => (
          <article
            key={item.slug}
            className="group flex flex-col rounded-xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 transition-all hover:border-bronze-500/40"
          >
            <Link
              href={`/articles/${item.slug}`}
              className="relative w-full h-44 overflow-hidden block"
            >
              <Image
                src={item.featuredImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-charcoal-950/80 backdrop-blur-sm text-ivory-50 text-[11px] font-medium">
                {item.category.title}
              </div>
            </Link>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-bold text-base text-charcoal-900 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors">
                  <Link href={`/articles/${item.slug}`}>
                    {item.title}
                  </Link>
                </h4>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-2 mt-2 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-ivory-200/60 dark:border-charcoal-800/60 flex items-center justify-between text-[11px] text-charcoal-500">
                <span>{item.author.name}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-bronze-500" />
                  {item.readingTimeMinutes} دقائق
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
