import { useEffect, useRef, useState } from 'react'

import Navbar from './component/Navbar'
import CurrentWeather from './component/CurrentWeather'
import WeatherHighlights from './component/WeatherHighlights'
import FiveHourForecast from './component/FiveHourForecast'
import WeeklyForecast from './component/WeeklyForecast'

import { searchLocations } from './services/geocodingService'
import { getWeatherForecast } from './services/weatherService'

// Default dashboard location
const DEFAULT_LOCATION = {
  name: 'Colombo',
  country: 'Sri Lanka',
  latitude: 6.9271,
  longitude: 79.8612,
  timezone: 'Asia/Colombo',
}

function App() {
  const [unit, setUnit] = useState('C')

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('weatherAidTheme') === 'dark'
  )

  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)

  const [weatherData, setWeatherData] = useState(null)

  const [isWeatherLoading, setIsWeatherLoading] = useState(true)

  const [apiStatus, setApiStatus] = useState('loading')

  const [isSearching, setIsSearching] = useState(false)

  const [weatherError, setWeatherError] = useState('')

  const searchControllerRef = useRef(null)

  // Apply light / dark theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)

    localStorage.setItem('weatherAidTheme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Fetch weather data
  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      setIsWeatherLoading(true)
      setApiStatus('loading')
      setWeatherError('')

      try {
        const data = await getWeatherForecast(selectedLocation, {
          temperatureUnit: unit === 'C' ? 'celsius' : 'fahrenheit',
          signal: controller.signal,
        })

        if (controller.signal.aborted) return

        setWeatherData(data)
        setApiStatus('online')
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Weather API error:', error)

          setApiStatus('offline')

          setWeatherError('Unable to load weather data. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsWeatherLoading(false)
        }
      }
    }

    loadWeather()

    return () => controller.abort()
  }, [selectedLocation, unit])

  // Search city or select autocomplete suggestion
  async function handleSearch(query) {
    // A selected suggestion already contains coordinates
    if (query && typeof query === 'object') {
      setSelectedLocation(query)
      setWeatherError('')
      return
    }

    const searchTerm = query.trim()

    if (!searchTerm) return

    // Cancel previous search
    searchControllerRef.current?.abort()

    const controller = new AbortController()
    searchControllerRef.current = controller

    setIsSearching(true)
    setWeatherError('')

    try {
      const results = await searchLocations(searchTerm, {
        signal: controller.signal,
      })

      if (controller.signal.aborted) return

      if (results.length === 0) {
        setWeatherError('No matching location found.')
        return
      }

      setSelectedLocation(results[0])
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Location search error:', error)

        setWeatherError('Unable to search for this location. Please try again.')
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsSearching(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#080F20] dark:text-slate-100 xl:flex xl:h-screen xl:flex-col xl:overflow-hidden">
      {/* Navigation */}
      <Navbar
        onSearch={handleSearch}
        unit={unit}
        onUnitChange={setUnit}
        darkMode={isDarkMode}
        apiStatus={apiStatus}
        onToggleDarkMode={() => setIsDarkMode((previous) => !previous)}
      />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-5 px-5 py-5 sm:px-6 lg:px-8 xl:min-h-0 xl:overflow-hidden">
        {/* Dashboard introduction */}
        <header className="shrink-0">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Your daily weather
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Weather forecast for {selectedLocation.name},{' '}
            {selectedLocation.country}
          </p>

          {isSearching && (
            <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
              Searching location...
            </p>
          )}

          {weatherError && (
            <p className="mt-1 text-sm text-red-500">{weatherError}</p>
          )}
        </header>

        {/* Top dashboard row */}
        <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-[1.1] xl:grid-cols-12">
          <div className="xl:col-span-7 xl:min-h-0">
            <CurrentWeather
              current={weatherData?.current}
              daily={weatherData?.daily}
              location={selectedLocation}
              timezone={weatherData?.timezone}
              loading={isWeatherLoading}
              unit={unit}
            />
          </div>

          <div className="xl:col-span-5 xl:min-h-0">
            <WeatherHighlights
              current={weatherData?.current}
              hourly={weatherData?.hourly}
              loading={isWeatherLoading}
            />
          </div>
        </section>

        {/* Forecast row */}
        <section className="grid grid-cols-1 items-stretch gap-5 xl:min-h-0 xl:flex-1 xl:grid-cols-12">
          <div className="xl:col-span-5 xl:min-h-0">
            <FiveHourForecast
              key={`${selectedLocation.latitude}-${selectedLocation.longitude}`}
              current={weatherData?.current}
              hourly={weatherData?.hourly}
              loading={isWeatherLoading}
              unit={unit}
            />
          </div>

          <div className="xl:col-span-7 xl:min-h-0">
            <WeeklyForecast
              daily={weatherData?.daily}
              loading={isWeatherLoading}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
