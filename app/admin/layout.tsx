"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  Database,
  Menu,
  X,
  Shield,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // If on login page, render children directly without admin chrome
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setUserEmail(data.user.email);
        }
      });
    } catch {
      // Supabase client error handled gracefully
    }
  }, [isLoginPage]);

  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    router.push("/admin/login");
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { title: "نظرة عامة", href: "/admin", icon: LayoutDashboard },
    { title: "إدارة المقالات", href: "/admin/articles", icon: FileText },
    { title: "مقال جديد", href: "/admin/articles/new", icon: PlusCircle },
    { title: "التصنيفات", href: "/admin/categories", icon: FolderTree },
    { title: "الكتاب والباحثون", href: "/admin/authors", icon: Users },
    { title: "مكتبة الوسائط", href: "/admin/media", icon: ImageIcon },
    { title: "إعدادات المنصة", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-ivory-100 dark:bg-charcoal-950 text-charcoal-900 dark:text-ivory-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden p-4 border-b border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-bold font-serif text-charcoal-950 dark:text-ivory-50">أَثَـر</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bronze-500/15 text-bronze-600 dark:text-bronze-400 font-bold">
            ADMIN
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl border border-ivory-200 dark:border-charcoal-800 text-charcoal-700 dark:text-charcoal-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 right-0 z-40 h-screen w-64 border-l border-ivory-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-ivory-200 dark:border-charcoal-800">
            <Link href="/admin" className="block group">
              <span className="text-2xl font-bold tracking-tight text-charcoal-950 dark:text-ivory-50 font-serif">
                أَثَـر
              </span>
              <span className="text-[10px] tracking-widest text-bronze-500 uppercase block font-sans font-bold">
                لوحة التحكم التحريرية
              </span>
            </Link>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Supabase متصل</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-bronze-500 text-white shadow-sm"
                      : "text-charcoal-700 dark:text-charcoal-300 hover:bg-ivory-100 dark:hover:bg-charcoal-800 hover:text-charcoal-950 dark:hover:text-ivory-50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-ivory-200 dark:border-charcoal-800 space-y-2">
          {userEmail && (
            <div className="px-3 py-2 rounded-xl bg-ivory-100 dark:bg-charcoal-800 text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
              {userEmail}
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 hover:bg-ivory-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              زيارة الموقع المباشر
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors text-right"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
