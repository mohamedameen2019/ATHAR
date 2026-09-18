import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { Layers } from "lucide-react";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="my-14 lg:my-20">
      <div className="flex items-center justify-between pb-4 border-b border-ivory-200 dark:border-charcoal-800 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
              أقسام التحقيقات الكبرى
            </h2>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              تصفح الأرشيف الوثائقي بحسب الحقول المعرفية
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 flex flex-col justify-end p-6 shadow-sm"
          >
            {/* Background cover image */}
            <Image
              src={cat.coverImage}
              alt={cat.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 dark:opacity-40"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white group-hover:text-bronze-300 transition-colors">
                  {cat.title}
                </h3>
                {cat.articleCount && (
                  <span className="text-[11px] font-medium text-charcoal-300 px-2 py-0.5 rounded bg-charcoal-800/60">
                    {cat.articleCount} تحقيق
                  </span>
                )}
              </div>
              <p className="text-xs text-charcoal-300 mt-2 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
