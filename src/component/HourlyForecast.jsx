import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Sample weather data for the next 10 hours
const hourlyData = [
  { time: 'Now', temperature: 29, icon: '🌤️' },
  { time: '8 PM', temperature: 28, icon: '☁️' },
  { time: '9 PM', temperature: 27, icon: '🌙' },
  { time: '10 PM', temperature: 27, icon: '☁️' },
  { time: '11 PM', temperature: 26, icon: '🌙' },
  { time: '12 AM', temperature: 26, icon: '🌙' },
  { time: '1 AM', temperature: 26, icon: '🌙' },
  { time: '2 AM', temperature: 25, icon: '🌙' },
  { time: '3 AM', temperature: 25, icon: '🌙' },
  { time: '4 AM', temperature: 26, icon: '🌙' },
]

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-slate-500">{label}</p>

        <p className="mt-1 text-base font-bold text-slate-900">
          {payload[0].value}°C
        </p>
      </div>
    )
  }

  return null
}

function HourlyForecast() {
  return (
    <section
      id="hourly"
      className="flex min-h-[450px] h-full flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 xl:min-h-0"
    >
      {/* Section heading */}
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-blue-600 sm:text-sm">
            NEXT 10 HOURS
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
            Hourly Forecast
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Temperature changes throughout the next 10 hours
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          Today
        </span>
      </div>

      {/* Temperature chart section */}
      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        {/* Chart heading */}
        <div className="mb-1 flex shrink-0 items-center justify-between">
          <p className="text-xs font-medium text-slate-600 sm:text-sm">
            Temperature trend
          </p>

          <p className="text-xs font-semibold text-slate-900 sm:text-sm">°C</p>
        </div>

        {/* Responsive chart */}
        <div className="min-h-[85px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={hourlyData}
              margin={{
                top: 8,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="temperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />

                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#64748B',
                  fontSize: 10,
                }}
                tickMargin={7}
                interval={0}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#64748B',
                  fontSize: 10,
                }}
                tickFormatter={(value) => `${value}°`}
                domain={['dataMin - 1', 'dataMax + 1']}
                tickCount={3}
                width={35}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: '#94A3B8',
                  strokeDasharray: '4 4',
                }}
              />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fill="url(#temperatureGradient)"
                dot={{
                  r: 3,
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  fill: '#FFFFFF',
                }}
                activeDot={{
                  r: 5,
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  fill: '#FFFFFF',
                }}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 10 hourly forecast cards */}
      <div className="mt-2 grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
        {hourlyData.map((hour, index) => (
          <div
            key={hour.time}
            className={`min-w-0 rounded-xl px-2 py-2 text-center transition ${
              index === 0
                ? 'bg-blue-50 ring-1 ring-blue-100'
                : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <p className="whitespace-nowrap text-[10px] font-medium text-slate-500 sm:text-xs">
              {hour.time}
            </p>

            <span
              className="mt-1 block text-xl sm:text-2xl"
              role="img"
              aria-label="Weather condition"
            >
              {hour.icon}
            </span>

            <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
              {hour.temperature}°
            </p>
          </div>
        ))}
      </div>

      {/* Data notice */}
      <p className="mt-auto shrink-0 pt-2 text-[10px] leading-4 text-slate-400 sm:text-xs">
        Demonstration data only — live forecasts will be loaded using
        Open-Meteo.
      </p>
    </section>
  )
}

export default HourlyForecast
