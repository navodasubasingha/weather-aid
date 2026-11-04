import { useMemo } from 'react'

// Convert Open-Meteo weather codes into icons and descriptions
function getWeatherCondition(code) {
  const weatherCode = Number(code)

  if (weatherCode === 0) {
    return { icon: '☀️', condition: 'Sunny' }
  }

  if (weatherCode === 1) {
    return { icon: '🌤️', condition: 'Mainly clear' }
  }

  if (weatherCode === 2) {
    return { icon: '⛅', condition: 'Partly cloudy' }
  }

  if (weatherCode === 3) {
    return { icon: '☁️', condition: 'Overcast' }
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return { icon: '🌫️', condition: 'Foggy' }
  }

  if (weatherCode >= 51 && weatherCode <= 57) {
    return { icon: '🌦️', condition: 'Drizzle' }
  }

  if (weatherCode >= 61 && weatherCode <= 67) {
    return { icon: '🌧️', condition: 'Rainy' }
  }

  if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77
  ) {
    return { icon: '🌨️', condition: 'Snowy' }
  }

  if (weatherCode >= 80 && weatherCode <= 82) {
    return { icon: '🌧️', condition: 'Rain showers' }
  }

  if (weatherCode === 85 || weatherCode === 86) {
    return { icon: '🌨️', condition: 'Snow showers' }
  }

  if (weatherCode >= 95 && weatherCode <= 99) {
    return { icon: '⛈️', condition: 'Thunderstorm' }
  }

  return { icon: '🌡️', condition: 'Unavailable' }
}

// Format API date into weekday and calendar date
function formatForecastDate(dateString, index) {
  const date = new Date(`${dateString}T12:00:00`)

  if (Number.isNaN(date.getTime())) {
    return {
      day: '--',
      date: '--',
    }
  }

  return {
    day:
      index === 0
        ? 'Today'
        : date.toLocaleDateString('en-US', {
            weekday: 'short',
          }),

    date: date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }
}

function WeeklyForecast({ daily, loading }) {
  // Prepare seven days from API data
  const days = useMemo(() => {
    if (!Array.isArray(daily?.time)) {
      return []
    }

    return daily.time.map((dateString, index) => {
      const weather = getWeatherCondition(daily.weather_code?.[index])

      const dateInfo = formatForecastDate(dateString, index)

      return {
        id: dateString,
        ...dateInfo,
        icon: weather.icon,
        condition: weather.condition,
        high: daily.temperature_2m_max?.[index],
        low: daily.temperature_2m_min?.[index],
        rain: daily.precipitation_probability_max?.[index],
      }
    })
  }, [daily])

  return (
    <section
      aria-busy={loading}
      id="weekly"
      className="font-montserrat relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 shadow-sm transition-colors duration-300 sm:p-6 xl:min-h-0 dark:border-slate-700 dark:from-[#111D32] dark:via-[#17263E] dark:to-[#1E293B]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Calendar icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex dark:bg-transparent">
            {/* Light Mode - Original SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7 dark:hidden"
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

            {/* Dark Mode - Generated PNG */}
            <img
              src="/image/icons/calendar-icon.png"
              alt=""
              aria-hidden="true"
              className="hidden h-12 w-12 rounded-2xl object-contain dark:block"
            />
          </div>

          {/* Title and subtitle */}
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              7-Day Forecast
            </h2>

            <p className="mt-1.5 text-xs font-medium leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
              Weather outlook for the coming week
            </p>
          </div>
        </div>

        {/* Daily label */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-[#1B2A42] dark:text-slate-300">
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
      {days.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
          {days.map((day) => (
            <div
              key={day.id}
              className="flex min-w-0 flex-col items-center rounded-2xl border border-slate-200 bg-white px-2 py-4 text-center shadow-[0_3px_12px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] dark:border-slate-600 dark:bg-[#1B2A42] dark:shadow-none dark:hover:border-blue-500 sm:px-2 sm:py-4"
            >
              {/* Weekday */}
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {day.day}
              </p>

              {/* Date */}
              <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
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
              <p className="min-h-8 text-[10px] font-medium leading-4 text-slate-600 dark:text-slate-400">
                {day.condition}
              </p>

              {/* High and low temperatures */}
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="text-base font-bold tabular-nums text-slate-900 dark:text-white">
                  {day.high != null ? `${Math.round(day.high)}°` : '--°'}
                </span>

                <span className="text-slate-400 dark:text-slate-500">/</span>

                <span className="text-sm font-medium tabular-nums text-slate-500 dark:text-slate-400">
                  {day.low != null ? `${Math.round(day.low)}°` : '--°'}
                </span>
              </div>

              {/* Rain probability */}
              <div className="mt-3 flex items-center justify-center gap-1 rounded-full border border-blue-100/70 bg-blue-50 px-2 py-1.5 text-blue-700 dark:border-slate-700 dark:bg-[#263B5D] dark:text-blue-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 2.5C10.2 5.8 5.5 10.1 5.5 14.4a6.5 6.5 0 1 0 13 0C18.5 10.1 13.8 5.8 12 2.5Z" />
                </svg>

                <span className="text-[10px] font-semibold tabular-nums">
                  {day.rain != null ? `${Math.round(day.rain)}%` : '--'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {loading
              ? 'Loading 7-day forecast...'
              : '7-day forecast is unavailable.'}
          </p>
        </div>
      )}
    </section>
  )
}

export default WeeklyForecast
