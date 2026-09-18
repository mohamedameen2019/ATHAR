"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Global app error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
          تعذر تحميل المحتوى المطلوب
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mb-6 leading-relaxed">
          نعتذر، حدث خطأ تقني غير متوقع أثناء استرجاع بيانات المقال أو الصفحة. يرجى المحاولة مرة أخرى.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-bold hover:bg-bronze-500 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-800 text-xs font-bold text-charcoal-700 dark:text-charcoal-300 hover:border-bronze-500 transition-colors"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
