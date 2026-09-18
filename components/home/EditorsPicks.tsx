import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Sparkles, Clock, Calendar } from "lucide-react";
import { formatArabicDate } from "@/lib/utils";

interface EditorsPicksProps {
  articles: Article[];
}

export function EditorsPicks({ articles }: EditorsPicksProps) {
  if (!articles || articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section className="my-14 lg:my-20">
      {/* Section Title */}
      <div className="flex items-center justify-between pb-4 border-b border-ivory-200 dark:border-charcoal-800 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
              اختيارات المحررين
            </h2>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              تحقيقات استقصائية نوصي بمطالعتها بعناية
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lead Pick: Large Feature */}
        {lead && (
          <article className="lg:col-span-7 flex flex-col justify-between group rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm hover:border-bronze-500/40 transition-all">
            <Link
              href={`/articles/${lead.slug}`}
              className="relative w-full h-72 sm:h-96 overflow-hidden block"
            >
              <Image
                src={lead.featuredImage}
                alt={lead.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-charcoal-950/80 backdrop-blur-sm text-ivory-50 text-xs font-semibold">
                {lead.category.title}
              </div>
            </Link>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors">
                  <Link href={`/articles/${lead.slug}`}>
                    {lead.title}
                  </Link>
                </h3>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-300 line-clamp-3 mt-3 leading-relaxed">
                  {lead.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-200/60 dark:border-charcoal-800/60 flex items-center justify-between text-xs text-charcoal-500">
                <Link
                  href={`/author/${lead.author.slug}`}
                  className="font-medium hover:text-bronze-500 transition-colors"
                >
                  {lead.author.name}
                </Link>
                <div className="flex items-center gap-3">
                  <span>{formatArabicDate(lead.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {lead.readingTimeMinutes} دقيقة
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Picks List */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {rest.slice(0, 3).map((item) => (
            <article
              key={item.slug}
              className="group flex gap-4 p-4 rounded-xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 hover:border-bronze-500/40 transition-all shadow-sm"
            >
              <Link
                href={`/articles/${item.slug}`}
                className="relative w-28 sm:w-36 h-28 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden block"
              >
                <Image
                  src={item.featuredImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="150px"
                />
              </Link>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <Link
                    href={`/category/${item.category.slug}`}
                    className="text-[11px] font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider block mb-1 hover:underline"
                  >
                    {item.category.title}
                  </Link>
                  <h4 className="font-bold text-sm sm:text-base text-charcoal-900 dark:text-ivory-50 leading-snug line-clamp-2 group-hover:text-bronze-500 transition-colors">
                    <Link href={`/articles/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[11px] text-charcoal-400 pt-2">
                  <span>{item.author.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {item.readingTimeMinutes} د
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
