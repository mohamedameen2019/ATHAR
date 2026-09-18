import Link from "next/link";
import { Article } from "@/types";
import { TrendingUp, Clock, Eye } from "lucide-react";
import { formatNumberArabic } from "@/lib/utils";

interface MostReadProps {
  articles: Article[];
}

export function MostRead({ articles }: MostReadProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-14 lg:my-20">
      <div className="flex items-center justify-between pb-4 border-b border-ivory-200 dark:border-charcoal-800 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
              الأكثر قراءة ومتابعة
            </h2>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              التحقيقات التي حظيت بأعلى نسب تفاعل واهتمام من جمهور المنصة
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 6).map((item, index) => {
          const rank = (index + 1).toString().padStart(2, "0");
          return (
            <article
              key={item.slug}
              className="group p-5 rounded-xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex gap-4 hover:border-bronze-500/40 transition-all shadow-sm"
            >
              {/* Number ranking */}
              <span className="text-3xl sm:text-4xl font-black text-bronze-500/40 dark:text-bronze-400/30 group-hover:text-bronze-500 transition-colors select-none">
                {rank}
              </span>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider block mb-1">
                    {item.category.title}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-charcoal-900 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors line-clamp-2">
                    <Link href={`/articles/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                </div>

                <div className="flex items-center justify-between text-[11px] text-charcoal-500 pt-3 mt-2 border-t border-ivory-200/50 dark:border-charcoal-800/50">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-bronze-500" />
                    {item.viewCount ? `${formatNumberArabic(item.viewCount)} قراءة` : "تحقيق حصري"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {item.readingTimeMinutes} د
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
