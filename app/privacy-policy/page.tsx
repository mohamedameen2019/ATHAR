import { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية بيانات الزوار في منصة أثر.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      <header className="pb-8 border-b border-ivory-200 dark:border-charcoal-800 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-2">
          سياسة الخصوصية وحماية البيانات
        </h1>
        <p className="text-xs text-charcoal-500">
          تاريخ آخر تحديث: مارس 2026 | الإصدار التحريري 1.0
        </p>
      </header>

      <div className="prose-editorial text-sm leading-relaxed space-y-6 text-charcoal-700 dark:text-charcoal-300">
        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            1. مقدمة والتزام عام
          </h2>
          <p>
            تلتزم منصة <strong>{siteConfig.nameArabic} ({siteConfig.name})</strong> بحماية خصوصية زوارها وقرائها ومستخدمي خدماتها الرقمية. توضح هذه السياسة طبيعة البيانات التي قد نجمعها، وكيفية استخدامها، والخيارات المتاحة لك بشأنها.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            2. البيانات التي نجمعها
          </h2>
          <p>
            - <strong>بيانات التصفح والتحليلات:</strong> نقوم بجمع بيانات إحصائية مجهولة المصدر (مثل نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها) عبر أدوات تحليلية متوافقة مثل Google Analytics لتحسين جودة وأداء المنصة.
          </p>
          <p>
            - <strong>بيانات الاشتراك في النشرة البريدية:</strong> عند إدخال بريدك الإلكتروني طواعية، نحتفظ به فقط لأغراض تزويدك بالرسالة الوثائقية الأسبوعية، ولا نقوم ببيعه أو تأجيره لأي طرف ثالث.
          </p>
          <p>
            - <strong>المقالات المحفوظة (Bookmarks):</strong> يتم تخزين قائمة مقالاتك المفضلة محلياً في متصفحك الخاص (Local Storage) ولا تُرسل إلى خوادمنا.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            3. ملفات تعريف الارتباط (Cookies)
          </h2>
          <p>
            نستخدم ملفات تعريف الارتباط الأساسية لحفظ تفضيل وضع القراءة (الوضع الليلي / النهاري)، وتحسين سرعة تحميل الصفحات. يمكنك تعديل إعدادات متصفحك لرفض الكوكيز في أي وقت.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            4. الإعلانات وشبكات الطرف الثالث
          </h2>
          <p>
            قد نستعين بشركاء إعلانيين معتمدين مثل Google AdSense لتقديم إعلانات غير معطلة للقراءة. تلتزم هذه الشبكات بإرشادات الخصوصية الصارمة، ويمكن للمستخدمين ضبط تفضيلات الإعلانات عبر إعدادات حساباتهم في Google.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 mb-3">
            5. التواصل مع مسؤول الخصوصية
          </h2>
          <p>
            إذا كان لديك أي سؤال أو طلب يتعلق ببياناتك، يرجى مراسلتنا على البريد الإلكتروني:{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-bronze-600 dark:text-bronze-400 font-semibold hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </p>
          <div className="p-4 rounded-lg bg-ivory-200/50 dark:bg-charcoal-900 text-xs text-charcoal-500 mt-4">
            <em>[بيانات المالك القانوني للمنصة: شركة {siteConfig.nameArabic} للإعلام الرقمي والتوثيق - السجل التجاري: [يُدرج رقم السجل لاحقاً]]</em>
          </div>
        </section>
      </div>
    </div>
  );
}
