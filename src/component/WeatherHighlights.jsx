const highlights = [
  {
    title: 'Humidity',
    value: '75%',
    description: 'Moisture in the air',
    icon: '/image/icons/humidity.png',
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Wind Speed',
    value: '12 km/h',
    description: 'Current wind condition',
    icon: '/image/icons/wind-speed.png',
    iconBg: 'bg-emerald-50',
  },
  {
    title: 'UV Index',
    value: '6',
    description: 'High UV level',
    icon: '/image/icons/uv-index.png',
    iconBg: 'bg-amber-50',
  },
  {
    title: 'Visibility',
    value: '10 km',
    description: 'How far you can see',
    icon: '/image/icons/visibility.png',
    iconBg: 'bg-violet-50',
  },
]

function WeatherHighlights() {
  return (
    <section className="h-full min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:min-h-0">
      {/* Heading */}
      <div>
        <p className="text-sm font-medium text-blue-600">WEATHER DETAILS</p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Today's Highlights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Important weather conditions at a glance
        </p>
      </div>

      {/* Highlight items */}
      <div className="mt-5 divide-y divide-slate-100">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 py-4 first:pt-2 last:pb-2"
          >
            {/* PNG Icon */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="h-13 w-13 object-contain"
              />
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {item.description}
              </p>
            </div>

            {/* Value */}
            <p className="whitespace-nowrap text-lg font-bold text-slate-900 sm:text-xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Sample values — live weather data coming soon.
      </p>
    </section>
  )
}

export default WeatherHighlights
