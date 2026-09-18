"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search, Bookmark, Compass, Sparkles } from "lucide-react";
import { siteConfig } from "@/site.config";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-ivory-50 dark:bg-charcoal-900 border-l border-ivory-200 dark:border-charcoal-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
        <div>
          {/* Top close & brand */}
          <div className="flex items-center justify-between pb-6 border-b border-ivory-200 dark:border-charcoal-800">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-charcoal-950 dark:bg-ivory-50 flex items-center justify-center text-ivory-50 dark:text-charcoal-950 font-bold text-sm tracking-wider">
                أَ
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight">
                  {siteConfig.nameArabic}
                </span>
                <span className="text-[10px] text-bronze-500 font-medium tracking-widest mt-0.5 uppercase">
                  {siteConfig.name}
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 dark:hover:text-ivory-50 hover:bg-ivory-200/50 dark:hover:bg-charcoal-800 transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search & Bookmarks */}
          <div className="my-5 grid grid-cols-2 gap-2">
            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-ivory-200/60 dark:bg-charcoal-800/60 text-sm font-medium hover:bg-ivory-200 dark:hover:bg-charcoal-800 transition-colors text-charcoal-800 dark:text-charcoal-200"
            >
              <Search className="w-4 h-4 text-bronze-500" />
              <span>البحث</span>
            </Link>
            <Link
              href="/bookmarks"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-ivory-200/60 dark:bg-charcoal-800/60 text-sm font-medium hover:bg-ivory-200 dark:hover:bg-charcoal-800 transition-colors text-charcoal-800 dark:text-charcoal-200"
            >
              <Bookmark className="w-4 h-4 text-bronze-500" />
              <span>المحفوظات</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-charcoal-400 dark:text-charcoal-500 uppercase">
              أقسام المنصة
            </div>
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 font-bold"
                      : "text-charcoal-700 dark:text-charcoal-300 hover:bg-ivory-100 dark:hover:bg-charcoal-800/50 hover:text-charcoal-950 dark:hover:text-white"
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Pages */}
          <div className="mt-6 pt-6 border-t border-ivory-200 dark:border-charcoal-800 space-y-1 text-xs">
            <Link
              href="/about"
              onClick={onClose}
              className="block px-3 py-2 text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white"
            >
              عن المنصة والميثاق التحريري
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block px-3 py-2 text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white"
            >
              اتصل بهيئة التحرير
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-ivory-200 dark:border-charcoal-800 text-[11px] text-charcoal-400">
          <p>{siteConfig.tagline}</p>
          <p className="mt-1">© {new Date().getFullYear()} {siteConfig.nameArabic}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
}
