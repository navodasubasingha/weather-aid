import { useState } from 'react'

function Navbar({ onSearch, unit = 'C', onUnitChange }) {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const searchCity = city.trim()

    if (searchCity && onSearch) {
      onSearch(searchCity)
    }
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            ☀️
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Weather<span className="text-blue-600">Aid</span>
          </span>
        </a>

        {/* Navigation links */}
        <div className="flex items-center gap-5 text-sm font-medium text-slate-500">
          <a href="#today" className="text-blue-600">
            Today
          </a>

          <a href="#hourly" className="transition hover:text-blue-600">
            Hourly
          </a>

          <a href="#weekly" className="transition hover:text-blue-600">
            7-Day Forecast
          </a>
        </div>

        {/* City search */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
        >
          <span aria-hidden="true">⌕</span>

          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Search city..."
            aria-label="Search city"
            className="w-32 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Search
          </button>
        </form>

        {/* Temperature unit */}
        <div className="flex items-center rounded-full bg-slate-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onUnitChange?.('C')}
            aria-pressed={unit === 'C'}
            className={`rounded-full px-3 py-1.5 transition ${
              unit === 'C'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            °C
          </button>

          <button
            type="button"
            onClick={() => onUnitChange?.('F')}
            aria-pressed={unit === 'F'}
            className={`rounded-full px-3 py-1.5 transition ${
              unit === 'F'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            °F
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
