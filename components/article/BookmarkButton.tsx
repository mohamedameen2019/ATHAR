"use client";

import * as React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface BookmarkButtonProps {
  slug: string;
  title: string;
  categoryTitle: string;
  className?: string;
  showText?: boolean;
}

export function BookmarkButton({
  slug,
  title,
  categoryTitle,
  className = "",
  showText = false,
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("athar_bookmarks") || "[]");
      setIsSaved(saved.some((item: any) => item.slug === slug));
    } catch {
      setIsSaved(false);
    }
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("athar_bookmarks") || "[]");
      let nextList;
      let message = "";

      if (isSaved) {
        nextList = saved.filter((item: any) => item.slug !== slug);
        setIsSaved(false);
        message = "تمت إزالة المقال من قائمة محفوظاتك.";
      } else {
        nextList = [...saved, { slug, title, categoryTitle, savedAt: new Date().toISOString() }];
        setIsSaved(true);
        message = "تم حفظ المقال في قائمة قراءاتك.";
      }

      localStorage.setItem("athar_bookmarks", JSON.stringify(nextList));
      window.dispatchEvent(new Event("athar_bookmarks_updated"));

      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Error updating bookmarks:", err);
    }
  };

  return (
    <>
      <button
        onClick={toggleBookmark}
        type="button"
        className={`relative flex items-center justify-center gap-2 p-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bronze-500/40 ${
          isSaved
            ? "border-bronze-500 bg-bronze-500/10 text-bronze-600 dark:text-bronze-400"
            : "border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 text-charcoal-600 dark:text-charcoal-400 hover:text-bronze-500 hover:border-bronze-500/50"
        } ${className}`}
        title={isSaved ? "إزالة من المحفوظات" : "حفظ المقال للقراءة لاحقاً"}
        aria-label={isSaved ? "إزالة من المحفوظات" : "حفظ المقال للقراءة لاحقاً"}
      >
        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        {showText && (
          <span className="text-xs font-medium">
            {isSaved ? "محفوظ في قائمتك" : "حفظ المقال"}
          </span>
        )}
      </button>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 py-2.5 px-5 rounded-full bg-charcoal-950 text-ivory-50 dark:bg-ivory-50 dark:text-charcoal-950 text-xs font-medium shadow-xl border border-bronze-500/30 animate-fade-in flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-bronze-500" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
