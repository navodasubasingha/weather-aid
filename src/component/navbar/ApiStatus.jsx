function ApiStatus({ apiStatus = 'loading' }) {
  const isApiLoading = apiStatus === 'loading'
  const isApiOnline = apiStatus === 'online'

  const statusLabel = isApiLoading
    ? 'Connecting...'
    : isApiOnline
      ? 'Online'
      : 'Offline'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Open-Meteo API status: ${statusLabel}`}
      title={`Open-Meteo API: ${statusLabel}`}
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
        {statusLabel}
      </span>
    </div>
  )
}

export default ApiStatus
