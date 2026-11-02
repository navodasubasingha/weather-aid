const weeklyData = [
  { icon: '🌤️', condition: 'Partly cloudy', high: 31, low: 25, rain: 10 },
  { icon: '☀️', condition: 'Sunny', high: 32, low: 26, rain: 5 },
  { icon: '🌤️', condition: 'Partly cloudy', high: 30, low: 25, rain: 15 },
  { icon: '🌧️', condition: 'Rainy', high: 29, low: 24, rain: 70 },
  { icon: '🌦️', condition: 'Light rain', high: 28, low: 24, rain: 55 },
  { icon: '🌤️', condition: 'Partly cloudy', high: 30, low: 25, rain: 20 },
  { icon: '☀️', condition: 'Sunny', high: 32, low: 26, rain: 5 },
]

// Generate upcoming seven dates
function getNextSevenDays() {
  const today = new Date()

  return weeklyData.map((weather, index) => {
    const date = new Date(today)

    date.setDate(today.getDate() + index + 1)

    return {
      ...weather,
      day: date.toLocaleDateString('en-US', {
        weekday: 'short',
      }),
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }
  })
}

function WeeklyForecast() {
  const days = getNextSevenDays()

  return (
    <section
      id="weekly"
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 shadow-sm sm:p-6 xl:min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Calendar icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="3" />

              <path d="M7 3v4M17 3v4M3 10h18" strokeLinecap="round" />

              <path
                d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Title and subtitle */}
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              7-Day Forecast
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
              Weather outlook for the coming week
            </p>
          </div>
        </div>

        {/* Daily label */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M7 3v4M17 3v4M3 10h18" />
          </svg>

          <span>Daily</span>
        </div>
      </div>

      {/* Seven day forecast cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex min-w-0 flex-col items-center rounded-2xl border border-slate-200 bg-white px-2 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            {/* Weekday */}
            <p className="font-display text-sm font-bold text-slate-800">
              {day.day}
            </p>

            {/* Date */}
            <p className="mt-1 text-[10px] font-medium text-slate-500">
              {day.date}
            </p>

            {/* Weather icon */}
            <span
              className="my-4 block text-3xl sm:text-4xl"
              role="img"
              aria-label={day.condition}
            >
              {day.icon}
            </span>

            {/* Weather condition */}
            <p className="min-h-8 text-[10px] leading-4 text-slate-500">
              {day.condition}
            </p>

            {/* High and low temperatures */}
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <span className="font-display text-base font-bold tabular-nums text-slate-900">
                {day.high}°
              </span>

              <span className="text-slate-400">/</span>

              <span className="font-display text-sm font-medium tabular-nums text-slate-500">
                {day.low}°
              </span>
            </div>

            {/* Rain probability */}
            <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-blue-50 px-2 py-1.5 text-blue-700">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 2.5C10.2 5.8 5.5 10.1 5.5 14.4a6.5 6.5 0 1 0 13 0C18.5 10.1 13.8 5.8 12 2.5Z" />
              </svg>

              <span className="text-[10px] font-semibold tabular-nums">
                {day.rain}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeeklyForecast
