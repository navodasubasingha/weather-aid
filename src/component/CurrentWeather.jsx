import { getWeatherInfo } from '../utils/weatherAssets'
import LocalTimeDisplay from './LocalTimeDisplay'

// Open-Meteo weather codes for rain and snow
function getWeatherEffect(weatherCode) {
  const snowCodes = [71, 73, 75, 77, 85, 86]

  const rainCodes = [
    51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
  ]

  if (snowCodes.includes(weatherCode)) return 'snow'
  if (rainCodes.includes(weatherCode)) return 'rain'

  return null
}

// Generate rain drops
const rainDrops = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  delay: -((index * 13) % 10) / 10,
  duration: 1.1 + ((index * 11) % 50) / 100,
}))

// Generate snowflakes
const snowFlakes = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: (index * 43) % 100,
  delay: -((index * 7) % 90) / 10,
  duration: 10 + ((index * 5) % 6),
  size: 10 + ((index * 3) % 12),
  drift: index % 2 === 0 ? 35 : -35,
}))

// Rain and snow animation component
function WeatherEffect({ type }) {
  if (type === 'rain') {
    return (
      <div className="weather-effect-layer" aria-hidden="true">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="weather-rain-drop"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          >
            <span className="weather-rain-stem" />
            <span
              className="weather-rain-splat"
              style={{
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'snow') {
    return (
      <div className="weather-effect-layer" aria-hidden="true">
        {snowFlakes.map((flake) => (
          <span
            key={flake.id}
            className="weather-snowflake"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              '--snow-drift': `${flake.drift}px`,
            }}
          >
            ❄
          </span>
        ))}
      </div>
    )
  }

  return null
}

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

  // Select rain / snow animation
  const weatherEffect = getWeatherEffect(weatherCode)

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
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Main dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-blue-950/85 via-blue-950/45 to-blue-950/10" />

      {/* Bottom-right natural vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_65%_55%_at_100%_100%,rgba(2,6,23,0.35)_0%,rgba(2,6,23,0.70)_42%,rgba(2,6,23,0.20)_75%,transparent_100%)]"
      />

      {/* Rain / Snow animation */}
      <WeatherEffect type={weatherEffect} />

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
