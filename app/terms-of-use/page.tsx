import { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "الشروط والأحكام المنظمة لاستخدام منصة أثر الوثائقية وحقوق الملكية الفكرية.",
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      <header className="pb-8 border-b border-ivory-200 dark:border-charcoal-800 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-2">
          شروط الاستخدام وحقوق النشر
        </h1>
        <p className="text-xs text-charcoal-500">
          تاريخ السريان: مارس 2026
        </p>
      </header>

      <div className="prose-editorial text-sm leading-relaxed space-y-6 text-charcoal-700 dark:text-charcoal-300">
        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            1. الملكية الفكرية وحقوق النشر
          </h2>
          <p>
            جميع النصوص، والرسومات البيانية، والخرائط التفاعلية، والتصاميم التحريرية المنشورة على منصة <strong>{siteConfig.nameArabic}</strong> هي نتاج بحثي واستقصائي محمي بموجب قوانين الملكية الفكرية الدولية.
          </p>
          <p>
            يُسمح بالاقتباس الأكاديمي والتعليمي المحدود بشرط الإشارة الصريحة للمنصة مع رابط مباشر للمقال الأصلي. يُحظر النسخ الكلي للمقالات أو إعادة نشرها لأغراض تجارية دون إذن كتابي مسبق من هيئة التحرير.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            2. الاستخدام المقبول للموقع
          </h2>
          <p>
            يُحظر استخدام أي أدوات آلية أو كشط بيانات (Web Scraping) تؤثر سلباً على أداء خوادم المنصة أو تتجاوز حدود الاستخدام العادل للأرشيف.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            3. التعديلات على الخدمة
          </h2>
          <p>
            تحتفظ إدارة المنصة بالحق في تحديث المقالات، وتعديل المكونات، أو إيقاف أي خدمة في أي وقت لتحسين تجربة القراءة وجودة المواد الوثائقية.
          </p>
          <div className="p-4 rounded-lg bg-ivory-200/50 dark:bg-charcoal-900 text-xs text-charcoal-500 mt-4">
            <em>[جهة الاختصاص القضائي: يُحدد بحسب المقر القانوني المسجل للمنصة في دولة [يُحدد لاحقاً]]</em>
          </div>
        </section>
      </div>
    </div>
  );
}
