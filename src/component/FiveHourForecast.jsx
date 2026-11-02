const hourlyData = [
  { time: 'Now', temperature: 29, icon: '🌤️', rain: 10 },
  { time: '+1 hr', temperature: 28, icon: '☁️', rain: 15 },
  { time: '+2 hr', temperature: 28, icon: '🌤️', rain: 20 },
  { time: '+3 hr', temperature: 27, icon: '🌧️', rain: 30 },
  { time: '+4 hr', temperature: 26, icon: '🌙', rain: 15 },
]

function FiveHourForecast() {
  const rainValues = hourlyData.map((hour) => hour.rain)

  const minRain = Math.min(...rainValues)
  const maxRain = Math.max(...rainValues)

  return (
    <section className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 shadow-sm sm:p-6">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Clock icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 sm:flex">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M12 7v5l3 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title and subtitle */}
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Next 5 Hours
            </h2>

            <p className="mt-1.5 text-sm leading-5 text-slate-500">
              Short-term weather forecast
            </p>
          </div>
        </div>

        {/* Hourly label */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm">
          <icon name="chart-no-axes-column-increasing" size="xs" />
          <span>Hourly</span>
        </div>
      </div>

      {/* Forecast cards */}
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {hourlyData.map((hour, index) => (
          <div
            key={hour.time}
            className={`flex min-w-0 flex-col items-center rounded-2xl border px-2 py-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:px-2 sm:py-5 ${
              index === 0
                ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-200'
                : 'border-blue-100/80 bg-white/80 text-slate-900 shadow-sm hover:border-blue-200'
            }`}
          >
            {/* Time */}
            <p
              className={`whitespace-nowrap text-xs font-bold sm:text-sm ${
                index === 0 ? 'text-blue-100' : 'text-slate-500'
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
              className={`font-display text-3xl font-bold tracking-tight tabular-nums sm:text-4xl ${
                index === 0 ? 'text-white' : 'text-slate-900'
              }`}
            >
              {hour.temperature}°
            </p>

            {/* Rain probability */}
            <div
              className={`mt-4 flex items-center justify-center gap-1.5 rounded-full px-2.5 py-2 ${
                index === 0
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
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

      {/* Rain probability summary */}
      <div className="relative z-10 mt-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-100/70 p-3 sm:p-4">
        {/* Umbrella icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm sm:h-12 sm:w-12">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-6 w-6 sm:h-7 sm:w-7"
            aria-hidden="true"
          >
            <path
              d="M3 12a9 9 0 0 1 18 0H3Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12v6a3 3 0 0 0 6 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 3V1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-blue-950 sm:text-base">
            Low to moderate rain chance
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
            Rain probability ranges from {minRain}% to {maxRain}% in the next 5
            hours.
          </p>
        </div>
      </div>

      {/* Data notice */}
      <p className="relative z-10 mt-3 text-[10px] text-slate-400 sm:text-[11px]">
        Sample data only — live forecasts will be loaded using Open-Meteo.
      </p>
    </section>
  )
}

export default FiveHourForecast
