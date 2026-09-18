import { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "إخلاء المسؤولية التحريرية والتوثيقية",
  description: "إخلاء المسؤولية التوثيقية والبحثية لمنصة أثر.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      <header className="pb-8 border-b border-ivory-200 dark:border-charcoal-800 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-2">
          إخلاء المسؤولية التوثيقية والبحثية
        </h1>
        <p className="text-xs text-charcoal-500">
          تاريخ السريان: مارس 2026
        </p>
      </header>

      <div className="prose-editorial text-sm leading-relaxed space-y-6 text-charcoal-700 dark:text-charcoal-300">
        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            1. الطبيعة التثقيفية والبحثية للمحتوى
          </h2>
          <p>
            المحتوى المنشور على منصة <strong>{siteConfig.nameArabic}</strong> مخصص لأغراض الإثراء المعرفي، والتوثيق التاريخي، والاستكشاف العلمي. نبذل قصارى جهدنا لضمان دقة وصحة المعلومات عبر إسنادها إلى دراسات محكّمة ومصادر موثقة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            2. الطبيعة المتجددة للعلوم والآثار
          </h2>
          <p>
            علم الآثار والفيزياء الفلكية حقول ديناميكية تخضع لاكتشافات مستمرة. إن الفرضيات التي كانت مقبولة في وقت نشر تحقيق ما قد يُعاد تقييمها لاحقاً في ضوء لقى أثرية أو تقنيات رصد جديدة. تحرص المنصة على تحديث المقالات متى ما توفرت بيانات حاسمة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            3. الروابط الخارجية
          </h2>
          <p>
            قد تتضمن مقالاتنا روابط إلى مواقع ودوريات خارجية بهدف تسهيل اطلاع القارئ على المصادر الأصلية. لا تتحمل المنصة أي مسؤولية عن محتوى أو سياسات تلك المواقع المستقلة.
          </p>
        </section>
      </div>
    </div>
  );
}
