"use client";

import * as React from "react";
import { siteConfig } from "@/site.config";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "inquiry",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    // Simulate server action / email delivery
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
    setFeedback("شكراً لتواصلك معنا. تم استلام رسالتك وسيقوم فريق التحرير بالرد في غضون 48 ساعة.");
    setFormData({ name: "", email: "", subject: "inquiry", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-3">
          اتصل بهيئة التحرير
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
          نرحب بمقترحات التحقيقات، والتصويبات التاريخية، واستفسارات الباحثين والشراكات الأكاديمية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                  البريد التحريري المباشر
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.editorialEmail}`}
                  className="text-sm font-semibold text-charcoal-950 dark:text-ivory-50 hover:text-bronze-500 transition-colors block mt-0.5"
                >
                  {siteConfig.contact.editorialEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-ivory-200/60 dark:border-charcoal-800/60">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                  المكاتب الإقليمية
                </h3>
                <p className="text-xs text-charcoal-700 dark:text-charcoal-300 mt-0.5 leading-relaxed">
                  {siteConfig.contact.location}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-bronze-500/30 bg-bronze-500/5 dark:bg-bronze-500/10 text-xs text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
            <h4 className="font-bold text-charcoal-950 dark:text-ivory-50 mb-1">
              ملاحظة بشأن مقترحات التحقيقات:
            </h4>
            يرجى إرفاق روابط المصادر والوثائق المبدئية عند اقتراح مواضيع استقصائية لتسريع مراجعتها من قبل المحررين.
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: د. أحمد خالد"
                  className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2">
                موضوع المراسلة
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
              >
                <option value="inquiry">استفسار عام</option>
                <option value="investigation">اقتراح تحقيق أو مقال وثائقي</option>
                <option value="correction">تصحيح معلومة تاريخية أو علمية</option>
                <option value="partnership">شراكة أكاديمية أو ترخيص محتوى</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-2">
                نص الرسالة *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب تفاصيل رسالتك أو استفسارك هنا..."
                className="w-full px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 font-bold text-sm hover:bg-bronze-500 dark:hover:bg-bronze-400 dark:hover:text-charcoal-950 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </>
              )}
            </button>

            {status === "success" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
