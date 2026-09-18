"use client";

import * as React from "react";
import { siteConfig } from "@/site.config";

interface InArticleAdProps {
  slot?: string;
  className?: string;
}

export function InArticleAd({ slot, className = "" }: InArticleAdProps) {
  const isEnabled = siteConfig.ads.enabled && Boolean(siteConfig.ads.client);

  if (!isEnabled) {
    return null;
  }

  const adSlot = slot || siteConfig.ads.slots.inArticle;
  if (!adSlot) return null;

  return (
    <aside
      aria-label="إعلان داخل المقال"
      className={`my-10 py-4 flex flex-col items-center justify-center border-y border-ivory-200 dark:border-charcoal-800/80 ${className}`}
    >
      <span className="text-[10px] text-charcoal-400 dark:text-charcoal-600 tracking-wider uppercase mb-1">
        محتوى إعلاني
      </span>
      <div className="w-full max-w-[650px] min-h-[120px] bg-ivory-200/30 dark:bg-charcoal-900/30 rounded flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={siteConfig.ads.client}
          data-ad-slot={adSlot}
        />
      </div>
    </aside>
  );
}
