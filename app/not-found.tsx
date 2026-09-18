import Link from "next/link";
import { Compass, ArrowLeft, Search } from "lucide-react";
import { siteConfig } from "@/site.config";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bronze-500/10 text-bronze-500 mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-sm font-black text-bronze-500 uppercase tracking-widest block mb-2 font-latin">
          404 ERROR
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-4">
          أثر مفقود في ركام التاريخ
        </h1>

        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed mb-8">
          يبدو أن التحقيق أو الصفحة التي تبحث عنها قد نُقلت إلى ركن آخر في الأرشيف الوثائقي أو أن رابطها تغير.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 text-xs font-bold hover:bg-bronze-500 dark:hover:bg-bronze-400 dark:hover:text-charcoal-950 transition-colors flex items-center justify-center gap-2"
          >
            <span>العودة للرئيسية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 text-charcoal-800 dark:text-charcoal-200 text-xs font-bold hover:border-bronze-500/50 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>البحث في الأرشيف</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
