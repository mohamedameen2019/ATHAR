"use client";

import * as React from "react";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

export function NewsletterBox() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await subscribeToNewsletter(email);
      if (res.success) {
        setStatus("success");
        setFeedback(res.message);
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(res.message);
      }
    } catch {
      setStatus("error");
      setFeedback("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <section className="my-16 lg:my-24 py-12 px-6 sm:px-12 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-100/60 dark:bg-charcoal-900/60 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 mb-2">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
          الرسالة الوثائقية الأسبوعية
        </h2>

        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed max-w-lg mx-auto">
          ملخص دوري تحريري يضم أحدث التحقيقات المكتشفة، ووثائق الأرشيف السرية، وتطورات الاستكشافات الكبرى في بريدك مباشرة. بدون إعلانات مزعجة.
        </p>

        <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني..."
              required
              disabled={status === "loading" || status === "success"}
              className="flex-1 px-4 py-3 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-950 text-sm text-charcoal-950 dark:text-ivory-50 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/40 disabled:opacity-50"
              aria-label="البريد الإلكتروني للاشتراك في النشرة"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-3 rounded-xl bg-charcoal-950 dark:bg-ivory-50 text-ivory-50 dark:text-charcoal-950 font-bold text-sm hover:bg-bronze-500 dark:hover:bg-bronze-400 dark:hover:text-charcoal-950 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 flex-shrink-0 shadow-sm"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>اشتراك</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}
        </form>

        <p className="text-[11px] text-charcoal-400 dark:text-charcoal-500 pt-2">
          نحترم خصوصيتك بالكامل. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.
        </p>
      </div>
    </section>
  );
}
