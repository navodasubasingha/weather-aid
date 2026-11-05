function getUVStatus(value) {
  if (value == null) return ''

  if (value <= 2) return 'Low'
  if (value <= 5) return 'Moderate'
  if (value <= 7) return 'High'
  if (value <= 10) return 'Very High'

  return 'Extreme'
}

// Find the hourly forecast closest to current weather time
function getNearestHourlyIndex(currentTime, hourlyTimes) {
  if (!currentTime || !Array.isArray(hourlyTimes) || hourlyTimes.length === 0) {
    return -1
  }

  const targetTime = new Date(currentTime).getTime()

  if (!Number.isFinite(targetTime)) return -1

  let nearestIndex = -1
  let smallestDifference = Infinity

  hourlyTimes.forEach((time, index) => {
    const hourlyTime = new Date(time).getTime()

    if (!Number.isFinite(hourlyTime)) return

    const difference = Math.abs(targetTime - hourlyTime)

    if (difference < smallestDifference) {
      smallestDifference = difference
      nearestIndex = index
    }
  })

  return nearestIndex
}

function WeatherHighlights({ current, hourly, loading }) {
  // Find nearest hourly data point
  const hourlyIndex = getNearestHourlyIndex(current?.time, hourly?.time)

  // Current weather values
  const humidity = current?.relative_humidity_2m
  const windSpeed = current?.wind_speed_10m

  // Hourly weather values
  const uvIndex = hourlyIndex >= 0 ? hourly?.uv_index?.[hourlyIndex] : null

  const visibilityMeters =
    hourlyIndex >= 0 ? hourly?.visibility?.[hourlyIndex] : null

  const cloudCover =
    hourlyIndex >= 0 ? hourly?.cloud_cover?.[hourlyIndex] : null

  const precipitation =
    hourlyIndex >= 0 ? hourly?.precipitation?.[hourlyIndex] : null

  // Unit conversions
  const visibilityKm = visibilityMeters != null ? visibilityMeters / 1000 : null

  // Format values
  const humidityValue = humidity != null ? `${Math.round(humidity)}%` : '--'

  const windSpeedValue =
    windSpeed != null ? `${Math.round(windSpeed)} km/h` : '--'

  const uvValue = uvIndex != null ? `${Math.round(uvIndex)}` : '--'

  const visibilityValue =
    visibilityKm != null ? `${Number(visibilityKm.toFixed(1))} km` : '--'

  const cloudCoverValue =
    cloudCover != null ? `${Math.round(cloudCover)}%` : '--'

  const precipitationValue =
    precipitation != null ? `${Number(precipitation.toFixed(1))} mm` : '--'

  // All six weather highlights
  const highlights = [
    {
      title: 'Humidity',
      value: humidityValue,
      description: 'Moisture in the air',
      icon: '/image/icons/humidity.png',
      accent: 'bg-sky-500',
      iconBackground: 'bg-sky-500/10 dark:bg-sky-500/10',
    },
    {
      title: 'Wind Speed',
      value: windSpeedValue,
      description: 'Current wind condition',
      icon: '/image/icons/wind-speed.png',
      accent: 'bg-teal-400',
      iconBackground: 'bg-teal-500/10 dark:bg-teal-500/10',
    },
    {
      title: 'UV Index',
      value: uvValue,
      description: 'Ultraviolet intensity',
      icon: '/image/icons/uv-index.png',
      accent: 'bg-amber-400',
      iconBackground: 'bg-amber-500/10 dark:bg-amber-500/10',
      status: uvIndex != null ? getUVStatus(uvIndex) : null,
    },
    {
      title: 'Visibility',
      value: visibilityValue,
      description: 'How far you can see',
      icon: '/image/icons/visibility.png',
      accent: 'bg-violet-500',
      iconBackground: 'bg-violet-500/10 dark:bg-violet-500/10',
    },
    {
      title: 'Cloud Cover',
      value: cloudCoverValue,
      description: 'Cloud coverage',
      symbol: 'cloud',
      accent: 'bg-indigo-400',
      iconBackground: 'bg-indigo-500/10 dark:bg-indigo-500/10',
    },
    {
      title: 'Precipitation',
      value: precipitationValue,
      description: 'Previous hour total',
      symbol: 'precipitation',
      accent: 'bg-blue-500',
      iconBackground: 'bg-blue-500/10 dark:bg-blue-500/10',
    },
  ]

  return (
    <section
      aria-busy={loading}
      className="font-montserrat relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors duration-300 sm:p-6 dark:border-slate-700 dark:bg-[#111D32]"
    >
      {/* Header */}
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Analytics icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 19V5m0 14h16" strokeLinecap="round" />
              <rect x="7" y="11" width="3" height="5" rx="1" />
              <rect x="13" y="7" width="3" height="9" rx="1" />
              <rect x="19" y="3" width="1" height="13" rx=".5" />
            </svg>
          </div>

          {/* Header divider */}
          <div className="h-10 w-px shrink-0 bg-slate-200 dark:bg-slate-700" />

          {/* Title */}
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Today's Highlights
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
              Important weather conditions at a glance
            </p>
          </div>
        </div>
      </div>

      {/* Weather Metrics - 2 Columns x 3 Rows */}
      <div className="relative z-10 mt-5 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group relative flex min-h-[88px] min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:gap-3.5 sm:p-3.5 dark:border-slate-700 dark:bg-[#17263E] dark:hover:border-slate-500 dark:hover:bg-[#1B2A42]"
          >
            {/* Colored accent line */}
            <div
              className={`absolute bottom-6 left-0 top-6 w-1 rounded-r-full ${item.accent}`}
            />

            {/* Metric icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${item.iconBackground}`}
            >
              {item.icon ? (
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                />
              ) : item.symbol === 'cloud' ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7 text-indigo-500 dark:text-indigo-300"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 18a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 20 11a3.5 3.5 0 0 1-.5 7H7.5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7 text-blue-500 dark:text-blue-300"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3C10.2 5.7 6 10.2 6 14.1a6 6 0 0 0 12 0C18 10.2 13.8 5.7 12 3Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Metric title and description */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100">
                {item.title}
              </h3>

              <p className="mt-1 truncate text-[10px] font-medium leading-4 text-slate-500 sm:text-xs dark:text-slate-400">
                {item.description}
              </p>
            </div>

            {/* Metric value and status */}
            <div className="flex shrink-0 flex-col items-end justify-center gap-1">
              <p className="text-lg font-bold tracking-tight tabular-nums text-slate-900 sm:text-xl lg:text-2xl dark:text-white">
                {item.value}
              </p>

              {item.status && (
                <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherHighlights
