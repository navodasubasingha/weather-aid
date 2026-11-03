const WEATHER_TYPES = [
  {
    codes: [0],
    key: 'sunny',
    description: 'Clear Sky',
  },
  {
    codes: [1],
    key: 'mainly-clear',
    description: 'Mainly Clear',
  },
  {
    codes: [2],
    key: 'partly-cloudy',
    description: 'Partly Cloudy',
  },
  {
    codes: [3],
    key: 'cloudy',
    description: 'Overcast',
  },
  {
    codes: [45, 48],
    key: 'fog',
    description: 'Foggy',
  },
  {
    codes: [51, 53, 55, 56, 57],
    key: 'drizzle',
    description: 'Drizzle',
  },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    key: 'rainy',
    description: 'Rainy',
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    key: 'snow',
    description: 'Snow',
  },
  {
    codes: [95, 96, 99],
    key: 'thunderstorm',
    description: 'Thunderstorm',
  },
]

export function getWeatherInfo(weatherCode, isDay = 1) {
  const weather = WEATHER_TYPES.find((item) =>
    item.codes.includes(Number(weatherCode))
  )

  const selectedWeather = weather || WEATHER_TYPES[3]

  const isDaytime = Number(isDay) === 1

  const dayImage = `/image/weather/${selectedWeather.key}.jpg`

  const nightImage = `/image/weather/${selectedWeather.key}-night.jpg`

  return {
    description: selectedWeather.description,
    image: isDaytime ? dayImage : nightImage,
    dayImage,
    isDay: isDaytime,
  }
}
