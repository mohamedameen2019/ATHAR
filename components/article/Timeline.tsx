import * as React from "react";
import Image from "next/image";
import { TimelineEvent } from "@/types";
import { Clock } from "lucide-react";

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export function Timeline({ events, title = "التسلسل الزمني للحدث" }: TimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <section aria-label={title} className="my-12 py-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-bronze-500/15 text-bronze-600 dark:text-bronze-400 flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative pr-6 border-r-2 border-bronze-500/30 space-y-10 mr-3">
        {events.map((event, index) => (
          <div key={index} className="relative group">
            {/* Timeline node circle */}
            <span
              className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-bronze-500 bg-ivory-50 dark:bg-charcoal-950 group-hover:scale-125 transition-transform"
              aria-hidden="true"
            />

            {/* Date badge */}
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-bronze-500/15 text-bronze-700 dark:text-bronze-300 mb-2">
              {event.yearOrDate}
            </div>

            {/* Event Title */}
            <h4 className="text-base font-bold text-charcoal-900 dark:text-ivory-50 mb-2 leading-snug">
              {event.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xl">
              {event.description}
            </p>

            {/* Optional Event Image */}
            {event.image && (
              <div className="mt-3 relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-ivory-200 dark:border-charcoal-800 shadow-sm">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
