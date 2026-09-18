import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Rss, Compass, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ivory-200 dark:border-charcoal-800 bg-ivory-100/50 dark:bg-charcoal-950/80 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ivory-200 dark:border-charcoal-800">
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-9 h-9 rounded-lg bg-charcoal-950 dark:bg-ivory-50 flex items-center justify-center text-ivory-50 dark:text-charcoal-950 font-bold text-base tracking-wider">
                أَ
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-none tracking-tight text-charcoal-950 dark:text-white">
                  {siteConfig.nameArabic}
                </span>
                <span className="text-[10px] text-bronze-600 dark:text-bronze-400 font-medium tracking-widest uppercase mt-1">
                  {siteConfig.name}
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-charcoal-500">
              <span>المقر التحريري: {siteConfig.contact.location}</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.socialLinks.x && (
                <a
                  href={siteConfig.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-ivory-200 dark:border-charcoal-800 flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 hover:text-bronze-500 hover:border-bronze-500 transition-colors text-xs font-bold"
                  aria-label="حساب X"
                >
                  X
                </a>
              )}
              {siteConfig.socialLinks.rss && (
                <Link
                  href={siteConfig.socialLinks.rss}
                  className="w-8 h-8 rounded-full border border-ivory-200 dark:border-charcoal-800 flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 hover:text-bronze-500 hover:border-bronze-500 transition-colors"
                  aria-label="خلاصة RSS"
                >
                  <Rss className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Column 1: Editorial */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-950 dark:text-ivory-50 mb-4">
              هيئة التحرير والمنصة
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-600 dark:text-charcoal-400">
              {siteConfig.footerNav.editorial.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-bronze-600 dark:hover:text-bronze-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2: Categories */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-950 dark:text-ivory-50 mb-4">
              أقسام التحقيقات
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-600 dark:text-charcoal-400">
              {siteConfig.footerNav.categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-bronze-600 dark:hover:text-bronze-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 3: Legal & Standards */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-950 dark:text-ivory-50 mb-4">
              الشفافية والمعايير القانونية
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-600 dark:text-charcoal-400">
              {siteConfig.footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-bronze-600 dark:hover:text-bronze-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Editorial Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>
            جميع الحقوق محفوظة لمنصة {siteConfig.nameArabic} الوثائقية © {currentYear}. المحتوى يخضع لحقوق الملكية الفكرية والتوثيق الأكاديمي.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-charcoal-800 dark:hover:text-charcoal-200">
              خريطة الموقع
            </Link>
            <Link href="/privacy-policy" className="hover:text-charcoal-800 dark:hover:text-charcoal-200">
              الخصوصية
            </Link>
            <Link href="/terms-of-use" className="hover:text-charcoal-800 dark:hover:text-charcoal-200">
              الشروط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
