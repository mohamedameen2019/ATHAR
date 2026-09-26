"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowLeft, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        setSuccessMsg("تم تسجيل الدخول بنجاح! جاري التوجيه إلى لوحة التحكم...");
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "فشل تسجيل الدخول. يرجى التحقق من البريد وكلمة المرور.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-ivory-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-ivory-100">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group mb-3">
            <span className="text-3xl font-bold tracking-tight text-charcoal-950 dark:text-ivory-50 font-serif">
              أَثَـر
            </span>
            <span className="text-xs tracking-widest text-bronze-500 uppercase block font-sans">
              ATHAR EDITORIAL
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-xs text-bronze-600 dark:text-bronze-400 font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>بوابة الإدارة وهيئة التحرير | Supabase Auth</span>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl border border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 shadow-xl space-y-6">
          <div className="border-b border-ivory-200 dark:border-charcoal-800 pb-4">
            <h1 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50">
              تسجيل الدخول الإداري
            </h1>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 leading-relaxed">
              أدخل بيانات حسابك المعتمد في Supabase لإدارة المقالات والأرشيف التوثيقي.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@athar.media"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-ivory-50 dark:bg-charcoal-950 text-xs text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:border-bronze-500"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-ivory-200 dark:border-charcoal-700 bg-ivory-50 dark:bg-charcoal-950 text-xs text-charcoal-950 dark:text-ivory-50 focus:outline-none focus:border-bronze-500"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-xs font-bold bg-bronze-500 hover:bg-bronze-600 text-white transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-2"
            >
              <Lock className="w-4 h-4" />
              {isLoading ? "جاري التحقق من الهوية..." : "الدخول إلى لوحة التحكم"}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="pt-4 border-t border-ivory-200 dark:border-charcoal-800 text-center">
            <p className="text-[11px] text-charcoal-400 leading-relaxed">
              تتم المصادقة بصورة آمنة ومباشرة عبر خوادم Supabase Auth المشفرة، مع تطبيق معايير الأمان وحماية الجلسات.
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-semibold text-charcoal-500 hover:text-bronze-500 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>العودة إلى الواجهة الرئيسية للمنصة</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
