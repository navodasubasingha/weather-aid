import { useState } from 'react'

const HOURS_PER_PAGE = 5
const MAX_FORECAST_HOURS = 10

// Find the current hour in the hourly forecast
function getStartIndex(currentTime, hourlyTimes) {
  if (!Array.isArray(hourlyTimes) || hourlyTimes.length === 0) {
    return -1
  }

  if (currentTime) {
    const exactIndex = hourlyTimes.indexOf(currentTime)

    if (exactIndex !== -1) {
      return exactIndex
    }

    // Find the nearest available hour
    const targetTime = new Date(currentTime).getTime()

    if (Number.isFinite(targetTime)) {
      let nearestIndex = -1
      let smallestDifference = Infinity

      hourlyTimes.forEach((time, index) => {
        const timestamp = new Date(time).getTime()

        if (!Number.isFinite(timestamp)) return

        const difference = Math.abs(timestamp - targetTime)

        if (difference < smallestDifference) {
          smallestDifference = difference
          nearestIndex = index
        }
      })

      return nearestIndex
    }
  }

  return 0
}

// Get weather icon and description from WMO weather code
function getWeatherCondition(code, isDay = 1) {
  const day = Number(isDay) === 1

  if (code === 0) {
    return {
      icon: day ? '☀️' : '🌙',
      description: 'Clear sky',
    }
  }

  if (code === 1) {
    return {
      icon: day ? '🌤️' : '🌙',
      description: 'Mainly clear',
    }
  }

  if (code === 2) {
    return {
      icon: '⛅',
      description: 'Partly cloudy',
    }
  }

  if (code === 3) {
    return {
      icon: '☁️',
      description: 'Overcast',
    }
  }

  if (code === 45 || code === 48) {
    return {
      icon: '🌫️',
      description: 'Fog',
    }
  }

  if (code >= 51 && code <= 57) {
    return {
      icon: '🌦️',
      description: 'Drizzle',
    }
  }

  if (code >= 61 && code <= 67) {
    return {
      icon: '🌧️',
      description: 'Rain',
    }
  }

  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return {
      icon: '🌨️',
      description: 'Snow',
    }
  }

  if (code >= 80 && code <= 82) {
    return {
      icon: '🌧️',
      description: 'Rain showers',
    }
  }

  if (code === 85 || code === 86) {
    return {
      icon: '🌨️',
      description: 'Snow showers',
    }
  }

  if (code >= 95 && code <= 99) {
    return {
      icon: '⛈️',
      description: 'Thunderstorm',
    }
  }

  return {
    icon: '🌡️',
    description: 'Weather unavailable',
  }
}

