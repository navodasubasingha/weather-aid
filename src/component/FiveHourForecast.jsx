const hourlyData = [
  { time: 'Now', temperature: 29, icon: '🌤️', rain: 10 },
  { time: '+1 hr', temperature: 28, icon: '☁️', rain: 15 },
  { time: '+2 hr', temperature: 28, icon: '🌤️', rain: 20 },
  { time: '+3 hr', temperature: 27, icon: '🌧️', rain: 30 },
  { time: '+4 hr', temperature: 26, icon: '🌙', rain: 15 },
]

function FiveHourForecast() {
  return (
    <section className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 font-montserrat shadow-sm sm:p-6 dark:border-slate-700 dark:from-[#111D32] dark:via-[#17263E] dark:to-[#1E293B]">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Clock icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-transparent sm:flex">
            {/* Light Mode - SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7 dark:hidden"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M12 7v5l3 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Dark Mode - Custom PNG */}
            <img
              src="/image/icons/clock-icon.png"
              alt=""
              aria-hidden="true"
              className="hidden h-14 w-14 object-contain dark:block"
            />
          </div>

          {/* Title and subtitle */}
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Next 5 Hours
            </h2>

            <p className="mt-1.5 text-sm leading-5 text-slate-500 dark:text-slate-400">
              Short-term weather forecast
            </p>
          </div>
        </div>

        {/* Hourly label */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm dark:border-slate-700 dark:bg-[#1B2A42] dark:text-blue-300">
          <icon name="chart-no-axes-column-increasing" size="xs" />
          <span>Hourly</span>
        </div>
      </div>

      {/* Forecast cards */}
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {hourlyData.map((hour, index) => (
          <div
            key={hour.time}
            className={`flex min-w-0 flex-col items-center rounded-2xl border px-2 py-4 text-center shadow-[0_3px_12px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] dark:hover:border-blue-500 sm:px-2 sm:py-5 ${
              index === 0
                ? 'border-blue-600 bg-gradient-to-br from-blue-500 to-blue-700 text-white dark:border-slate-600 dark:from-[#1B2A42] dark:via-[#1B2A42] dark:to-[#1B2A42] dark:text-slate-100 dark:shadow-none'
                : 'border-slate-200 bg-white text-slate-900 dark:border-slate-600 dark:bg-[#1B2A42] dark:text-slate-100 dark:shadow-none'
            }`}
          >
            {/* Time */}
            <p
              className={`whitespace-nowrap text-xs font-bold sm:text-sm ${
                index === 0
                  ? 'text-blue-50'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {hour.time}
            </p>

            {/* Weather icon */}
            <span
              className="my-4 block text-3xl sm:text-4xl"
              role="img"
              aria-label="Weather condition"
            >
              {hour.icon}
            </span>

            {/* Temperature */}
            <p
              className={`text-3xl font-bold tracking-tight tabular-nums sm:text-4xl ${
                index === 0 ? 'text-white' : 'text-slate-900 dark:text-white'
              }`}
            >
              {hour.temperature}°
            </p>

            {/* Rain probability */}
            <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-2 text-blue-700 dark:bg-[#263B5D] dark:text-blue-300">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 2.5C10.2 5.8 5.5 10.1 5.5 14.4a6.5 6.5 0 1 0 13 0C18.5 10.1 13.8 5.8 12 2.5Z" />
              </svg>

              <span className="text-xs font-semibold tabular-nums">
                {hour.rain}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data notice */}
      <p className="relative z-10 mt-3 text-[10px] text-slate-400 sm:text-[11px] dark:text-slate-500">
        Sample data only — live forecasts will be loaded using Open-Meteo.
      </p>
    </section>
  )
}

export default FiveHourForecast
