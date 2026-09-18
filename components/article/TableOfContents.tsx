"use client";

import * as React from "react";
import { ListFilter, ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="فهرس المقال"
      className="p-5 my-8 rounded-xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-100/50 dark:bg-charcoal-900/50 backdrop-blur-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-bold text-charcoal-950 dark:text-ivory-50 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-bronze-500" />
          <span>فهرس المحتويات والتحقيق</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-charcoal-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="mt-4 space-y-2 text-sm border-t border-ivory-200/60 dark:border-charcoal-800/60 pt-3">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                style={{ paddingRight: item.level === 3 ? "1rem" : "0" }}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 text-xs sm:text-sm transition-colors ${
                    isActive
                      ? "text-bronze-600 dark:text-bronze-400 font-bold"
                      : "text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
