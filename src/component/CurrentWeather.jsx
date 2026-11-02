function CurrentWeather() {
  const weather = {
    city: 'Colombo, Sri Lanka',
    temperature: 30,
    condition: 'Partly Cloudy',
    feelsLike: 32,
    high: 31,
    low: 27,
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <section
      id="today"
      className="relative isolate flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-blue-900 p-5 text-white shadow-sm sm:p-6 xl:min-h-0"
    >
      {/* Background image */}
      <img
        src="\image\weather-hero.png"
        alt="Colombo city and coastline"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/85 via-blue-950/45 to-blue-950/10" />

      <div className="relative z-10">
        {/* Location and date */}
        <div className="flex items-center gap-2">
          <span className="text-xl">📍</span>

          <h2 className="text-lg font-bold sm:text-xl">{weather.city}</h2>
        </div>

        <p className="mt-1 pl-7 text-sm text-blue-100">{today}</p>

        {/* Temperature */}
        <div className="mt-12">
          <p className="font-display text-7xl font-bold tracking-[-0.05em] tabular-nums">
            {weather.temperature}°C
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold">
            {weather.condition}
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Feels like {weather.feelsLike}°C
          </p>
        </div>
      </div>

      {/* High and Low temperature */}
      <div className="relative z-10 mt-10 flex items-center gap-6">
        <div>
          <p className="text-xs text-blue-100">↑ High</p>

          <p className="text-lg font-bold">{weather.high}°C</p>
        </div>

        <div className="h-10 w-px bg-white/30" />

        <div>
          <p className="text-xs text-blue-100">↓ Low</p>

          <p className="text-lg font-bold">{weather.low}°C</p>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
