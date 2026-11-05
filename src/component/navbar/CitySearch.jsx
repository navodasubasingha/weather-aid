function CitySearch({
  mobile = false,
  city,
  suggestions,
  isSuggestionsLoading,
  showSuggestions,
  activeSuggestionIndex,
  setShowSuggestions,
  setActiveSuggestionIndex,
  handleCityChange,
  handleSuggestionKeyDown,
  handleSubmit,
  handleSelectSuggestion,
}) {
  function renderSuggestions() {
    if (!showSuggestions || city.trim().length < 2) return null

    return (
      <div
        role="listbox"
        aria-label="City suggestions"
        className={`weather-suggestions-scrollbar absolute top-full z-[70] mt-2 max-h-[360px] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-[0_16px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700 dark:bg-[#111D32]/95 dark:shadow-black/40 ${
          mobile
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

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {location.name}
                    </span>
                    <span className="mt-1 block truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                      {detail || 'Location'}
                    </span>
                  </span>

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
    <form
      onSubmit={handleSubmit}
      className={
        mobile
          ? 'relative mb-3 flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 lg:hidden'
          : 'relative hidden h-10 w-44 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:bg-slate-800 lg:flex xl:w-52'
      }
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
        placeholder={mobile ? 'Search a city...' : 'Search city...'}
        aria-label="Search city"
        className={`w-full min-w-0 bg-transparent outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 ${
          mobile
            ? 'text-sm text-slate-700'
            : 'text-xs font-medium text-slate-700'
        }`}
      />

      <button
        type="submit"
        aria-label={mobile ? undefined : 'Submit city search'}
        className={
          mobile
            ? 'rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700'
            : 'text-xs font-bold text-blue-600 transition hover:text-blue-800 dark:text-blue-400'
        }
      >
        {mobile ? 'Search' : 'Go'}
      </button>

      {renderSuggestions()}
    </form>
  )
}

export default CitySearch
