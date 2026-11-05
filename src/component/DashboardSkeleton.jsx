function SkeletonBlock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer rounded-xl ${className}`}
    />
  )
}

function CurrentWeatherSkeleton() {
  return (
    <section className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-5 shadow-sm sm:p-6 xl:min-h-0 dark:border-slate-700 dark:bg-[#17263E]">
      <div>
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-5 w-5 rounded-full" />
          <SkeletonBlock className="h-6 w-40" />
        </div>

        <div className="mt-10 space-y-3">
          <SkeletonBlock className="h-16 w-44" />
          <SkeletonBlock className="h-7 w-32" />
          <SkeletonBlock className="h-4 w-36" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="space-y-2">
            <SkeletonBlock className="h-3 w-12" />
            <SkeletonBlock className="h-5 w-14" />
          </div>

          <div className="h-9 w-px bg-slate-300 dark:bg-slate-600" />

          <div className="space-y-2">
            <SkeletonBlock className="h-3 w-12" />
            <SkeletonBlock className="h-5 w-14" />
          </div>
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-28" />
          <SkeletonBlock className="h-3 w-32" />
        </div>
      </div>
    </section>
  )
}

function HighlightsSkeleton() {
  return (
    <section className="flex h-full min-h-[410px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6 xl:min-h-0 dark:border-slate-700 dark:bg-[#111D32]">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="h-11 w-11" />

        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-6 w-44" />
          <SkeletonBlock className="h-3 w-52 max-w-full" />
        </div>

        <SkeletonBlock className="h-11 w-11" />
      </div>

      <div className="mt-5 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex min-h-[88px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-[#17263E]"
          >
            <SkeletonBlock className="h-11 w-11 shrink-0" />

            <div className="min-w-0 flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-20 max-w-full" />
              <SkeletonBlock className="h-3 w-28 max-w-full" />
            </div>

            <SkeletonBlock className="h-6 w-12 shrink-0" />
          </div>
        ))}
      </div>
    </section>
  )
}

function FiveHourSkeleton() {
  return (
    <section className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:min-h-0 dark:border-slate-700 dark:bg-[#17263E]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-11 w-11" />

          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-36" />
            <SkeletonBlock className="h-3 w-40" />
          </div>
        </div>

        <SkeletonBlock className="h-8 w-16 rounded-full" />
      </div>

      <div className="mt-8 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 p-3 dark:border-slate-700"
          >
            <SkeletonBlock className="h-3 w-12" />
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <SkeletonBlock className="h-6 w-12" />
            <SkeletonBlock className="h-3 w-14" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
        ))}
      </div>
    </section>
  )
}

function WeeklySkeleton() {
  return (
    <section className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:min-h-0 dark:border-slate-700 dark:bg-[#17263E]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-11 w-11" />

          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-36" />
            <SkeletonBlock className="h-3 w-48" />
          </div>
        </div>

        <SkeletonBlock className="h-8 w-16 rounded-full" />
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700"
          >
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
        ))}
      </div>
    </section>
  )
}

function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading weather dashboard"
      className="flex flex-1 flex-col gap-5"
    >
      {/* Top dashboard row */}
      <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-[1.1] xl:grid-cols-12">
        <div className="xl:col-span-7 xl:min-h-0">
          <CurrentWeatherSkeleton />
        </div>

        <div className="xl:col-span-5 xl:min-h-0">
          <HighlightsSkeleton />
        </div>
      </section>

      {/* Forecast row */}
      <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-1 xl:grid-cols-12">
        <div className="xl:col-span-5 xl:min-h-0">
          <FiveHourSkeleton />
        </div>

        <div className="xl:col-span-7 xl:min-h-0">
          <WeeklySkeleton />
        </div>
      </section>

      <span className="sr-only">Loading weather information...</span>
    </div>
  )
}

export default DashboardSkeleton
