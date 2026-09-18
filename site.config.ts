export interface SiteConfig {
  name: string;
  nameArabic: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  locale: string;
  direction: "rtl" | "ltr";
  sinceYear: number;
  contact: {
    email: string;
    editorialEmail: string;
    location: string;
  };
  navigation: Array<{
    title: string;
    href: string;
    slug: string;
    description?: string;
  }>;
  footerNav: {
    editorial: Array<{ title: string; href: string }>;
    categories: Array<{ title: string; href: string }>;
    legal: Array<{ title: string; href: string }>;
  };
  socialLinks: {
    x?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
    telegram?: string;
    rss?: string;
  };
  features: {
    enableBookmarks: boolean;
    enableTableOfContents: boolean;
    enableReadingProgress: boolean;
    enableQuickFacts: boolean;
    enableTimeline: boolean;
    enableRelatedArticles: boolean;
    enableNewsletter: boolean;
  };
  ads: {
    enabled: boolean;
    client: string; // ca-pub-XXXXXXXXXXXXXXXX
    slots: {
      headerBanner?: string;
      inArticle?: string;
      sidebar?: string;
      footerBanner?: string;
    };
  };
  analytics: {
    googleAnalyticsId?: string; // G-XXXXXXXXXX
    googleSearchConsoleId?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "ATHAR",
  nameArabic: "أثر",
  tagline: "المنصة الوثائقية والتحريرية العالمية",
  description:
    "مجلة وثائقية استقصائية متخصصة في التاريخ، والحضارات الإنسانية، والعلوم المتقدمة، وأسرار الفضاء، والظواهر الطبيعية الكبرى. تجربة قراءة تحريرية وسينمائية استثنائية موثقة بالمصادر.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://athar-magazine.vercel.app",
  ogImage: "/images/og-default.jpg",
  locale: "ar-SA",
  direction: "rtl",
  sinceYear: 2026,
  contact: {
    email: "contact@athar.media",
    editorialEmail: "editorial@athar.media",
    location: "الرياض، المملكة العربية السعودية / لندن، المملكة المتحدة",
  },
  navigation: [
    { title: "الرئيسية", href: "/", slug: "home" },
    { title: "التاريخ", href: "/category/history", slug: "history", description: "أحداث غيرت مجرى العالم والوثائق المكتشفة" },
    { title: "الحضارات", href: "/category/civilizations", slug: "civilizations", description: "بناة الإمبراطوريات والآثار الإنسانية الخالدة" },
    { title: "العلوم", href: "/category/science", slug: "science", description: "أعظم الاكتشافات والأبحاث الجينية والطبية" },
    { title: "التكنولوجيا", href: "/category/technology", slug: "technology", description: "تطور الشيفرات، والذكاء الاصطناعي، وثورات العتاد" },
    { title: "الحروب", href: "/category/wars", slug: "wars", description: "معارك فاصلة، وحروب استخباراتية، وصراعات غيرت الجغرافيا" },
    { title: "الفضاء", href: "/category/space", slug: "space", description: "أعماق الكون، والمجرات السحيقة، ومسابير الكواكب" },
    { title: "الطبيعة", href: "/category/nature", slug: "nature", description: "خفايا الأعماق، والنظم البيئية، والظواهر الخارقة" },
  ],
  footerNav: {
    editorial: [
      { title: "عن المنصة", href: "/about" },
      { title: "الميثاق التحريري", href: "/about#editorial-standards" },
      { title: "الباحثون والكتاب", href: "/about#team" },
      { title: "اتصل بهيئة التحرير", href: "/contact" },
      { title: "المقالات المحفوظة", href: "/bookmarks" },
    ],
    categories: [
      { title: "التاريخ العالمي", href: "/category/history" },
      { title: "الحضارات القديمة", href: "/category/civilizations" },
      { title: "العلوم والطب", href: "/category/science" },
      { title: "الفضاء والكون", href: "/category/space" },
      { title: "التكنولوجيا والأسرار", href: "/category/technology" },
      { title: "الطبيعة والجغرافيا", href: "/category/nature" },
    ],
    legal: [
      { title: "سياسة الخصوصية", href: "/privacy-policy" },
      { title: "شروط الاستخدام", href: "/terms-of-use" },
      { title: "سياسة ملفات الارتباط", href: "/cookie-policy" },
      { title: "إخلاء المسؤولية التوثيقية", href: "/disclaimer" },
      { title: "خريطة الموقع XML", href: "/sitemap.xml" },
      { title: "خلاصة RSS", href: "/feed.xml" },
    ],
  },
  socialLinks: {
    x: "https://x.com/athar_magazine",
    facebook: "https://facebook.com/athar.magazine",
    youtube: "https://youtube.com/@athar_magazine",
    instagram: "https://instagram.com/athar_magazine",
    telegram: "https://t.me/athar_magazine",
    rss: "/feed.xml",
  },
  features: {
    enableBookmarks: true,
    enableTableOfContents: true,
    enableReadingProgress: true,
    enableQuickFacts: true,
    enableTimeline: true,
    enableRelatedArticles: true,
    enableNewsletter: true,
  },
  ads: {
    // Controlled seamlessly via environment variable or manual toggle
    enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000",
    slots: {
      headerBanner: process.env.NEXT_PUBLIC_AD_SLOT_HEADER,
      inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE,
      sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
      footerBanner: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER,
    },
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleSearchConsoleId: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};
