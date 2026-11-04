import { getWeatherInfo } from '../utils/weatherAssets'
import LocalTimeDisplay from './LocalTimeDisplay'

function CurrentWeather({
  current,
  daily,
  location,
  timezone,
  loading,
  unit = 'C',
}) {
  // Get current weather information
  const weatherCode = current?.weather_code ?? 0
  const isDay = current?.is_day ?? 1

  // Get weather description and background image
  const weatherInfo = getWeatherInfo(weatherCode, isDay)

  // Weather values from Open-Meteo API
  const temperature = current?.temperature_2m
  const feelsLike = current?.apparent_temperature

  const high = daily?.temperature_2m_max?.[0]
  const low = daily?.temperature_2m_min?.[0]

  // Sunrise and sunset from daily forecast
  const sunrise = daily?.sunrise?.[0]
  const sunset = daily?.sunset?.[0]

  // Location information
  const city = location?.name || 'Colombo'
  const country = location?.country || 'Sri Lanka'

  // Use day image if the night image is unavailable
  function handleImageError(event) {
    event.currentTarget.onerror = null
    event.currentTarget.src = weatherInfo.dayImage
  }

  return (
    <section
      id="today"
      aria-busy={loading}
      className="relative isolate flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-blue-900 p-5 text-white shadow-sm sm:p-6 xl:min-h-0"
    >
      {/* Dynamic weather background */}
      <img
        src={weatherInfo.image}
        alt=""
        aria-hidden="true"
        onError={handleImageError}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Main dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/85 via-blue-950/45 to-blue-950/10" />

      {/* Subtle bottom-right natural vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_100%_100%,rgba(2,6,23,0.35)_0%,rgba(2,6,23,0.70)_42%,rgba(2,6,23,0.20)_75%,transparent_100%)]"
      />

      {/* Location and weather information */}
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">📍</span>

          <h2 className="font-display text-lg font-bold sm:text-xl">
            {city}, {country}
          </h2>
        </div>

        {/* Temperature */}
        <div className="mt-10">
          <p className="font-display text-6xl font-bold leading-none tracking-tight tabular-nums sm:text-7xl">
            {temperature != null ? `${Math.round(temperature)}°${unit}` : '--'}
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
            {weatherInfo.description}
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Feels like{' '}
            {feelsLike != null ? `${Math.round(feelsLike)}°${unit}` : '--'}
          </p>

          {loading && (
            <p className="mt-2 text-xs text-blue-100">Updating weather...</p>
          )}
        </div>
      </div>

      {/* High and Low temperatures */}
      <div className="relative z-10 mt-8 flex items-center gap-6">
        <div>
          <p className="text-xs text-blue-100">↑ High</p>
          <p className="font-display text-lg font-bold">
            {high != null ? `${Math.round(high)}°${unit}` : '--'}
          </p>
        </div>

        <div className="h-9 w-px bg-white/30" />

        <div>
          <p className="text-xs text-blue-100">↓ Low</p>
          <p className="font-display text-lg font-bold">
            {low != null ? `${Math.round(low)}°${unit}` : '--'}
          </p>
        </div>
      </div>

      {/* Local Time Widget */}
      <LocalTimeDisplay
        timeZone={timezone || location?.timezone || 'Asia/Colombo'}
        sunrise={sunrise}
        sunset={sunset}
      />
    </section>
  )
}

export default CurrentWeather
