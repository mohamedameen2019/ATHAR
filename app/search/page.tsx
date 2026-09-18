"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, X, Filter, Clock, Calendar, AlertCircle } from "lucide-react";
import { demoArticles } from "@/lib/data/demoArticles";
import { demoCategories } from "@/lib/data/demoCategories";
import { Article } from "@/types";
import { formatArabicDate } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("cat") || "";

  const [query, setQuery] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);

  // Sync state when URL params change
  React.useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("cat") || "");
  }, [searchParams]);

  const updateSearchUrl = (newQuery: string, newCat: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set("q", newQuery);
    if (newCat) params.set("cat", newCat);
    router.replace(`/search?${params.toString()}`);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    updateSearchUrl(val, selectedCategory);
  };

  const handleCategorySelect = (catSlug: string) => {
    const nextCat = selectedCategory === catSlug ? "" : catSlug;
    setSelectedCategory(nextCat);
    updateSearchUrl(query, nextCat);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedCategory("");
    router.replace("/search");
  };

  // Filter articles
  const results: Article[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return demoArticles.filter((article) => {
      const matchesCat = !selectedCategory || article.category.slug === selectedCategory;
      if (!matchesCat) return false;

      if (!q) return true;

      const inTitle = article.title.toLowerCase().includes(q);
      const inSubtitle = article.subtitle?.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
      const inAuthor = article.author.name.toLowerCase().includes(q);

      return inTitle || inSubtitle || inExcerpt || inTags || inAuthor;
    });
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-3">
          البحث في الأرشيف الوثائقي
        </h1>
        <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
          ابحث في المقالات، والوثائق التاريخية، والاكتشافات العلمية، والتحقيقات الاستقصائية.
        </p>

        {/* Search Input Bar */}
        <div className="relative mt-6">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-charcoal-400">
            <SearchIcon className="w-5 h-5 text-bronze-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="اكتب كلمة البحث (مثال: بومبي، أهرامات، جيمس ويب، إنيغما)..."
            className="w-full pr-12 pl-12 py-3.5 rounded-2xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-sm text-charcoal-950 dark:text-ivory-50 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/40 shadow-sm transition-all"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                updateSearchUrl("", selectedCategory);
              }}
              type="button"
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white"
              aria-label="مسح نص البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <button
            onClick={() => handleCategorySelect("")}
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              selectedCategory === ""
                ? "bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950"
                : "bg-ivory-200/50 dark:bg-charcoal-800/50 text-charcoal-600 dark:text-charcoal-300 hover:bg-ivory-200 dark:hover:bg-charcoal-800"
            }`}
          >
            جميع الأقسام
          </button>
          {demoCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-bronze-500 text-charcoal-950 font-bold"
                  : "bg-ivory-200/50 dark:bg-charcoal-800/50 text-charcoal-600 dark:text-charcoal-300 hover:bg-ivory-200 dark:hover:bg-charcoal-800"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta info */}
      <div className="flex items-center justify-between pb-4 border-b border-ivory-200 dark:border-charcoal-800 mb-8 text-xs text-charcoal-500">
        <div>
          {query ? (
            <span>
              نتائج البحث عن: <strong className="text-charcoal-900 dark:text-ivory-50">"{query}"</strong>
              {selectedCategory && ` في قسم (${demoCategories.find((c) => c.slug === selectedCategory)?.title})`}
            </span>
          ) : (
            <span>استعراض جميع التحقيقات المتاحة ({results.length})</span>
          )}
        </div>
        <div>
          <span>عُثر على {results.length} تحقيق</span>
        </div>
      </div>

      {/* Results List or Empty State */}
      {results.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-bronze-500/10 text-bronze-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
            لم نجد نتائج مطابقة لبحثك
          </h3>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-6 leading-relaxed">
            تأكد من كتابة الكلمات المفتاحية بشكل صحيح أو جرب استخدام مصطلحات أعم مثل "فضاء" أو "تاريخ" أو تصفح الأقسام مباشرة.
          </p>
          <button
            onClick={clearSearch}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-bold hover:bg-bronze-500 transition-colors"
          >
            إعادة تعيين البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm hover:border-bronze-500/40 transition-all duration-300"
            >
              <div>
                <Link
                  href={`/articles/${item.slug}`}
                  className="relative w-full h-52 overflow-hidden block"
                >
                  <Image
                    src={item.featuredImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded bg-charcoal-950/80 backdrop-blur-sm text-ivory-50 text-[11px] font-semibold">
                    {item.category.title}
                  </div>
                </Link>

                <div className="p-6">
                  <h2 className="font-bold text-lg text-charcoal-950 dark:text-ivory-50 leading-snug group-hover:text-bronze-500 transition-colors">
                    <Link href={`/articles/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 line-clamp-3 mt-2.5 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

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
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-charcoal-500">
          جاري تحميل محرك البحث...
        </div>
      }
    >
      <SearchContent />
    </React.Suspense>
  );
}
