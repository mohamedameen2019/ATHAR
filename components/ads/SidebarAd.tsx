"use client";

import * as React from "react";
import { siteConfig } from "@/site.config";

interface SidebarAdProps {
  slot?: string;
  className?: string;
}

export function SidebarAd({ slot, className = "" }: SidebarAdProps) {
  const isEnabled = siteConfig.ads.enabled && Boolean(siteConfig.ads.client);

  if (!isEnabled) {
    return null;
  }

  const adSlot = slot || siteConfig.ads.slots.sidebar;
  if (!adSlot) return null;

  return (
    <aside
      aria-label="إعلان جانبي"
      className={`my-6 flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[10px] text-charcoal-400 dark:text-charcoal-600 tracking-wider uppercase mb-1">
        إعلان
      </span>
      <div className="w-[300px] min-h-[250px] bg-ivory-200/40 dark:bg-charcoal-900/40 border border-dashed border-ivory-300 dark:border-charcoal-800 rounded flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client={siteConfig.ads.client}
          data-ad-slot={adSlot}
        />
      </div>
    </aside>
  );
}
