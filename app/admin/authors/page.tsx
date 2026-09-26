import Link from "next/link";
import Image from "next/image";
import { getAllAuthors } from "@/lib/articles";
import { Users, ExternalLink, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "إدارة الكتاب والباحثين | لوحة تحرير أثر",
};

export default async function AdminAuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
            فريق التحرير والباحثون المعتمدون
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            إدارة السير الذاتية والاعتمادات الأكاديمية لهيئة التحرير الوثائقية
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {authors.map((author) => (
          <div
            key={author.id}
            className="p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-bronze-500/40 flex-shrink-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-950 dark:text-ivory-50">
                    {author.name}
                  </h2>
                  <span className="text-xs text-bronze-600 dark:text-bronze-400 block font-semibold">
                    {author.role}
                  </span>
                </div>
              </div>

              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed line-clamp-3">
                {author.bio}
              </p>

              {author.credentials && author.credentials.length > 0 && (
                <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-950 border border-ivory-200 dark:border-charcoal-800 space-y-1">
                  <span className="text-[10px] font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider block flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    الاعتمادات الأكاديمية
                  </span>
                  {author.credentials.slice(0, 2).map((c, i) => (
                    <span key={i} className="text-[11px] text-charcoal-500 block truncate">
                      • {c}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-ivory-200 dark:border-charcoal-800 flex items-center justify-between text-xs">
              <span className="text-charcoal-400 font-mono text-[11px]">
                /author/{author.slug}
              </span>

              <Link
                href={`/author/${author.slug}`}
                target="_blank"
                className="text-bronze-500 hover:text-bronze-600 font-bold flex items-center gap-1"
              >
                <span>صفحة الكاتب</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
