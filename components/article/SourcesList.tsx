import * as React from "react";
import { SourceReference } from "@/types";
import { BookOpen, ExternalLink } from "lucide-react";

interface SourcesListProps {
  sources: SourceReference[];
}

export function SourcesList({ sources }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      aria-label="المصادر والمراجع التوثيقية"
      className="my-12 pt-8 border-t border-ivory-200 dark:border-charcoal-800"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-bronze-500" />
        </div>
        <h3 className="font-bold text-lg text-charcoal-950 dark:text-ivory-50">
          المصادر والمراجع التوثيقية
        </h3>
      </div>

      <ol className="space-y-3 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 list-decimal list-inside pr-2">
        {sources.map((source, index) => (
          <li key={source.id || index} className="leading-relaxed">
            <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">
              {source.title}
            </span>
            {source.publisher && (
              <span className="text-charcoal-500 dark:text-charcoal-400">
                {" "}— {source.publisher}
              </span>
            )}
            {source.yearOrDate && (
              <span className="text-charcoal-400 dark:text-charcoal-500">
                {" "}({source.yearOrDate})
              </span>
            )}
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-bronze-600 dark:text-bronze-400 hover:underline mr-2"
              >
                <span>الرابط الخارجي</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
