const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

/**
 * Fetch weather forecast data from Open-Meteo API.
 *
 * @param {Object} location - Location coordinates.
 * @param {Object} options - API configuration.
 * @returns {Promise<Object>} Weather forecast data.
 */
export async function getWeatherForecast(
  location,
  { temperatureUnit = 'celsius', windSpeedUnit = 'kmh', signal } = {}
) {
  // Validate location coordinates
  const latitude = Number(location?.latitude)
  const longitude = Number(location?.longitude)

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error('Invalid location coordinates')
  }

  // Validate temperature unit
  if (!['celsius', 'fahrenheit'].includes(temperatureUnit)) {
    throw new Error('Invalid temperature unit')
  }

  // Validate wind speed unit
  if (!['kmh', 'ms', 'mph', 'kn'].includes(windSpeedUnit)) {
    throw new Error('Invalid wind speed unit')
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    // Current weather conditions
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(','),

    // Hourly weather forecast
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'weather_code',
      'is_day',
      'wind_speed_10m',
      'wind_direction_10m',
      'visibility',
      'uv_index',
    ].join(','),

    // Daily weather forecast
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_probability_max',
    ].join(','),

    // API configuration
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: temperatureUnit,
    wind_speed_unit: windSpeedUnit,
    timeformat: 'iso8601',
  })

  try {
    const response = await fetch(`${WEATHER_API}?${params.toString()}`, {
      signal,
    })

    const data = await response.json().catch(() => null)

    // Check API response
    if (!response.ok || !data || data.error) {
      throw new Error(
        data?.reason || `Weather API request failed. Status: ${response.status}`
      )
    }

    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    console.error('Weather API Error:', error)

    throw new Error(error.message || 'Unable to fetch weather data', {
      cause: error,
    })
  }
}
