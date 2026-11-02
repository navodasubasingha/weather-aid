const highlights = [
  {
    title: 'Humidity',
    value: '75%',
    description: 'Moisture in the air',
    icon: '/image/icons/humidity.png',
  },
  {
    title: 'Wind Speed',
    value: '12 km/h',
    description: 'Current wind condition',
    icon: '/image/icons/wind-speed.png',
  },
  {
    title: 'UV Index',
    value: '6',
    description: 'High UV level',
    icon: '/image/icons/uv-index.png',
  },
  {
    title: 'Visibility',
    value: '10 km',
    description: 'How far you can see',
    icon: '/image/icons/visibility.png',
  },
]

function WeatherHighlights() {
  return (
    <section className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 shadow-sm sm:p-6 xl:min-h-0">
      {/* Decorative gradient effects */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Today's Highlights
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
            Important weather conditions at a glance
          </p>
        </div>

        {/* Weather details icon */}
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white/80 text-blue-600 shadow-sm sm:flex">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M4 19V5m0 14h16" strokeLinecap="round" />
            <rect x="7" y="11" width="3" height="5" rx="1" />
            <rect x="13" y="7" width="3" height="9" rx="1" />
            <rect x="19" y="3" width="1" height="13" rx=".5" />
          </svg>
        </div>
      </div>

      {/* Highlight rows */}
      <div className="relative z-10 mt-5 flex flex-1 flex-col justify-center gap-2">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-3 py-3 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-white hover:shadow-md sm:gap-4 sm:px-4"
          >
            {/* PNG icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/80 sm:h-12 sm:w-12">
              <img
                src={item.icon}
                alt={item.title}
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              />
            </div>

            {/* Title and description */}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-sm font-bold tracking-tight text-slate-800 sm:text-base">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </div>

            {/* Metric value */}
            <p className="shrink-0 font-display text-lg font-bold tracking-tight tabular-nums text-slate-900 sm:text-xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Data notice */}
      <p className="relative z-10 mt-3 shrink-0 text-[10px] text-slate-400 sm:text-[11px]">
        Sample values — live weather data coming soon.
      </p>
    </section>
  )
}

export default WeatherHighlights
