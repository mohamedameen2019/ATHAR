"use client";

import * as React from "react";
import { siteConfig } from "@/site.config";

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  const isEnabled = siteConfig.ads.enabled && Boolean(siteConfig.ads.client);

  if (!isEnabled) {
    // If ads are disabled, render nothing or return null without layout shift
    return null;
  }

  const adSlot = slot || siteConfig.ads.slots.headerBanner;
  if (!adSlot) return null;

  return (
    <aside
      aria-label="إعلان"
      className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
    >
      <div className="text-[10px] text-charcoal-400 dark:text-charcoal-600 tracking-wider uppercase mb-1">
        إعلان تحريري معتمد
      </div>
      <div
        className="w-full max-w-[728px] min-h-[90px] bg-ivory-200/40 dark:bg-charcoal-900/40 border border-dashed border-ivory-300 dark:border-charcoal-800 rounded flex items-center justify-center overflow-hidden"
      >
        {/* Placeholder ready for Google AdSense <ins> tag injection */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client={siteConfig.ads.client}
          data-ad-slot={adSlot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
