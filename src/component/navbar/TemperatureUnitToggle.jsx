function TemperatureUnitToggle({ unit = 'C', onUnitChange }) {
  return (
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
  )
}

export default TemperatureUnitToggle
