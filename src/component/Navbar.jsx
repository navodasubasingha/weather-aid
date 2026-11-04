import { useEffect, useState } from 'react'
import { searchLocations } from '../services/geocodingService'

function Navbar({
  onSearch,
  unit = 'C',
  onUnitChange,
  darkMode = false,
  onToggleDarkMode,
  apiStatus = 'loading',
}) {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [logoImageFailed, setLogoImageFailed] = useState(false)

  // API status
  const isApiLoading = apiStatus === 'loading'
  const isApiOnline = apiStatus === 'online'

  const apiStatusLabel = isApiLoading
    ? 'Connecting...'
    : isApiOnline
      ? 'Online'
      : 'Offline'

  // City autocomplete suggestions
  useEffect(() => {
    const query = city.trim()

    if (query.length < 2) return undefined

    const controller = new AbortController()

    const debounceTimer = setTimeout(async () => {
      setIsSuggestionsLoading(true)

      try {
        const results = await searchLocations(query, {
          signal: controller.signal,
        })

        setSuggestions(results)
        setShowSuggestions(true)
        setActiveSuggestionIndex(-1)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('City suggestions error:', error)
          setSuggestions([])
          setShowSuggestions(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSuggestionsLoading(false)
        }
      }
    }, 300)

    return () => {
      clearTimeout(debounceTimer)
      controller.abort()
    }
  }, [city])

  // User's browser timezone
  const browserTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

  const [userLocation, setUserLocation] = useState({
    city: '',
    country: '',
    timeZone: browserTimeZone,
  })

  const [locationStatus, setLocationStatus] = useState(() =>
    typeof navigator !== 'undefined' && navigator.geolocation
      ? 'loading'
      : 'unsupported'
  )

  // Current time
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Detect user's GPS location
  useEffect(() => {
    let isActive = true

    if (!navigator.geolocation) {
      return () => {
        isActive = false
      }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        const locationParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          localityLanguage: 'en',
        })

        const reverseGeocodeURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?${locationParams}`

        const timezoneParams = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: 'temperature_2m',
          timezone: 'auto',
        })

        const timezoneURL = `https://api.open-meteo.com/v1/forecast?${timezoneParams}`

        const [locationResult, timezoneResult] = await Promise.allSettled([
          fetch(reverseGeocodeURL).then((response) => {
            if (!response.ok) {
              throw new Error('Location lookup failed')
            }

            return response.json()
          }),

          fetch(timezoneURL).then((response) => {
            if (!response.ok) {
              throw new Error('Timezone lookup failed')
            }

            return response.json()
          }),
        ])

        if (!isActive) return

        const locationData =
          locationResult.status === 'fulfilled' ? locationResult.value : {}

        const timezoneData =
          timezoneResult.status === 'fulfilled' ? timezoneResult.value : {}

        const detectedCity =
          locationData.city ||
          locationData.locality ||
          locationData.principalSubdivision ||
          ''

        const detectedCountry = locationData.countryName || ''

        const detectedTimezone = timezoneData.timezone || browserTimeZone

        setUserLocation({
          city: detectedCity,
          country: detectedCountry,
          timeZone: detectedTimezone,
        })

        if (detectedCity || detectedCountry) {
          setLocationStatus('success')
        } else if (timezoneData.timezone) {
          setLocationStatus('partial')
        } else {
          setLocationStatus('error')
        }
      },

      (error) => {
        if (!isActive) return

        if (error.code === 1) {
          setLocationStatus('denied')
        } else {
          setLocationStatus('error')
        }
      },

      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    )

    return () => {
      isActive = false
    }
  }, [browserTimeZone])

  // User local time
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: userLocation.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(currentTime)

  // User local date
  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone: userLocation.timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(currentTime)

  // Day / Night
  const localHour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: userLocation.timeZone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(currentTime)
  )

  const isDayTime = localHour >= 6 && localHour < 18

  // Search input change
  function handleCityChange(event) {
    const value = event.target.value

    setCity(value)
    setActiveSuggestionIndex(-1)

    if (value.trim().length >= 2) {
      setSuggestions([])
      setIsSuggestionsLoading(true)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setIsSuggestionsLoading(false)
    }
  }

  // Select city suggestion
  function handleSelectSuggestion(location) {
    onSearch?.(location)

    setCity('')
    setSuggestions([])
    setShowSuggestions(false)
    setIsSuggestionsLoading(false)
    setActiveSuggestionIndex(-1)
  }

  // Keyboard navigation
  function handleSuggestionKeyDown(event) {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault()
      setShowSuggestions(true)

      setActiveSuggestionIndex((previous) =>
        previous >= suggestions.length - 1 ? 0 : previous + 1
      )
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault()

      setActiveSuggestionIndex((previous) =>
        previous <= 0 ? suggestions.length - 1 : previous - 1
      )
    } else if (event.key === 'Escape') {
      setShowSuggestions(false)
      setActiveSuggestionIndex(-1)
    } else if (
      event.key === 'Enter' &&
      activeSuggestionIndex >= 0 &&
      suggestions[activeSuggestionIndex]
    ) {
      event.preventDefault()
      handleSelectSuggestion(suggestions[activeSuggestionIndex])
    }
  }

  // Search submit
  function handleSubmit(event) {
    event.preventDefault()

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      handleSelectSuggestion(suggestions[activeSuggestionIndex])
      return
    }

    const searchCity = city.trim()

    if (searchCity && onSearch) {
      onSearch(searchCity)

      setCity('')
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Suggestions dropdown

  function renderSuggestions(isMobile = false) {
    if (!showSuggestions || city.trim().length < 2) {
      return null
    }

    return (
      <div
        role="listbox"
        aria-label="City suggestions"
        className={`weather-suggestions-scrollbar absolute top-full z-[70] mt-2 max-h-[360px] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-[0_16px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700 dark:bg-[#111D32]/95 dark:shadow-black/40 ${
          isMobile
            ? 'left-0 right-0 w-full'
            : 'left-0 w-[320px] max-w-[calc(100vw-2rem)]'
        }`}
      >
        {isSuggestionsLoading ? (
          <div className="flex items-center gap-3 px-4 py-5 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500/25 border-t-blue-500" />
            Searching locations...
          </div>
        ) : suggestions.length > 0 ? (
          <div className="flex flex-col gap-1">
            {suggestions.map((location, index) => {
              const detail = [location.admin1, location.country]
                .filter(
                  (value, valueIndex, values) =>
                    value &&
                    value !== location.name &&
                    values.indexOf(value) === valueIndex
                )
                .join(', ')

              return (
                <button
                  key={
                    location.id ??
                    `${location.name}-${location.latitude}-${location.longitude}`
                  }
                  type="button"
                  role="option"
                  aria-selected={activeSuggestionIndex === index}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  onClick={() => handleSelectSuggestion(location)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-all duration-150 ${
                    activeSuggestionIndex === index
                      ? 'bg-blue-50 dark:bg-[#263B5D]'
                      : 'hover:bg-slate-50 dark:hover:bg-[#1B2A42]'
                  }`}
                >
                  {/* Location icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-100 dark:bg-[#263B5D] dark:text-blue-400 dark:group-hover:bg-[#304A70]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>

                  {/* Location details */}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {location.name}
                    </span>

                    <span className="mt-1 block truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                      {detail || 'Location'}
                    </span>
                  </span>

                  {/* Arrow icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-slate-500"
                    aria-hidden="true"
                  >
                    <path
                      d="m9 18 6-6-6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="px-4 py-6 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              No matching locations found
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try another city name.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-[#080F20]/90">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[76px] items-center justify-between gap-4">
          {/* Brand and API connection status */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {/* Brand Logo */}
            <a
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label="WeatherAid home"
            >
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-200/50 transition-transform duration-300 group-hover:scale-105 dark:shadow-blue-950/40">
                {!logoImageFailed && (
                  <img
                    src="/images/weather-aid-logo.png"
                    alt=""
                    aria-hidden="true"
                    onError={() => setLogoImageFailed(true)}
                    className="absolute inset-0 h-full w-full object-contain p-1.5"
                  />
                )}

                {logoImageFailed && (
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="h-8 w-8 text-white"
                    aria-hidden="true"
                  >
                    <circle cx="25" cy="17" r="8" fill="#FDE68A" />

                    <path
                      d="M12 30.5C12 26.9 14.9 24 18.5 24C19.1 19.9 22.6 17 26.7 17C31.2 17 34.8 20.6 34.8 25.1C38.1 25.1 40.5 27.6 40.5 30.7C40.5 34 37.8 36.5 34.5 36.5H18.5C14.9 36.5 12 33.8 12 30.5Z"
                      fill="white"
                      fillOpacity="0.95"
                    />
                  </svg>
                )}
              </div>

              <div className="leading-none">
                <span className="font-display text-[21px] font-bold tracking-[-0.06em] text-slate-900 dark:text-white">
                  Weather<span className="text-blue-600">Aid</span>
                </span>

                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-400 dark:text-slate-500">
                  Weather intelligence
                </p>
              </div>
            </a>

            {/* API Connection Status */}
            <div
              role="status"
              aria-live="polite"
              aria-label={`Open-Meteo API status: ${apiStatusLabel}`}
              title={`Open-Meteo API: ${apiStatusLabel}`}
              className="ml-3 hidden shrink-0 items-center gap-2 rounded-full bg-transparent px-3 py-2 text-xs font-semibold sm:inline-flex"
            >
              {isApiLoading ? (
                <span
                  className="h-3 w-3 animate-spin rounded-full border-2 border-blue-500/25 border-t-blue-500"
                  aria-hidden="true"
                />
              ) : (
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${
                      isApiOnline ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />

                  <span
                    className={`relative inline-flex h-2.5 w-2.5 animate-pulse rounded-full ${
                      isApiOnline
                        ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                        : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                    }`}
                  />
                </span>
              )}

              <span
                className={
                  isApiLoading
                    ? 'text-blue-600 dark:text-blue-400'
                    : isApiOnline
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                }
              >
                {apiStatusLabel}
              </span>
            </div>
          </div>

          {/* Center - User Location, Time and Date */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 xl:flex">
            {/* User Country / City */}
            <div className="flex items-center gap-1.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-3.5 w-3.5 shrink-0 text-blue-500 dark:text-blue-400"
                aria-hidden="true"
              >
                <path
                  d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="12" cy="10" r="2.5" />
              </svg>

              {locationStatus === 'loading' ? (
                <span className="text-xs font-medium text-slate-400">
                  Detecting your location...
                </span>
              ) : locationStatus === 'success' ||
                locationStatus === 'partial' ? (
                <>
                  <span className="text-[13px] font-bold tracking-wide text-slate-800 dark:text-slate-100">
                    {userLocation.country || 'Current Location'}
                  </span>

                  {userLocation.city && (
                    <>
                      <span className="text-xs text-slate-400">/</span>

                      <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
                        {userLocation.city}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Location access needed
                </span>
              )}
            </div>

            {/* Local Time and Date */}
            <div className="flex items-center gap-3">
              {/* Day / Night Image + Local Time */}
              <div className="flex items-center gap-1.5">
                <img
                  src={
                    isDayTime
                      ? '/image/icons/day-time.png'
                      : '/image/icons/night-time.png'
                  }
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 object-contain"
                />

                <span className="font-display text-xs font-bold tabular-nums text-slate-700 dark:text-slate-200">
                  {localTime}
                </span>
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

              {/* Local Date */}
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {localDate}
              </span>
            </div>
          </div>

          {/* Right-side Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Desktop City Search */}
            <form
              onSubmit={handleSubmit}
              className="relative hidden h-10 w-44 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:bg-slate-800 lg:flex xl:w-52"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[18px] w-[18px] shrink-0 text-slate-400"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" strokeLinecap="round" />
              </svg>

              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                onKeyDown={handleSuggestionKeyDown}
                onFocus={() =>
                  city.trim().length >= 2 && setShowSuggestions(true)
                }
                onBlur={() => setShowSuggestions(false)}
                placeholder="Search city..."
                aria-label="Search city"
                className="w-full min-w-0 bg-transparent text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="submit"
                aria-label="Submit city search"
                className="text-xs font-bold text-blue-600 transition hover:text-blue-800 dark:text-blue-400"
              >
                Go
              </button>

              {renderSuggestions()}
            </form>

            {/* Temperature Unit Switch */}
            <div
              className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900"
              aria-label="Temperature unit"
            >
              <button
                type="button"
                onClick={() => onUnitChange?.('C')}
                aria-pressed={unit === 'C'}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  unit === 'C'
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                °C
              </button>

              <button
                type="button"
                onClick={() => onUnitChange?.('F')}
                aria-pressed={unit === 'F'}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  unit === 'F'
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                °F
              </button>
            </div>

            {/* Dark / Light Mode */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={
                darkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
              aria-pressed={darkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:hover:text-amber-300"
            >
              {darkMode ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />

                  <path
                    d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form
          onSubmit={handleSubmit}
          className="relative mb-3 flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[18px] w-[18px] shrink-0 text-slate-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" strokeLinecap="round" />
          </svg>

          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            onKeyDown={handleSuggestionKeyDown}
            onFocus={() => city.trim().length >= 2 && setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="Search a city..."
            aria-label="Search city"
            className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            Search
          </button>

          {renderSuggestions()}
        </form>
      </nav>
    </header>
  )
}

export default Navbar
