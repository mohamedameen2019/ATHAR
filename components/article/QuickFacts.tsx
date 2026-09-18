import * as React from "react";
import { QuickFact } from "@/types";
import { Info } from "lucide-react";

interface QuickFactsProps {
  facts: QuickFact[];
}

export function QuickFacts({ facts }: QuickFactsProps) {
  if (!facts || facts.length === 0) return null;

  return (
    <div className="my-10 rounded-xl border border-bronze-500/30 bg-bronze-500/5 dark:bg-bronze-500/10 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 pb-4 border-b border-bronze-500/20 mb-5">
        <div className="w-7 h-7 rounded-lg bg-bronze-500/20 text-bronze-600 dark:text-bronze-400 flex items-center justify-center">
          <Info className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-base text-charcoal-950 dark:text-ivory-50">
          بطاقة المعلومات التوثيقية السريعة
        </h3>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="flex flex-col border-r-2 border-bronze-500/40 pr-3"
          >
            <dt className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium">
              {fact.label}
            </dt>
            <dd className="font-semibold text-charcoal-900 dark:text-ivory-100 mt-0.5">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
