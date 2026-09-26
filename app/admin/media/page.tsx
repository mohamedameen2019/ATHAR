"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Copy, Check, Image as ImageIcon, AlertCircle, RefreshCw } from "lucide-react";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (res.ok && data.files) {
        setFiles(data.files);
      }
    } catch (err: any) {
      console.error("Failed to load media files:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "فشل رفع الملف");
      }

      setSuccessMsg("تم رفع الصورة بنجاح إلى Supabase Storage!");
      fetchMedia();
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50">
            مكتبة الوسائط والصور
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            إدارة الصور والوسائط التوثيقية المرفوعة إلى Supabase Storage Bucket
          </p>
        </div>

        <button
          onClick={fetchMedia}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 hover:border-bronze-500 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>تحديث المكتبة</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="p-8 rounded-3xl border-2 border-dashed border-ivory-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-bronze-500/10 text-bronze-500 flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-charcoal-950 dark:text-ivory-50">
            رفع صور جديدة للتحقيقات
          </h3>
          <p className="text-xs text-charcoal-500 mt-1">
            صيغ الملفات المدعومة: WebP, AVIF, JPEG, PNG حتى 10 ميغابايت
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-bronze-500 hover:bg-bronze-600 text-white cursor-pointer transition-colors shadow-sm">
          <span>{uploading ? "جاري الرفع إلى Supabase..." : "اختيار ملف للرفع"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery Grid */}
      <div className="p-6 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-charcoal-950 dark:text-ivory-50 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-bronze-500" />
          الوسائط المحفوظة في Supabase ({files.length})
        </h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-charcoal-400">
            جاري فحص ملفات التخزين...
          </div>
        ) : files.length === 0 ? (
          <div className="py-12 text-center text-xs text-charcoal-400 space-y-2">
            <p>لا توجد وسائط مرفوعة في باكت التخزين articles-media حتى الآن.</p>
            <p className="text-[11px] text-charcoal-500">
              يمكنك رفع صور المقالات الجديدة أو استخدام الروابط الخارجية مباشرة.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-950 flex flex-col"
              >
                <div className="relative w-full h-32 bg-charcoal-100 dark:bg-charcoal-900">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5 flex items-center justify-between gap-1 text-[11px] border-t border-ivory-200 dark:border-charcoal-800">
                  <span className="truncate text-charcoal-600 dark:text-charcoal-300 font-mono text-[10px]">
                    {file.name}
                  </span>
                  <button
                    onClick={() => copyToClipboard(file.url)}
                    className="p-1 rounded hover:bg-bronze-500 hover:text-white transition-colors text-charcoal-500 flex-shrink-0"
                    title="نسخ الرابط المباشر"
                  >
                    {copiedUrl === file.url ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
