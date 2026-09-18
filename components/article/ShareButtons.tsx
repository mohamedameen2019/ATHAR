"use client";

import * as React from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { getShareUrls } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  slug: string;
  isBottomBar?: boolean;
}

export function ShareButtons({ title, slug, isBottomBar = false }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  const [fullUrl, setFullUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, [slug]);

  const shareUrls = getShareUrls(fullUrl, title);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const input = document.createElement("input");
        input.value = fullUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  // Mobile bottom bar layout
  if (isBottomBar) {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory-50/95 dark:bg-charcoal-950/95 backdrop-blur-md border-t border-ivory-200 dark:border-charcoal-800 px-4 py-2.5 flex items-center justify-around shadow-lg">
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 font-medium"
          aria-label="مشاركة عبر واتساب"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>واتساب</span>
        </a>

        <a
          href={shareUrls.x}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 font-bold"
          aria-label="مشاركة عبر X"
        >
          X
        </a>

        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 font-medium"
          aria-label="مشاركة عبر فيسبوك"
        >
          فيسبوك
        </a>

        <button
          onClick={copyToClipboard}
          type="button"
          className="flex items-center gap-1 text-xs text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 font-medium"
          aria-label="نسخ رابط المقال"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
          <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
        </button>
      </div>
    );
  }

  // Desktop sticky sidebar layout
  return (
    <div className="hidden lg:flex flex-col items-center gap-3 sticky top-28">
      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 [writing-mode:vertical-rl] rotate-180">
        مشاركة التحقيق
      </span>

      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex items-center justify-center text-charcoal-700 dark:text-charcoal-300 hover:text-emerald-500 hover:border-emerald-500/50 transition-colors shadow-sm"
        title="مشاركة عبر واتساب"
        aria-label="واتساب"
      >
        <span className="text-xs font-bold">WA</span>
      </a>

      <a
        href={shareUrls.x}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex items-center justify-center text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 hover:border-bronze-500/50 transition-colors shadow-sm"
        title="مشاركة عبر X"
        aria-label="X (تويتر سابقاً)"
      >
        <span className="text-xs font-bold">X</span>
      </a>

      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex items-center justify-center text-charcoal-700 dark:text-charcoal-300 hover:text-blue-500 hover:border-blue-500/50 transition-colors shadow-sm"
        title="مشاركة عبر فيسبوك"
        aria-label="فيسبوك"
      >
        <span className="text-xs font-bold">FB</span>
      </a>

      <button
        onClick={copyToClipboard}
        type="button"
        className="w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 flex items-center justify-center text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 hover:border-bronze-500/50 transition-colors shadow-sm"
        title="نسخ الرابط"
        aria-label="نسخ الرابط"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