function FiveHourForecast({ current, hourly, loading }) {
  const [currentPage, setCurrentPage] = useState(0)

  // Find the starting position of the current hour
  const startIndex = getStartIndex(current?.time, hourly?.time)

  // Prepare the next 10 hours from API data
  const forecastHours =
    startIndex >= 0 && hourly
      ? Array.from(
          {
            length: Math.min(
              MAX_FORECAST_HOURS,
              hourly.time.length - startIndex
            ),
          },
          (_, offset) => {
            const index = startIndex + offset

            const weatherCode = hourly.weather_code?.[index]
            const isDay = hourly.is_day?.[index] ?? current?.is_day ?? 1

            const condition = getWeatherCondition(weatherCode, isDay)

            // Use actual current temperature for the first card
            const temperature =
              offset === 0 && current?.temperature_2m != null
                ? current.temperature_2m
                : hourly.temperature_2m?.[index]

            // Chance of precipitation for this hour
            const rainProbability =
              hourly.precipitation_probability?.[index] ?? null

            return {
              id: hourly.time[index],
              time: offset === 0 ? 'Now' : `+${offset} hr`,
              temperature,
              icon: condition.icon,
              description: condition.description,
              rain: rainProbability,
            }
          }
        )
      : []

  const totalPages = Math.ceil(forecastHours.length / HOURS_PER_PAGE)

  // Keep the selected page within available forecast data
  const safePage = totalPages > 0 ? currentPage % totalPages : 0

  // Get five hours for the current page
  const visibleHours = forecastHours.slice(
    safePage * HOURS_PER_PAGE,
    (safePage + 1) * HOURS_PER_PAGE
  )

  const isLastPage = safePage === totalPages - 1

  function handleNextHours() {
    if (totalPages <= 1) return

    setCurrentPage((previousPage) =>
      previousPage >= totalPages - 1 ? 0 : previousPage + 1
    )
  }

  return (
    <section
      aria-busy={loading}
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 font-montserrat shadow-sm sm:p-6 dark:border-slate-700 dark:from-[#111D32] dark:via-[#17263E] dark:to-[#1E293B]"
    >
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

        {/* Hourly label and mobile navigation */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm dark:border-slate-700 dark:bg-[#1B2A42] dark:text-blue-300">
            <span>Hourly</span>
          </div>

          {/* Mobile Navigation */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handleNextHours}
              aria-label={
                isLastPage ? 'Show previous hours' : 'Show next hours'
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 sm:hidden dark:border-slate-600 dark:bg-[#263B5D] dark:text-blue-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                {isLastPage ? (
                  <path
                    d="m15 18-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="m9 18 6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Forecast Cards and Navigation */}
      <div className="relative z-10 mt-6 flex flex-1 flex-col">
        {visibleHours.length > 0 ? (
          <>
            {/* Forecast cards */}
            <div className="grid grid-cols-2 gap-3 sm:flex-1 sm:auto-rows-fr sm:grid-cols-5">
              {visibleHours.map((hour, index) => {
                const isCurrentHour = safePage === 0 && index === 0

                return (
                  <div
                    key={hour.id}
                    className={`flex h-full min-w-0 flex-col items-center rounded-2xl border px-2 py-4 text-center shadow-[0_3px_12px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] dark:hover:border-blue-500 sm:px-2 sm:py-5 ${
                      isCurrentHour
                        ? 'border-blue-600 bg-gradient-to-br from-blue-500 to-blue-700 text-white dark:border-slate-600 dark:from-[#1B2A42] dark:via-[#1B2A42] dark:to-[#1B2A42] dark:text-slate-100 dark:shadow-none'
                        : 'border-slate-200 bg-white text-slate-900 dark:border-slate-600 dark:bg-[#1B2A42] dark:text-slate-100 dark:shadow-none'
                    }`}
                  >
                    {/* Time */}
                    <p
                      className={`whitespace-nowrap text-xs font-bold sm:text-sm ${
                        isCurrentHour
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
                      aria-label={hour.description}
                      title={hour.description}
                    >
                      {hour.icon}
                    </span>

                    {/* Temperature */}
                    <p
                      className={`text-3xl font-bold tracking-tight tabular-nums sm:text-4xl ${
                        isCurrentHour
                          ? 'text-white'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {hour.temperature != null
                        ? `${Math.round(hour.temperature)}°`
                        : '--°'}
                    </p>

                    {/* Chance of Rain */}
                    <div
                      title={
                        hour.rain != null
                          ? `Chance of rain: ${Math.round(hour.rain)}%`
                          : 'Chance of rain unavailable'
                      }
                      aria-label={
                        hour.rain != null
                          ? `Chance of rain ${Math.round(hour.rain)} percent`
                          : 'Chance of rain unavailable'
                      }
                      className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-2 text-blue-700 dark:bg-[#263B5D] dark:text-blue-300"
                    >
                      {/* Rain droplet icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 2.5C10.2 5.8 5.5 10.1 5.5 14.4a6.5 6.5 0 1 0 13 0C18.5 10.1 13.8 5.8 12 2.5Z" />
                      </svg>

                      <span className="text-[10px] font-semibold">Rain</span>

                      <span className="text-xs font-bold tabular-nums">
                        {hour.rain != null ? `${Math.round(hour.rain)}%` : '--'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop Arrow Button */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handleNextHours}
                aria-label={
                  isLastPage ? 'Show previous hours' : 'Show next hours'
                }
                title={isLastPage ? 'Previous hours' : 'Next hours'}
                className="absolute -right-[18px] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-md transition-all duration-200 hover:scale-110 hover:border-blue-400 hover:bg-blue-50 sm:flex dark:border-slate-600 dark:bg-[#263B5D] dark:text-blue-300 dark:hover:bg-[#304A70]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  {isLastPage ? (
                    <path
                      d="m15 18-6-6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="m9 18 6-6-6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </button>
            )}
          </>
        ) : (
          <div className="flex min-h-[190px] items-center justify-center text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {loading
                ? 'Loading hourly forecast...'
                : 'Hourly forecast is unavailable.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FiveHourForecast
