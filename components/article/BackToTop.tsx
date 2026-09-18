"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-6 left-6 z-30 flex items-center justify-center w-10 h-10 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50/90 dark:bg-charcoal-900/90 text-charcoal-700 dark:text-charcoal-300 hover:text-bronze-500 hover:border-bronze-500/50 shadow-lg backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-bronze-500/40 animate-fade-in"
      title="العودة لأعلى الصفحة"
      aria-label="العودة لأعلى الصفحة"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
