import Link from "next/link";
import Image from "next/image";
import { getAllCategories, getAllArticles } from "@/lib/articles";
import { FolderTree, ExternalLink, Hash } from "lucide-react";

export const metadata = {
  title: "إدارة التصنيفات | لوحة تحرير أثر",
};

export default async function AdminCategoriesPage() {
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllArticles(150),
  ]);

  // Compute article counts per category
  const counts: Record<string, number> = {};
  articles.forEach((a) => {
    const slug = a.category.slug;
    counts[slug] = (counts[slug] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
            أقسام وتصنيفات المنصة
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            إدارة التصنيفات الوثائقية والألوان التحريرية المرتبطة بها
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = counts[cat.slug] || cat.articleCount || 0;
          return (
            <div
              key={cat.id}
              className="p-5 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color || "#C5A880" }}
                    />
                    <h2 className="text-base font-bold text-charcoal-950 dark:text-ivory-50">
                      {cat.title}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-ivory-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300">
                    {cat.slug}
                  </span>
                </div>

                {cat.coverImage && (
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800">
                    <Image
                      src={cat.coverImage}
                      alt={cat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-ivory-200 dark:border-charcoal-800 flex items-center justify-between text-xs">
                <span className="text-charcoal-500 flex items-center gap-1 font-semibold">
                  <Hash className="w-3.5 h-3.5 text-bronze-500" />
                  {count} مقال في هذا القسم
                </span>

                <Link
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  className="text-bronze-500 hover:text-bronze-600 font-bold flex items-center gap-1"
                >
                  <span>عرض الأرشيف</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
