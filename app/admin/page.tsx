import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { formatArabicDate } from "@/lib/utils";
import {
  FileText,
  Eye,
  FolderTree,
  Sparkles,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Database,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "لوحة التحكم | منصة أثر الوثائقية",
  description: "مركز الإدارة التحريرية وقاعدة بيانات Supabase لمنصة أثر.",
};

export default async function AdminDashboardPage() {
  const articles = await getAllArticles(150);

  // Compute metrics
  const totalArticles = articles.length;
  const totalViews = articles.reduce((acc, a) => acc + (a.viewCount || 0), 0);
  const featuredArticles = articles.filter((a) => a.isFeatured || a.isEditorPick).length;
  const longformCount = articles.filter((a) => a.isLongform).length;

  const recentArticles = articles.slice(0, 8);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>نظام إدارة المحتوى السحابي | Supabase PostgreSQL</span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
            مرحباً بك في لوحة تحرير منصة أثر
          </h1>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
            إدارة متكاملة للأرشيف الوثائقي والتحقيقات الصحفية والمصادر المعتمدة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-bronze-500 hover:bg-bronze-600 text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>كتابة مقال جديد</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-ivory-200 dark:border-charcoal-700 bg-ivory-50 dark:bg-charcoal-800 hover:border-bronze-500 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>الموقع المباشر</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm">
          <div className="flex items-center justify-between text-charcoal-500 mb-3">
            <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-400">إجمالي المقالات</span>
            <div className="p-2 rounded-xl bg-bronze-500/10 text-bronze-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 font-sans">
            {totalArticles}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">مقالة وتحقيق في قاعدة البيانات</p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm">
          <div className="flex items-center justify-between text-charcoal-500 mb-3">
            <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-400">إجمالي القراءات</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 font-sans">
            {totalViews.toLocaleString("ar-EG")}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">مشاهدة وقراءة موثقة للمقالات</p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm">
          <div className="flex items-center justify-between text-charcoal-500 mb-3">
            <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-400">اختيار المحررين</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 font-sans">
            {featuredArticles}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">تحقيق مثبت في الواجهة الرئيسية</p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm">
          <div className="flex items-center justify-between text-charcoal-500 mb-3">
            <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-400">التحقيقات المطولة</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 font-sans">
            {longformCount}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">تحقيق استقصائي ومطوّل</p>
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50">
              أحدث المقالات المضافة
            </h2>
            <p className="text-xs text-charcoal-500">
              قائمة بآخر التحقيقات والمقالات المسجلة في جدول articles
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="text-xs font-bold text-bronze-500 hover:text-bronze-600 flex items-center gap-1 transition-colors"
          >
            <span>عرض كل المقالات ({totalArticles})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Articles Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="border-b border-ivory-200 dark:border-charcoal-800 text-charcoal-500">
              <tr>
                <th className="pb-3 font-semibold">المقال</th>
                <th className="pb-3 font-semibold">التصنيف</th>
                <th className="pb-3 font-semibold">المشاهدات</th>
                <th className="pb-3 font-semibold">تاريخ النشر</th>
                <th className="pb-3 font-semibold text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100 dark:divide-charcoal-850">
              {recentArticles.map((article) => (
                <tr key={article.id} className="hover:bg-ivory-50/50 dark:hover:bg-charcoal-850/50">
                  <td className="py-3.5 pr-1 max-w-sm">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="font-bold text-charcoal-950 dark:text-ivory-50 hover:text-bronze-500 transition-colors line-clamp-1"
                    >
                      {article.title}
                    </Link>
                    <span className="text-[11px] text-charcoal-400 block mt-0.5 font-mono">
                      معرف: #{article.id}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-ivory-200/60 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                      {article.category.title}
                    </span>
                  </td>
                  <td className="py-3.5 text-charcoal-600 dark:text-charcoal-400 font-sans">
                    {(article.viewCount || 0).toLocaleString("ar-EG")}
                  </td>
                  <td className="py-3.5 text-charcoal-500">
                    {formatArabicDate(article.publishedAt)}
                  </td>
                  <td className="py-3.5 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="px-3 py-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 hover:border-bronze-500 text-charcoal-700 dark:text-charcoal-300 transition-colors"
                      >
                        تعديل
                      </Link>
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 hover:border-bronze-500 text-charcoal-500 transition-colors"
                        title="معاينة في الموقع"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
