import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { isSanityConfigured, projectId, dataset, apiVersion } from "@/sanity/lib/client";
import { Database, CheckCircle2, AlertCircle, Layers, ArrowLeft, Terminal, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "مركز إدارة المحتوى | Sanity Studio",
  description: "لوحة التحكم وإدارة Schemas والربط بـ Sanity CMS لمنصة أثر.",
};

export default function StudioInfoPage() {
  const schemasList = [
    { name: "article", title: "المقال الوثائقي (Article)", fields: "العنوان، المحتوى التحريري، الخط الزمني، الحقائق السريعة، المصادر، SEO" },
    { name: "author", title: "المؤلف والباحث (Author)", fields: "الاسم، السيرة الذاتية، الصورة، الاعتمادات، الروابط الأكاديمية" },
    { name: "category", title: "التصنيف (Category)", fields: "الاسم بالعربية والإنجليزية، الوصف، صورة الغلاف، لون التمييز" },
    { name: "timelineEvent", title: "أحداث الخط الزمني (Timeline Event)", fields: "التاريخ، عنوان الحدث، الوصف، الصورة التوثيقية" },
    { name: "siteSettings", title: "إعدادات المنصة (Site Settings)", fields: "اسم المنصة، الشعار، روابط التواصل، إعدادات SEO الافتراضية" },
    { name: "navigation", title: "قوائم التنقل (Navigation)", fields: "عناصر القائمة العلوية والفوتر" },
    { name: "blockContent", title: "المحتوى الغني (Portable Text)", fields: "الفقرات، العناوين، الاقتباسات، المربعات التوضيحية، الجداول" },
    { name: "tag", title: "الوسوم والكلمات المفتاحية (Tag)", fields: "عنوان الوسم والاسم اللطيف" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      <div className="flex items-center justify-between pb-6 border-b border-ivory-200 dark:border-charcoal-800 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>نظام إدارة المحتوى السحابي</span>
          </div>
          <h1 className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
            مركز إدارة Sanity CMS
          </h1>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-800 text-xs font-semibold hover:border-bronze-500 transition-colors"
        >
          العودة للمنصة
        </Link>
      </div>

      {/* Connection Status Banner */}
      <div
        className={`p-6 rounded-2xl border mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isSanityConfigured
            ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300"
            : "border-bronze-500/30 bg-bronze-500/5 text-charcoal-800 dark:text-charcoal-200"
        }`}
      >
        <div className="flex items-start gap-3">
          {isSanityConfigured ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-bronze-500 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <h3 className="font-bold text-base text-charcoal-950 dark:text-ivory-50">
              {isSanityConfigured
                ? "الاتصال بـ Sanity CMS مُفعل ونشط"
                : "المنصة تعمل حالياً في وضع الأرشيف الوثائقي المدمج (Demo & Fallback Mode)"}
            </h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mt-1 max-w-xl leading-relaxed">
              {isSanityConfigured
                ? `مشروع Sanity الحالي: (${projectId}) - قاعدة البيانات: (${dataset}) - إصدار API: (${apiVersion})`
                : "جميع المقالات والتحقيقات الـ 10 والأقسام تعمل فورياً وبجودة كاملة من الأرشيف الداخلي. لربط حساب Sanity السحابي الخاص بك، أضف NEXT_PUBLIC_SANITY_PROJECT_ID في ملف .env.local."}
            </p>
          </div>
        </div>

        {isSanityConfigured && (
          <a
            href={`https://${projectId}.sanity.studio`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex-shrink-0 shadow-sm"
          >
            فتح Sanity Studio الخارجي
          </a>
        )}
      </div>

      {/* Schemas Structure */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-bronze-500" />
          <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50">
            مخططات البيانات المجهزة للمشروع (Registered Schemas)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemasList.map((schema) => (
            <div
              key={schema.name}
              className="p-5 rounded-xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-charcoal-950 dark:text-ivory-50">
                  {schema.title}
                </h3>
                <code className="text-[11px] px-2 py-0.5 rounded bg-ivory-200/60 dark:bg-charcoal-800 text-bronze-600 dark:text-bronze-400 font-mono">
                  {schema.name}.ts
                </code>
              </div>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                الحقول: {schema.fields}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment & Setup Guide */}
      <div className="p-8 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-charcoal-950 text-white space-y-6">
        <div className="flex items-center gap-2 text-bronze-400 font-bold text-sm">
          <Terminal className="w-4 h-4" />
          <span>خطوات تشغيل وتصدير Sanity Studio</span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-charcoal-300">
          <p>
            1. أنشئ مشروعاً مجانياً على موقع <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="text-bronze-400 underline">Sanity.io</a>.
          </p>
          <p>
            2. انسخ معرف المشروع (Project ID) وضعه في ملف <code className="text-bronze-300">.env.local</code>:
          </p>
          <pre className="p-4 rounded-lg bg-charcoal-900 border border-charcoal-800 text-xs font-mono text-bronze-300 overflow-x-auto">
            NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id{"\n"}
            NEXT_PUBLIC_SANITY_DATASET=production{"\n"}
            SANITY_API_VERSION=2024-03-01
          </pre>
          <p>
            3. لتشغيل استديو Sanity المستقل ونشر الـ Schemas الموجودة في مجلد <code className="text-bronze-300">sanity/schemas</code>:
          </p>
          <pre className="p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 text-xs font-mono text-charcoal-300 overflow-x-auto">
            npx sanity deploy
          </pre>
        </div>
      </div>
    </div>
  );
}
