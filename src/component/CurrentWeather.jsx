import { getWeatherInfo } from '../utils/weatherAssets'
import LocalTimeDisplay from './LocalTimeDisplay'

function CurrentWeather() {
  // Temporary sample weather data
  const weather = {
    city: 'Colombo, Sri Lanka',
    temperature: 30,
    weatherCode: 45,
    isDay: 0,
    feelsLike: 32,
    high: 31,
    low: 27,
    timezone: 'Asia/Colombo',
    sunrise: undefined,
    sunset: undefined,
  }

  // Get weather description and background image
  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay)

  // Use day image if the night image is unavailable
  function handleImageError(event) {
    event.currentTarget.onerror = null
    event.currentTarget.src = weatherInfo.dayImage
  }

  return (
    <section
      id="today"
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

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/85 via-blue-950/45 to-blue-950/10" />

      {/* Location and weather information */}
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">📍</span>

          <h2 className="font-display text-lg font-bold sm:text-xl">
            {weather.city}
          </h2>
        </div>

        {/* Temperature */}
        <div className="mt-10">
          <p className="font-display text-6xl font-bold leading-none tracking-tight tabular-nums sm:text-7xl">
            {weather.temperature}°C
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
            {weatherInfo.description}
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Feels like {weather.feelsLike}°C
          </p>
        </div>
      </div>

      {/* High and Low temperatures */}
      <div className="relative z-10 mt-8 flex items-center gap-6">
        <div>
          <p className="text-xs text-blue-100">↑ High</p>
          <p className="font-display text-lg font-bold">{weather.high}°C</p>
        </div>

        <div className="h-9 w-px bg-white/30" />

        <div>
          <p className="text-xs text-blue-100">↓ Low</p>
          <p className="font-display text-lg font-bold">{weather.low}°C</p>
        </div>
      </div>

      {/* Local Time Widget */}
      <LocalTimeDisplay
        timeZone={weather.timezone}
        sunrise={weather.sunrise}
        sunset={weather.sunset}
      />
    </section>
  )
}

export default CurrentWeather
