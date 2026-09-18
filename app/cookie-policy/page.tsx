import { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "سياسة ملفات تعريف الارتباط (Cookie Policy)",
  description: "كيفية استخدام منصة أثر لملفات تعريف الارتباط والتفضيلات التقنية.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      <header className="pb-8 border-b border-ivory-200 dark:border-charcoal-800 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-2">
          سياسة ملفات تعريف الارتباط (Cookies)
        </h1>
        <p className="text-xs text-charcoal-500">
          تاريخ التحديث: مارس 2026
        </p>
      </header>

      <div className="prose-editorial text-sm leading-relaxed space-y-6 text-charcoal-700 dark:text-charcoal-300">
        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            ما هي ملفات تعريف الارتباط؟
          </h2>
          <p>
            ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند تصفح موقع <strong>{siteConfig.nameArabic}</strong>، بهدف تمكين وظائف تقنية أساسية وتحسين استجابة المنصة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            الملفات التي نستخدمها في المنصة
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-ivory-200 dark:border-charcoal-800">
              <h3 className="font-bold text-charcoal-950 dark:text-ivory-50 mb-1">
                1. ملفات التفضيلات الأساسية (Strictly Necessary):
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400">
                لحفظ وضع الثيم (داكن / نهاري) ومنع الوميض البصري عند التنقل بين الصفحات.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-ivory-200 dark:border-charcoal-800">
              <h3 className="font-bold text-charcoal-950 dark:text-ivory-50 mb-1">
                2. ملفات قياس الأداء والتحليلات (Analytics):
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400">
                لقياس حجم الزيارات وأوقات قراءة المقالات بشكل إجمالي دون التعرف على الهوية الشخصية للقارئ.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            التحكم في ملفات الكوكيز
          </h2>
          <p>
            يمكنك تعطيل أو مسح ملفات تعريف الارتباط في أي وقت من خلال إعدادات المتصفح الخاص بك (Chrome, Safari, Firefox, Edge).
          </p>
        </section>
      </div>
    </div>
  );
}
