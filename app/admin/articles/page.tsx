"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatArabicDate } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const params = new URLSearchParams({
        limit: String(pageSize),
        offset: String(offset),
      });

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }
      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      const res = await fetch(`/api/admin/articles?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.data) {
        setArticles(data.data);
        setTotalCount(data.total || data.data.length);
      }
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  async function handleDelete(id: number) {
    setDeletingId(id);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "فشل حذف المقال");
      }

      setStatusMsg({ text: "تم حذف المقال بنجاح من قاعدة البيانات", type: "success" });
      setConfirmDeleteId(null);
      fetchArticles();
    } catch (err: any) {
      setStatusMsg({ text: err.message || "حدث خطأ أثناء الحذف", type: "error" });
    } finally {
      setDeletingId(null);
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
            إدارة المقالات والتحقيقات
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            إجمالي {totalCount} مقال موثق في قاعدة بيانات Supabase
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-bronze-500 hover:bg-bronze-600 text-white transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>كتابة مقال جديد</span>
        </Link>
      </div>

      {/* Notifications */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
            statusMsg.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="البحث في عناوين المقالات..."
            className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-ivory-50 dark:bg-charcoal-950 text-xs text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:border-bronze-500"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute right-3 top-3" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-56 px-3 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-ivory-50 dark:bg-charcoal-950 text-xs text-charcoal-900 dark:text-ivory-100 font-semibold focus:outline-none focus:border-bronze-500"
        >
          <option value="">جميع التصنيفات</option>
          <option value="ملفات وثائقية">ملفات وثائقية</option>
          <option value="الحضارات">الحضارات</option>
          <option value="التاريخ">التاريخ</option>
          <option value="العلوم">العلوم</option>
          <option value="الفضاء">الفضاء</option>
          <option value="التكنولوجيا">التكنولوجيا</option>
          <option value="الحروب">الحروب</option>
          <option value="دول العالم">دول العالم</option>
          <option value="الديانات والمعتقدات">الديانات والمعتقدات</option>
          <option value="اختيار المحررين">اختيار المحررين</option>
        </select>
      </div>

      {/* Articles Table */}
      <div className="rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-ivory-50 dark:bg-charcoal-850/80 border-b border-ivory-200 dark:border-charcoal-800 text-charcoal-500">
              <tr>
                <th className="py-3.5 px-4 font-semibold">المقال والملخص</th>
                <th className="py-3.5 px-4 font-semibold">التصنيف</th>
                <th className="py-3.5 px-4 font-semibold">المشاهدات</th>
                <th className="py-3.5 px-4 font-semibold">الحالة</th>
                <th className="py-3.5 px-4 font-semibold">تاريخ الإضافة</th>
                <th className="py-3.5 px-4 font-semibold text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100 dark:divide-charcoal-850">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-charcoal-400">
                    جاري تحميل المقالات من Supabase...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-charcoal-400">
                    لم يتم العثور على مقالات مطابقة لمعايير البحث.
                  </td>
                </tr>
              ) : (
                articles.map((article) => {
                  const posterUrl = article.poster || "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80";
                  return (
                    <tr key={article.id} className="hover:bg-ivory-50/50 dark:hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-ivory-200 dark:border-charcoal-700">
                            <Image
                              src={posterUrl}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/admin/articles/${article.id}/edit`}
                              className="font-bold text-charcoal-950 dark:text-ivory-50 hover:text-bronze-500 transition-colors line-clamp-1 block"
                            >
                              {article.title}
                            </Link>
                            <span className="text-[11px] text-charcoal-400 block line-clamp-1 mt-0.5">
                              {article.info || "بدون ملخص"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-ivory-200/60 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                          {article.category ? article.category.split(",")[0] : "عام"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-charcoal-600 dark:text-charcoal-400 font-sans">
                        {(article.views || 0).toLocaleString("ar-EG")}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            article.status === "draft"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {article.status === "draft" ? "مسودة" : "منشور"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-charcoal-500 text-[11px]">
                        {formatArabicDate(article.created_at)}
                      </td>

                      <td className="py-3.5 px-4 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="p-2 rounded-lg border border-ivory-200 dark:border-charcoal-700 hover:border-bronze-500 text-charcoal-700 dark:text-charcoal-300 transition-colors"
                            title="تعديل المقال"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/articles/${article.id}`}
                            target="_blank"
                            className="p-2 rounded-lg border border-ivory-200 dark:border-charcoal-700 hover:border-bronze-500 text-charcoal-500 transition-colors"
                            title="عرض في الموقع"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {confirmDeleteId === article.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(article.id)}
                                disabled={deletingId === article.id}
                                className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 transition-colors"
                              >
                                {deletingId === article.id ? "حذف..." : "تأكيد"}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1 rounded border border-charcoal-400 text-charcoal-400 text-[10px]"
                              >
                                إلغاء
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(article.id)}
                              className="p-2 rounded-lg border border-ivory-200 dark:border-charcoal-700 hover:border-rose-500 text-rose-500 transition-colors"
                              title="حذف المقال"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-4 border-t border-ivory-200 dark:border-charcoal-800 flex items-center justify-between text-xs text-charcoal-500">
          <span>
            الصفحة {currentPage} من {totalPages} (إجمالي {totalCount} مقال)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 disabled:opacity-40 flex items-center gap-1 hover:border-bronze-500 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              السابق
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || loading}
              className="px-3 py-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 disabled:opacity-40 flex items-center gap-1 hover:border-bronze-500 transition-colors"
            >
              التالي
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
