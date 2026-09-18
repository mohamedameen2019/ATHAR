import { Metadata } from "next";
import {
  getFeaturedArticle,
  getEditorsPicks,
  getLatestArticles,
  getAllCategories,
  getMostReadArticles,
  getLongformArticles,
} from "@/lib/articles";
import { siteConfig } from "@/site.config";
import { generateOrganizationJsonLd } from "@/lib/seo";
import { HeroFeatured } from "@/components/home/HeroFeatured";
import { EditorsPicks } from "@/components/home/EditorsPicks";
import { LatestArticles } from "@/components/home/LatestArticles";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { MostRead } from "@/components/home/MostRead";
import { LongformSection } from "@/components/home/LongformSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";
import { AdBanner } from "@/components/ads/AdBanner";

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata: Metadata = {
  title: `${siteConfig.nameArabic} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default async function HomePage() {
  const [
    featuredArticle,
    editorsPicks,
    latestArticles,
    categories,
    mostReadArticles,
    longformArticles,
  ] = await Promise.all([
    getFeaturedArticle(),
    getEditorsPicks(4),
    getLatestArticles(6),
    getAllCategories(),
    getMostReadArticles(6),
    getLongformArticles(2),
  ]);

  const organizationJsonLd = generateOrganizationJsonLd(siteConfig.url);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional Leaderboard Ad Banner */}
        <AdBanner slot={siteConfig.ads.slots.headerBanner} />

        {/* 1. Hero Featured Documentary */}
        <HeroFeatured article={featuredArticle} />

        {/* 2. Editor's Picks */}
        <EditorsPicks articles={editorsPicks} />

        {/* 3. Latest Stories Grid */}
        <LatestArticles articles={latestArticles} />

        {/* 4. Core Categories Showcase */}
        <CategoryShowcase categories={categories} />

        {/* 5. Most Read Numbered Editorial List */}
        <MostRead articles={mostReadArticles} />

        {/* 6. Deep Longform Documentaries Section */}
        <LongformSection articles={longformArticles} />

        {/* 7. Editorial Newsletter Box */}
        <NewsletterBox />
      </div>
    </>
  );
}
