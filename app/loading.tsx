export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
      {/* Hero skeleton */}
      <div className="w-full h-96 rounded-2xl bg-ivory-200/60 dark:bg-charcoal-850/60" />

      {/* Grid skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="w-full h-48 rounded-xl bg-ivory-200/60 dark:bg-charcoal-850/60" />
            <div className="w-3/4 h-5 rounded bg-ivory-200/60 dark:bg-charcoal-850/60" />
            <div className="w-full h-4 rounded bg-ivory-200/40 dark:bg-charcoal-850/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
