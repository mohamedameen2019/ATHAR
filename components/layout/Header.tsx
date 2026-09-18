"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Bookmark } from "lucide-react";
import { siteConfig } from "@/site.config";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-250 ${
          isScrolled
            ? "bg-ivory-50/95 dark:bg-charcoal-950/95 backdrop-blur-md border-b border-ivory-200/80 dark:border-charcoal-800/80 shadow-sm"
            : "bg-ivory-50/80 dark:bg-charcoal-950/80 backdrop-blur-sm border-b border-ivory-200/40 dark:border-charcoal-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-bronze-500/40 rounded-lg p-1"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-charcoal-950 dark:bg-ivory-50 flex items-center justify-center text-ivory-50 dark:text-charcoal-950 font-bold text-base md:text-lg tracking-wider transition-transform duration-200 group-hover:scale-105 shadow-sm">
                  أَ
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl md:text-2xl leading-none tracking-tight text-charcoal-950 dark:text-white">
                    {siteConfig.nameArabic}
                  </span>
                  <span className="text-[10px] md:text-[11px] text-bronze-600 dark:text-bronze-400 font-medium tracking-widest uppercase mt-1">
                    {siteConfig.name}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-bronze-600 dark:text-bronze-400 font-bold"
                        : "text-charcoal-700 dark:text-charcoal-300 hover:text-charcoal-950 dark:hover:text-white hover:bg-ivory-200/50 dark:hover:bg-charcoal-800/50"
                    }`}
                  >
                    {item.title}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-bronze-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Tools: Search, Bookmarks, Theme Toggle, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/search"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50/80 dark:bg-charcoal-900/80 text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-600 dark:hover:text-bronze-400 hover:border-bronze-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
                title="البحث في المقالات والوثائقيات"
                aria-label="البحث"
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                href="/bookmarks"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50/80 dark:bg-charcoal-900/80 text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-600 dark:hover:text-bronze-400 hover:border-bronze-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
                title="المقالات المحفوظة"
                aria-label="المقالات المحفوظة"
              >
                <Bookmark className="w-4 h-4" />
              </Link>

              <ThemeToggle />

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50/80 dark:bg-charcoal-900/80 text-charcoal-700 dark:text-charcoal-300 hover:text-charcoal-950 dark:hover:text-white transition-colors"
                aria-label="فتح القائمة الرئيسية"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
