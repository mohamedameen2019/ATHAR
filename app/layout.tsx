import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Amiri, Cinzel } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
    { media: "(prefers-color-scheme: dark)", color: "#090A0C" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameArabic} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.nameArabic}`,
  },
  description: siteConfig.description,
  keywords: [
    "وثائقيات",
    "تاريخ",
    "حضارات قديمة",
    "علوم",
    "فضاء",
    "اكتشافات",
    "تحقيقات استقصائية",
    "مجلة وثائقية",
    "أثر",
    "ATHAR",
  ],
  authors: [{ name: siteConfig.nameArabic, url: siteConfig.url }],
  creator: siteConfig.nameArabic,
  publisher: siteConfig.nameArabic,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.nameArabic} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.nameArabic,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.nameArabic,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameArabic} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  verification: {
    google: siteConfig.analytics.googleSearchConsoleId,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${ibmPlexArabic.variable} ${amiri.variable} ${cinzel.variable}`}
    >
      <head>
        {/* Google Analytics conditional injection */}
        {siteConfig.analytics.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense conditional script */}
        {siteConfig.ads.enabled && siteConfig.ads.client && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.ads.client}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-bronze-500/25">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-bronze-500 focus:text-charcoal-950 focus:font-bold focus:rounded-md shadow-lg"
        >
          الانتقال إلى المحتوى الرئيسي
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
