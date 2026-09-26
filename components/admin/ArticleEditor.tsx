"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowRight,
  Plus,
  Trash2,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle2,
  Film,
  Link as LinkIcon,
  Quote,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

export interface EditorTopic {
  topic: string;
  introduction: string;
  text: string;
  conclusion: string;
  source: Array<{ src: string; title?: string }>;
  video: Array<{ url: string }>;
  image: Array<{ url: string; caption?: string }>;
}

export interface ArticleFormData {
  id?: number | string;
  title: string;
  slug: string;
  info: string;
  category: string;
  sub_category: string;
  region: string;
  poster: string;
  reading_time: number;
  status: "published" | "draft";
  content: EditorTopic[];
}

interface ArticleEditorProps {
  initialData?: ArticleFormData;
  isEditing?: boolean;
}

export function ArticleEditor({ initialData, isEditing = false }: ArticleEditorProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ArticleFormData>(
    initialData || {
      title: "",
      slug: "",
      info: "",
      category: "ملفات وثائقية",
      sub_category: "",
      region: "الشرق الأوسط",
      poster: "",
      reading_time: 8,
      status: "published",
      content: [
        {
          topic: "",
          introduction: "",
          text: "",
          conclusion: "",
          source: [],
          video: [],
          image: [],
        },
      ],
    }
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Handle image upload to Supabase Storage
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "فشل رفع الصورة");
      }

      setFormData((prev) => ({ ...prev, poster: data.url }));
      setSuccessMsg("تم رفع الصورة بنجاح إلى Supabase Storage!");
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  }

  // Topic handlers
  function addTopic() {
    setFormData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        {
          topic: "",
          introduction: "",
          text: "",
          conclusion: "",
          source: [],
          video: [],
          image: [],
        },
      ],
    }));
  }

  function removeTopic(index: number) {
    if (formData.content.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  }

  function updateTopic(index: number, field: keyof EditorTopic, value: any) {
    setFormData((prev) => {
      const nextContent = [...prev.content];
      nextContent[index] = { ...nextContent[index], [field]: value };
      return { ...prev, content: nextContent };
    });
  }

  // Source item handlers
  function addSource(topicIdx: number) {
    const topic = formData.content[topicIdx];
    const nextSources = [...(topic.source || []), { src: "", title: "" }];
    updateTopic(topicIdx, "source", nextSources);
  }

  function updateSource(topicIdx: number, srcIdx: number, field: "src" | "title", val: string) {
    const topic = formData.content[topicIdx];
    const nextSources = [...(topic.source || [])];
    nextSources[srcIdx] = { ...nextSources[srcIdx], [field]: val };
    updateTopic(topicIdx, "source", nextSources);
  }

  function removeSource(topicIdx: number, srcIdx: number) {
    const topic = formData.content[topicIdx];
    const nextSources = (topic.source || []).filter((_, i) => i !== srcIdx);
    updateTopic(topicIdx, "source", nextSources);
  }

  // Video item handlers
  function addVideo(topicIdx: number) {
    const topic = formData.content[topicIdx];
    const nextVideos = [...(topic.video || []), { url: "" }];
    updateTopic(topicIdx, "video", nextVideos);
  }

  function updateVideo(topicIdx: number, vidIdx: number, val: string) {
    const topic = formData.content[topicIdx];
    const nextVideos = [...(topic.video || [])];
    nextVideos[vidIdx] = { url: val };
    updateTopic(topicIdx, "video", nextVideos);
  }

  function removeVideo(topicIdx: number, vidIdx: number) {
    const topic = formData.content[topicIdx];
    const nextVideos = (topic.video || []).filter((_, i) => i !== vidIdx);
    updateTopic(topicIdx, "video", nextVideos);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg("يرجى إدخال عنوان المقال");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const endpoint = isEditing ? `/api/admin/articles/${formData.id}` : "/api/admin/articles";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok || resData.error) {
        throw new Error(resData.error || "فشل حفظ المقال");
      }

      setSuccessMsg("تم حفظ المقال بنجاح في قاعدة بيانات Supabase!");
      setTimeout(() => {
        router.push("/admin/articles");
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء حفظ المقال");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 sticky top-4 z-20 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-xl border border-ivory-200 dark:border-charcoal-800 hover:border-bronze-500 transition-colors text-charcoal-600 dark:text-charcoal-300"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50">
              {isEditing ? `تعديل المقال: ${formData.title.slice(0, 30)}...` : "إنشاء مقال وثائقي جديد"}
            </h1>
            <p className="text-xs text-charcoal-500">
              {isEditing ? `معرف المقال: ${formData.id}` : "إضافة تحقيق إلى قاعدة بيانات Supabase"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab toggle */}
          <div className="flex rounded-xl p-1 bg-ivory-200/50 dark:bg-charcoal-800 border border-ivory-200 dark:border-charcoal-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "edit"
                  ? "bg-bronze-500 text-white shadow-sm"
                  : "text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-ivory-50"
              }`}
            >
              التحرير
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                activeTab === "preview"
                  ? "bg-bronze-500 text-white shadow-sm"
                  : "text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-ivory-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              المعاينة
            </button>
          </div>

          {/* Status selector */}
          <select
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-ivory-100"
          >
            <option value="published">منشور للجمهور</option>
            <option value="draft">مسودة داخلية</option>
          </select>

          {/* Save button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-bronze-500 text-white hover:bg-bronze-600 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "جاري الحفظ..." : "حفظ المقال"}
          </button>
        </div>
      </div>

      {/* Alert notifications */}
      {errorMsg && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeTab === "edit" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Info Card */}
            <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 space-y-4">
              <h2 className="text-sm font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                البيانات الأساسية للمقال
              </h2>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  عنوان المقال الوثائقي *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: سقوط بومبي: الساعات الأخيرة لمدينة دفنها الرماد"
                  className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm font-bold text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:border-bronze-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  الملخص التحريري (المقدمة) *
                </label>
                <textarea
                  rows={3}
                  value={formData.info}
                  onChange={(e) => setFormData((prev) => ({ ...prev, info: e.target.value }))}
                  placeholder="مقدمة وثائقية مشوقة تلخص أهم محاور التحقيق..."
                  className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs text-charcoal-800 dark:text-charcoal-200 focus:outline-none focus:border-bronze-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  الاسم اللطيف للرابط (Slug - اختياري)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="مثال: the-fall-of-pompeii أو يترك فارغاً للتوليد التلقائي"
                  className="w-full px-4 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs text-charcoal-800 dark:text-charcoal-200 focus:outline-none focus:border-bronze-500"
                />
              </div>
            </div>

            {/* Content Topics / Sections */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-charcoal-950 dark:text-ivory-50 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-bronze-500" />
                  أقسام ومحاور التحقيق ({formData.content.length})
                </h2>
                <button
                  type="button"
                  onClick={addTopic}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-bronze-500/40 text-bronze-600 dark:text-bronze-400 bg-bronze-500/10 hover:bg-bronze-500 hover:text-white transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  إضافة قسم جديد
                </button>
              </div>

              {formData.content.map((topic, tIdx) => (
                <div
                  key={tIdx}
                  className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-ivory-200 dark:border-charcoal-800 pb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-bronze-500/15 text-bronze-700 dark:text-bronze-300">
                      القسم #{tIdx + 1}
                    </span>
                    {formData.content.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(tIdx)}
                        className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        حذف القسم
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                      عنوان القسم / المحور الفرعي (H2)
                    </label>
                    <input
                      type="text"
                      value={topic.topic}
                      onChange={(e) => updateTopic(tIdx, "topic", e.target.value)}
                      placeholder="مثال: شهادة العيان الوحيدة: رسائل بليني الصغير"
                      className="w-full px-3.5 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs font-bold text-charcoal-950 dark:text-ivory-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                      التمهيد أو المربع التوضيحي (Callout / Intro)
                    </label>
                    <input
                      type="text"
                      value={topic.introduction}
                      onChange={(e) => updateTopic(tIdx, "introduction", e.target.value)}
                      placeholder="تمهيد بارز للمحور يظهر في مربع توضيحي مظلل..."
                      className="w-full px-3.5 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs text-charcoal-800 dark:text-charcoal-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                      النص التوثيقي الرئيسي (افصل بين الفقرات بسطر جديد)
                    </label>
                    <textarea
                      rows={5}
                      value={topic.text}
                      onChange={(e) => updateTopic(tIdx, "text", e.target.value)}
                      placeholder="اكتب تفاصيل التحقيق والمضمون التوثيقي هنا..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs text-charcoal-800 dark:text-charcoal-200 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1 flex items-center gap-1">
                      <Quote className="w-3.5 h-3.5 text-bronze-500" />
                      الخلاصة أو الاقتباس البارز (Quote / Conclusion)
                    </label>
                    <input
                      type="text"
                      value={topic.conclusion}
                      onChange={(e) => updateTopic(tIdx, "conclusion", e.target.value)}
                      placeholder="اقتباس أو جملة تلخيصية تظهر كاقتباس عريض..."
                      className="w-full px-3.5 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs text-charcoal-800 dark:text-charcoal-200"
                    />
                  </div>

                  {/* Topic Video Link */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 flex items-center gap-1">
                        <Film className="w-3.5 h-3.5 text-bronze-500" />
                        فيديو توثيقي مدمج (YouTube)
                      </span>
                      <button
                        type="button"
                        onClick={() => addVideo(tIdx)}
                        className="text-xs text-bronze-500 hover:text-bronze-600 flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        إضافة فيديو
                      </button>
                    </div>
                    {(topic.video || []).map((vid, vIdx) => (
                      <div key={vIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={vid.url}
                          onChange={(e) => updateVideo(tIdx, vIdx, e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeVideo(tIdx, vIdx)}
                          className="p-1.5 text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Topic Sources */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 flex items-center gap-1">
                        <LinkIcon className="w-3.5 h-3.5 text-bronze-500" />
                        المصادر والمراجع التوثيقية
                      </span>
                      <button
                        type="button"
                        onClick={() => addSource(tIdx)}
                        className="text-xs text-bronze-500 hover:text-bronze-600 flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" />
                        إضافة مصدر
                      </button>
                    </div>
                    {(topic.source || []).map((src, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={src.src}
                          onChange={(e) => updateSource(tIdx, sIdx, "src", e.target.value)}
                          placeholder="رابط المصدر: https://..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeSource(tIdx, sIdx)}
                          className="p-1.5 text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Poster / Featured Image */}
            <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 space-y-4">
              <h3 className="text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider">
                صورة الغلاف الرئيسية (Poster)
              </h3>

              {formData.poster ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-ivory-200 dark:border-charcoal-800">
                  <Image
                    src={formData.poster}
                    alt={formData.title || "غلاف المقال"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-36 rounded-xl border-2 border-dashed border-ivory-300 dark:border-charcoal-700 flex flex-col items-center justify-center text-xs text-charcoal-400 gap-2">
                  <Upload className="w-6 h-6" />
                  <span>لم يتم تحديد صورة غلاف بعد</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-charcoal-600 dark:text-charcoal-400 mb-1">
                  رابط الصورة المباشر
                </label>
                <input
                  type="url"
                  value={formData.poster}
                  onChange={(e) => setFormData((prev) => ({ ...prev, poster: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-600 dark:text-charcoal-400 mb-1">
                  أو رفع ملف إلى Supabase Storage
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full text-xs text-charcoal-600 dark:text-charcoal-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-bronze-500/10 file:text-bronze-600 hover:file:bg-bronze-500/20"
                />
                {isUploading && <span className="text-[11px] text-bronze-500 mt-1 block">جاري الرفع...</span>}
              </div>
            </div>

            {/* Classification & Metadata */}
            <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 space-y-4">
              <h3 className="text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider">
                التصنيف والبيانات الوصفية
              </h3>

              <div>
                <label className="block text-xs font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                  التصنيف الرئيسي
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs font-semibold"
                >
                  <option value="ملفات وثائقية, اختيار المحررين">ملفات وثائقية (اختيار المحررين)</option>
                  <option value="الحضارات">الحضارات</option>
                  <option value="التاريخ">التاريخ</option>
                  <option value="العلوم">العلوم</option>
                  <option value="الفضاء">الفضاء</option>
                  <option value="التكنولوجيا">التكنولوجيا</option>
                  <option value="الحروب">الحروب</option>
                  <option value="الطبيعة">الطبيعة</option>
                  <option value="دول العالم">دول العالم</option>
                  <option value="الديانات والمعتقدات">الديانات والمعتقدات</option>
                  <option value="ما وراء الواقع">ما وراء الواقع</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                  الوسوم والتصنيفات الفرعية (مفصولة بفاصلة)
                </label>
                <input
                  type="text"
                  value={formData.sub_category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sub_category: e.target.value }))}
                  placeholder="مثال: روما القديمة, علم الآثار, براكين"
                  className="w-full px-3 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-700 dark:text-charcoal-300 mb-1">
                  المنطقة أو الدولة
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData((prev) => ({ ...prev, region: e.target.value }))}
                  placeholder="مثال: مصر، إيطاليا، الشرق الأوسط"
                  className="w-full px-3 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-700 dark:text-charcoal-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-bronze-500" />
                  مدة القراءة التقديرية (دقائق)
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.reading_time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reading_time: parseInt(e.target.value, 10) || 8 }))}
                  className="w-full px-3 py-2 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Tab */
        <div className="p-8 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-950 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-bronze-500/15 text-bronze-700 dark:text-bronze-300 border border-bronze-500/30">
              {formData.category}
            </span>
            <h1 className="text-3xl font-bold text-charcoal-950 dark:text-ivory-50 leading-tight">
              {formData.title || "عنوان المقال التحريري"}
            </h1>
            {formData.info && (
              <p className="text-base text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto leading-relaxed">
                {formData.info}
              </p>
            )}
          </div>

          {formData.poster && (
            <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800">
              <Image src={formData.poster} alt={formData.title} fill className="object-cover" />
            </div>
          )}

          <div className="prose-editorial max-w-2xl mx-auto pt-6 space-y-6">
            {formData.content.map((topic, i) => (
              <div key={i} className="space-y-3">
                {topic.topic && (
                  <h2 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 border-r-4 border-bronze-500 pr-3">
                    {topic.topic}
                  </h2>
                )}
                {topic.introduction && (
                  <div className="p-4 rounded-xl border border-bronze-500/30 bg-ivory-100/70 dark:bg-charcoal-900/70 text-xs leading-relaxed text-charcoal-800 dark:text-charcoal-200">
                    {topic.introduction}
                  </div>
                )}
                {topic.text && (
                  <div className="space-y-3">
                    {topic.text.split("\n").map((p, pIdx) => (
                      <p key={pIdx} className="text-sm text-charcoal-800 dark:text-charcoal-200 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
                {topic.conclusion && (
                  <blockquote className="text-charcoal-900 dark:text-ivory-100 border-r-4 border-bronze-500 bg-bronze-500/5 p-4 rounded-l-xl italic text-sm">
                    &ldquo;{topic.conclusion}&rdquo;
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
