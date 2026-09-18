import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";

interface LongformSectionProps {
  articles: Article[];
}

export function LongformSection({ articles }: LongformSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-16 lg:my-24 py-12 px-6 sm:px-10 rounded-3xl bg-charcoal-950 text-white border border-charcoal-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-bronze-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-bronze-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-charcoal-800 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-bronze-400 tracking-widest uppercase mb-2">
            <BookOpen className="w-4 h-4" />
            <span>ملفات استقصائية كبرى</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            الوثائقيات الطويلة والمعمقة
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1 max-w-xl">
            دراسات استقصائية شاملة تتجاوز التغطية السريعة لتبني سرداً تاريخياً وعلمياً موثقاً بالمصادر الأصلية.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {articles.map((item) => (
          <article
            key={item.slug}
            className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-charcoal-800/80 bg-charcoal-900/60 backdrop-blur-sm hover:border-bronze-500/50 transition-all duration-300"
          >
            <div className="relative w-full h-64 sm:h-72 overflow-hidden">
              <Image
                src={item.featuredImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-sm text-xs font-medium text-bronze-400 border border-bronze-500/30">
                وثائقي مطوّل ({item.readingTimeMinutes} دقيقة)
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-xs font-bold text-bronze-400 uppercase tracking-wider block mb-2">
                  {item.category.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-bronze-300 transition-colors">
                  <Link href={`/articles/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm text-charcoal-300 line-clamp-3 mt-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between">
                <span className="text-xs text-charcoal-400">
                  بقلم: {item.author.name}
                </span>
                <Link
                  href={`/articles/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-bronze-400 hover:text-white transition-colors"
                >
                  <span>بدء المطالعة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
