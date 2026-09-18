"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-charcoal-100/50 dark:bg-charcoal-800/50 animate-pulse" />
    );
  }

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const getIcon = () => {
    if (theme === "dark") return <Moon className="w-4 h-4 text-bronze-400" />;
    if (theme === "light") return <Sun className="w-4 h-4 text-bronze-600" />;
    return <Monitor className="w-4 h-4 text-charcoal-400" />;
  };

  const getLabel = () => {
    if (theme === "dark") return "الوضع الليلي (انقر للتبديل للنهاري)";
    if (theme === "light") return "الوضع النهاري (انقر للتبديل للنظام)";
    return "وضع النظام (انقر للتبديل لليلي)";
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-ivory-200 dark:border-charcoal-800 bg-ivory-50/80 dark:bg-charcoal-900/80 hover:border-bronze-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/40"
      title={getLabel()}
      aria-label={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
