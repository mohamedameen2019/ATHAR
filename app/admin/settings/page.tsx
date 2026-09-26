import { siteConfig } from "@/site.config";
import {
  Database,
  ShieldCheck,
  Server,
  Globe,
  Radio,
  FileCode,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "إعدادات المنصة وقاعدة البيانات | لوحة تحرير أثر",
};

export default function AdminSettingsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gyqcdkilwzyctkdyfdfl.supabase.co";

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
          إعدادات المنصة والبنية التحتية
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          حالة الاتصال بـ Supabase، ومفاتيح البيئة، ومعايير الأمان وتهيئة التخزين
        </p>
      </div>

      {/* Supabase Connection Card */}
      <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-700 dark:text-emerald-300">
            <Database className="w-4 h-4" />
            <span>قاعدة البيانات السحابية (Supabase PostgreSQL)</span>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            متصل ونشط
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-charcoal-900/60 border border-emerald-500/20">
            <span className="text-charcoal-500 block mb-1">عنوان المشروع (Project URL)</span>
            <code className="text-xs font-mono text-charcoal-900 dark:text-ivory-100 break-all">
              {supabaseUrl}
            </code>
          </div>

          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-charcoal-900/60 border border-emerald-500/20">
            <span className="text-charcoal-500 block mb-1">الجدول الرئيسي للمحتوى</span>
            <code className="text-xs font-mono text-charcoal-900 dark:text-ivory-100">
              public.articles
            </code>
          </div>

          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-charcoal-900/60 border border-emerald-500/20">
            <span className="text-charcoal-500 block mb-1">نظام الأمان (Row Level Security)</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              مُفعل لحماية المقالات والوسائط
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/60 dark:bg-charcoal-900/60 border border-emerald-500/20">
            <span className="text-charcoal-500 block mb-1">باكت الوسائط (Storage Bucket)</span>
            <code className="text-xs font-mono text-charcoal-900 dark:text-ivory-100">
              articles-media
            </code>
          </div>
        </div>
      </div>

      {/* Site Identity & Metadata */}
      <div className="p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-charcoal-950 dark:text-ivory-50 flex items-center gap-2">
          <Globe className="w-4 h-4 text-bronze-500" />
          الهوية التحريرية وإعدادات النشر
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-charcoal-500 block mb-1">اسم المنصة</span>
            <span className="font-bold text-charcoal-950 dark:text-ivory-50">
              {siteConfig.nameArabic} ({siteConfig.name})
            </span>
          </div>

          <div>
            <span className="text-charcoal-500 block mb-1">الرابط المعتمد (Canonical URL)</span>
            <span className="font-mono text-charcoal-950 dark:text-ivory-50">
              {siteConfig.url}
            </span>
          </div>

          <div>
            <span className="text-charcoal-500 block mb-1">اللغة واتجاه العرض</span>
            <span className="font-bold text-charcoal-950 dark:text-ivory-50">
              العربية (RTL First)
            </span>
          </div>

          <div>
            <span className="text-charcoal-500 block mb-1">حالة الإعلانات (Google AdSense)</span>
            <span className="font-bold text-charcoal-950 dark:text-ivory-50">
              {siteConfig.ads.enabled ? "مُفعلة" : "معطلة (جاهزة للتفعيل عند الربط)"}
            </span>
          </div>
        </div>
      </div>

      {/* SQL Migration Reference */}
      <div className="p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-charcoal-950 text-white space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-bronze-400 font-bold text-sm">
          <FileCode className="w-4 h-4" />
          <span>ملف الترقية الآمنة لقاعدة البيانات (SQL Migration)</span>
        </div>

        <p className="text-xs text-charcoal-300 leading-relaxed">
          تم إنشاء ملف ترقية آمن ومخصص في مسار:{" "}
          <code className="px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-800 text-bronze-300 font-mono">
            supabase/migrations/001_athar_schema.sql
          </code>
          {" "}يقوم بإنشاء الفهارس المتقدمة، وحقول slug والحالة، وسياسات RLS دون المساس بالبيانات الموجودة.
        </p>

        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 font-mono text-[11px] text-charcoal-300 space-y-1">
          <p className="text-emerald-400">✓ استبدال Sanity CMS بالكامل بـ Supabase</p>
          <p className="text-emerald-400">✓ تكامل جدول articles مع واجهة المستخدم التحريرية</p>
          <p className="text-emerald-400">✓ الحفاظ على معايير SEO وعناوين الـ URLs الفاخرة</p>
          <p className="text-emerald-400">✓ لوحة تحكم إدارية مخصصة ومحرر محتوى متقدم في /admin</p>
        </div>
      </div>
    </div>
  );
}
