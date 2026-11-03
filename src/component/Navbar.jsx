import { useState } from 'react'

function Navbar({
  onSearch,
  unit = 'C',
  onUnitChange,
  darkMode = false,
  onToggleDarkMode,
}) {
  const [city, setCity] = useState('')
  const [logoImageFailed, setLogoImageFailed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const searchCity = city.trim()

    if (searchCity && onSearch) {
      onSearch(searchCity)
      setCity('')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-[#080F20]/90">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
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

          {/* Right-side Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Desktop City Search */}
            <form
              onSubmit={handleSubmit}
              className="hidden h-10 w-44 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:bg-slate-800 lg:flex xl:w-52"
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
                onChange={(event) => setCity(event.target.value)}
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
          className="mb-3 flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 lg:hidden"
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
            onChange={(event) => setCity(event.target.value)}
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
        </form>
      </nav>
    </header>
  )
}

export default Navbar
