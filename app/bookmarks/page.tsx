"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowLeft, BookOpen, Clock } from "lucide-react";
import { demoArticles } from "@/lib/data/demoArticles";
import { Article } from "@/types";

export default function BookmarksPage() {
  const [savedItems, setSavedItems] = React.useState<Array<{ slug: string; savedAt: string }>>([]);
  const [mounted, setMounted] = React.useState(false);

  const loadBookmarks = () => {
    try {
      const data = JSON.parse(localStorage.getItem("athar_bookmarks") || "[]");
      setSavedItems(data);
    } catch {
      setSavedItems([]);
    }
  };

  React.useEffect(() => {
    setMounted(true);
    loadBookmarks();

    window.addEventListener("athar_bookmarks_updated", loadBookmarks);
    return () => window.removeEventListener("athar_bookmarks_updated", loadBookmarks);
  }, []);

  const handleRemove = (slug: string) => {
    const nextList = savedItems.filter((item) => item.slug !== slug);
    setSavedItems(nextList);
    localStorage.setItem("athar_bookmarks", JSON.stringify(nextList));
    window.dispatchEvent(new Event("athar_bookmarks_updated"));
  };

  const handleClearAll = () => {
    if (confirm("هل أنت متأكد من رغبتك في إفراغ قائمة المقالات المحفوظة؟")) {
      setSavedItems([]);
      localStorage.removeItem("athar_bookmarks");
      window.dispatchEvent(new Event("athar_bookmarks_updated"));
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-sm text-charcoal-500">
        جاري تحميل المقالات المحفوظة...
      </div>
    );
  }

  // Find full article objects
  const bookmarkedArticles: Article[] = savedItems
    .map((item) => demoArticles.find((a) => a.slug === item.slug))
    .filter((a): a is Article => Boolean(a));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ivory-200 dark:border-charcoal-800 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider mb-2">
            <Bookmark className="w-4 h-4" />
            <span>المكتبة الشخصية</span>
          </div>
          <h1 className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
            المقالات المحفوظة للقراءة
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
            قائمة قراءاتك الخاصة المخزنة محلياً في متصفحك للرجوع إليها في أي وقت.
          </p>
        </div>

        {bookmarkedArticles.length > 0 && (
          <button
            onClick={handleClearAll}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-500/10 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>إفراغ القائمة</span>
          </button>
        )}
      </div>

      {/* Content */}
      {bookmarkedArticles.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto rounded-2xl border border-dashed border-ivory-300 dark:border-charcoal-800 p-8">
          <div className="w-14 h-14 rounded-full bg-bronze-500/10 text-bronze-500 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
            لا توجد مقالات محفوظة حالياً
          </h3>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-6 leading-relaxed">
            أثناء تصفحك للتحقيقات الوثائقية، انقر على زر "حفظ المقال" لإضافته إلى قائمتك وقراءته بتركيز لاحقاً.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-bold hover:bg-bronze-500 transition-colors"
          >
            <span>استكشف مقالات المنصة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedArticles.map((article) => (
            <div
              key={article.slug}
              className="p-5 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-bronze-500/40 transition-all shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider">
                    {article.category.title}
                  </span>
                  <span className="text-charcoal-400 text-xs">•</span>
                  <span className="text-xs text-charcoal-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-bronze-500" />
                    {article.readingTimeMinutes} دقائق قراءة
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-charcoal-950 dark:text-ivory-50 leading-snug hover:text-bronze-500 transition-colors">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-1 mt-1">
                  بقلم: {article.author.name}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  href={`/articles/${article.slug}`}
                  className="px-4 py-2 rounded-lg bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-bold hover:bg-bronze-500 transition-colors"
                >
                  قراءة المقال
                </Link>
                <button
                  onClick={() => handleRemove(article.slug)}
                  type="button"
                  className="p-2 rounded-lg border border-ivory-200 dark:border-charcoal-800 text-charcoal-400 hover:text-rose-500 hover:border-rose-500/30 transition-colors"
                  title="إزالة من المحفوظات"
                  aria-label="إزالة من المحفوظات"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
