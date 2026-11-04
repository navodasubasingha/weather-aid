function getUVStatus(value) {
  if (value == null) return ''

  if (value <= 2) return 'Low'
  if (value <= 5) return 'Moderate'
  if (value <= 7) return 'High'
  if (value <= 10) return 'Very High'

  return 'Extreme'
}

// Find the hourly forecast closest to the current weather time
function getNearestHourlyIndex(currentTime, hourlyTimes) {
  if (!currentTime || !Array.isArray(hourlyTimes) || hourlyTimes.length === 0) {
    return -1
  }

  const targetTime = new Date(currentTime).getTime()

  if (!Number.isFinite(targetTime)) {
    return -1
  }

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
  // Find the closest hourly data point
  const hourlyIndex = getNearestHourlyIndex(current?.time, hourly?.time)

  // Current weather values
  const humidity = current?.relative_humidity_2m
  const windSpeed = current?.wind_speed_10m

  // UV and visibility are obtained from the nearest hourly forecast
  const uvIndex = hourlyIndex >= 0 ? hourly?.uv_index?.[hourlyIndex] : null

  const visibilityMeters =
    hourlyIndex >= 0 ? hourly?.visibility?.[hourlyIndex] : null

  // Convert visibility from meters to kilometers
  const visibilityKm = visibilityMeters != null ? visibilityMeters / 1000 : null

  // Format values
  const humidityValue = humidity != null ? `${Math.round(humidity)}%` : '--'

  const windSpeedValue =
    windSpeed != null ? `${Math.round(windSpeed)} km/h` : '--'

  const uvValue = uvIndex != null ? `${Math.round(uvIndex)}` : '--'

  const visibilityValue =
    visibilityKm != null ? `${Number(visibilityKm.toFixed(1))} km` : '--'

  const highlights = [
    {
      title: 'Humidity',
      value: humidityValue,
      description: 'Moisture in the air',
      icon: '/image/icons/humidity.png',
    },
    {
      title: 'Wind Speed',
      value: windSpeedValue,
      description: 'Current wind condition',
      icon: '/image/icons/wind-speed.png',
    },
    {
      title: 'UV Index',
      value: uvValue,
      description: 'Ultraviolet intensity',
      icon: '/image/icons/uv-index.png',
      status: uvIndex != null ? getUVStatus(uvIndex) : null,
    },
    {
      title: 'Visibility',
      value: visibilityValue,
      description: 'How far you can see',
      icon: '/image/icons/visibility.png',
    },
  ]

  return (
    <section
      aria-busy={loading}
      className="font-montserrat relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/70 p-5 shadow-sm transition-colors duration-300 sm:p-6 xl:min-h-0 dark:border-slate-700 dark:from-[#111D32] dark:via-[#17263E] dark:to-[#1E293B]"
    >
      {/* Decorative background effects */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />

      {/* Header */}
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
            Today's Highlights
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Important weather conditions at a glance
          </p>
        </div>

        {/* Analytics icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white/80 text-blue-600 shadow-sm dark:border-slate-700 dark:bg-[#1B2A42] dark:text-blue-300">
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

      {/* Weather Metrics - 2 x 2 Grid */}
      <div className="relative z-10 mt-5 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group relative flex min-h-[125px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-blue-100/80 bg-white/80 p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-md sm:p-4 dark:border-slate-700 dark:bg-[#1B2A42] dark:hover:border-blue-500 dark:hover:bg-[#223550]"
          >
            {/* Metric title and icon */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50/90 transition-colors duration-200 group-hover:bg-blue-100 sm:h-11 sm:w-11 dark:bg-[#263B5D] dark:group-hover:bg-[#304A70]">
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>

                <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Metric value */}
            <div className="mt-3 flex items-end justify-between gap-2">
              <p className="text-2xl font-bold tracking-tight tabular-nums text-slate-900 sm:text-[27px] dark:text-white">
                {item.value}
              </p>

              {item.status && (
                <span className="mb-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* API Data Information
      <div className="relative z-10 mt-4 flex shrink-0 items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

        <p className="text-[10px] font-medium text-slate-400 sm:text-[11px] dark:text-slate-500">
          Weather data provided by Open-Meteo
        </p>
      </div> */}
    </section>
  )
}

export default WeatherHighlights
