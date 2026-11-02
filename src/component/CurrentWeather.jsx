function CurrentWeather() {
  // Temporary sample data
  // Later, we will replace this with Open-Meteo API data.
  const weather = {
    city: 'Colombo',
    country: 'Sri Lanka',
    temperature: 29,
    condition: 'Partly Cloudy',
    feelsLike: 32,
    high: 31,
    low: 25,
    icon: '🌤️',
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      id="today"
      className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      {/* Location and date */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Current Weather</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {weather.city}, {weather.country}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{today}</p>
        </div>

        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          Live weather coming soon
        </span>
      </div>

      {/* Main weather information */}
      <div className="mt-10 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        {/* Temperature */}
        <div>
          <p className="text-sm font-medium text-slate-500">Right now</p>

          <div className="mt-2 flex items-start gap-3">
            <span
              className="text-6xl sm:text-7xl"
              role="img"
              aria-label={weather.condition}
            >
              {weather.icon}
            </span>

            <div>
              <p className="text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl">
                {weather.temperature}°
              </p>

              <p className="mt-2 font-medium text-slate-600">
                {weather.condition}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Feels like{' '}
            <span className="font-semibold text-slate-800">
              {weather.feelsLike}°C
            </span>
          </p>
        </div>

        {/* Today's high and low */}
        <div className="rounded-2xl bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-500">
            Today's temperature
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">High</p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {weather.high}°C
              </p>
            </div>

            <div className="h-12 w-px bg-slate-200" />

            <div>
              <p className="text-sm text-slate-500">Low</p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {weather.low}°C
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Daily high and low temperatures will be loaded from the weather API.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
